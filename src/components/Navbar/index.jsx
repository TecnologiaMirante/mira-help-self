import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase";
import avatar from "../../assets/avatar-perfil.png";

export function Navbar({ photoURL }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-blue-600 text-white select-none">
      <div className="px-4 sm:px-6 lg:px-18">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="text-xl font-bold">
            Mira Help Self
          </Link>

          {/* Área do menu e imagem de perfil */}
          <div className="flex items-center space-x-4">
            {/* Menu (Visível apenas em telas grandes) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/home"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Início
              </Link>
              <Link
                to="#"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Curtidas
              </Link>
              <Link
                to="http://mirahelp.mirante.com.br/glpi/"
                target="_blank"
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                MiraHelp
              </Link>
              <button
                onClick={() => logout(navigate)}
                className="px-3 py-2 rounded-md text-lg font-medium hover:bg-blue-700 cursor-pointer"
              >
                Logout
              </button>
            </div>

            {/* Foto de perfil */}
            {photoURL ? (
              <img
                src={photoURL}
                alt="Foto do usuário"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <img
                src={avatar}
                alt="Foto do usuário"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            {/* Ícone do menu hamburguer (Visível apenas em telas pequenas) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? (
                <IoMdClose className="cursor-pointer" size={28} />
              ) : (
                <IoMdMenu className="cursor-pointer" size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Menu dropdown para telas pequenas */}
        {menuOpen && (
          <div className="absolute right-6 top-16 bg-blue-700 p-4 rounded-b-lg shadow-lg md:hidden">
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              Início
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              Curtidas
            </Link>
            <Link
              to="http://mirahelp.mirante.com.br/glpi/"
              target="_blank"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              MiraHelp
            </Link>
            <Link
              onClick={() => logout(navigate)}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
