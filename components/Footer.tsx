import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-12 bg-gray-800 text-gray-300 py-4 w-full">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="md:text-lg font-semibold">Designed by Shelton Simbi</h2>
        <p className="text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link
            href="https://www.linkedin.com/in/shelton-simbi-750155204/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://github.com/Shelton-beep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </Link>
          <Link
            href="mailto:shltnsimbi@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <MdEmail />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
