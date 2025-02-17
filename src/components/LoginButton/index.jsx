import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

export function LoginButton() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      // Se o usuário for inválido, não navega para /home
      if (user?.email?.endsWith("@mirante.com.br")) {
        setUser(user);
        navigate("/home");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      setUser(user);
      navigate("/home");
    }
  };

  return (
    <div className="w-full">
      {!user && (
        <button
          onClick={handleLogin}
          className="w-full flex flex-row items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition cursor-pointer space-x-2"
        >
          <FaGoogle className=" w-5 h-5" />
          <p>Entrar com Google</p>
        </button>
      )}
    </div>
  );
}
