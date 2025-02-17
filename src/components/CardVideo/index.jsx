import Logo from "../../assets/logo-mirahelp.png";
import { IoMdHeart, IoMdEye } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";

export function CardVideo() {
  return (
    <div className="bg-white flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={Logo} alt="logo" className="w-full object-cover " />
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-800 line-clamp-2">
            lesson.title
          </h2>

          <h2 className="text-lg font-medium bg-green-500 rounded-lg p-0.5 text-white line-clamp-2">
            lesson.tag
          </h2>
        </div>

        <div className="flex flex-row justify-between items-center text-sm text-blue-500">
          <div className="flex flex-row items-center space-x-1">
            <IoMdHeart className="w-5 h-5 text-red-500" />
            <span>56</span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <FiMessageCircle className="w-5 h-5 text-blue-500" />
            <span>142</span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <IoMdEye className="w-5 h-5 text-blue-500" />
            <span>1224</span>
          </div>
        </div>
      </div>
    </div>
  );
}
