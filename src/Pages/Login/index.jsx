import React from "react";
import { LoginButton } from "../../components/LoginButton/";
import logo from "../../assets/logo-mirahelp.png";

export function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FB] select-none">
      <img src={logo} alt="MiraHelp Logo" className="w-40 mb-6" />

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center space-y-6">
        <p className="text-gray-600 text-lg">
          Faça login com sua conta <strong>Google da Mirante</strong> para
          acessar o portal <strong> Mira Help Self</strong>.
        </p>

        <LoginButton />

        <a
          href="http://mirahelp.mirante.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Clique aqui para ir para o MiraHelp e abrir o chamado por lá.
        </a>
      </div>
    </div>
  );
}
