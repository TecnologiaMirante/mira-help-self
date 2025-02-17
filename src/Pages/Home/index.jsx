import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CardVideo } from "../../components/CardVideo";

export function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      <Navbar photoURL={user?.photoURL} />
      INPUT DE PESQUISA E FILTROS
      <div className="py-6 px-4 sm:px-6 lg:px-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardVideo />
          <CardVideo />
          <CardVideo />
          <CardVideo />
          <CardVideo />
        </div>
      </div>
    </div>
  );
}
