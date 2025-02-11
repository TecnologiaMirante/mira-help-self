import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logout } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fetchUserGroups from "../Functions/fetchUserGroups"; // Importando a função

export function LoginButton() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user || null);

      // Se o usuário estiver logado, buscar os grupos dele
      if (user) {
        fetchUserGroups(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!user ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Login com Google
        </button>
      ) : (
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
}
