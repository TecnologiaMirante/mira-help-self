import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import fetchUserGroups from "./src/functions/fetchUserGroups";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    let user = result.user;

    if (!user.email.endsWith("@mirante.com.br")) {
      alert("Apenas contas @mirante.com.br são permitidas!");

      await deleteUser(user).catch((err) =>
        console.error("Erro ao excluir usuário:", err)
      );
      await signOut(auth);
      return null;
    }

    // Obtém o setor do usuário via GLPI
    const setor = await fetchUserGroups(user.email);

    // Verificar se o usuário já existe no Firestore
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    console.log(user.accessToken);
    console.log("docSnap", docSnap._document.data.value.mapValue.fields);
    const now = new Date();
    const localDate = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const formattedDate = localDate.toUTCString();

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        display_name: user.displayName,
        email: user.email,
        creationTime: formattedDate,
        setor: setor || "Setor não encontrado",
        typeUser: "user",
      });
      console.log("Usuário criado na Firestore");
    } else {
      console.log("Usuário já existe na Firestore");
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
  }
};

const logout = async (navigate) => {
  try {
    await signOut(auth);
    console.log("Deslogando...");
    navigate("/login");
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};

export { auth, signInWithGoogle, logout };
