import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import fetchUserGroups from "./src/Functions/fetchUserGroups";

// Credenciais do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicialize o Firestore
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🔐 Função para login com filtro de domínio
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email.endsWith("@mirante.com.br")) {
      alert("Apenas contas @mirante.com.br são permitidas!");
      await signOut(auth); // Desloga o usuário

      // Apagar o usuário se ele não for autorizado
      await deleteUser(user);

      return null;
    }

    // 📌 Obtém o setor do usuário via GLPI
    const setor = await fetchUserGroups(user.email);

    // Verificar se o usuário já existe na coleção "users"
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    // Hora exata
    const now = new Date();

    // Ajustando para GMT-3
    const localDate = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtraindo 3 horas

    const formattedDate = localDate.toUTCString();

    // Se o usuário não existir, cria o documento com os dados
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        display_name: user.displayName,
        email: user.email,
        creationTime: formattedDate,
        setor: setor || "Setor não encontrado ou mal formatado", // ✅ Adicionando setor ao Firestore
      });
      console.log("Usuário criado na Firestore");
    } else {
      console.log("Usuário já existe na Firestore");
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};

// 🔓 Função para logout
const logout = async () => {
  await signOut(auth);
  console.log("Deslogando...");
};

export { auth, signInWithGoogle, logout };
