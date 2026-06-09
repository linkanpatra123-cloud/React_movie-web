import Link from "next/link";
// React Icons se FontAwesome icons import kar rahe hain
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaPlus, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12 border-t border-gray-800 px-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright Text */}
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="text-yellow-500 font-semibold">MovieFlix</span>. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div> Social Media
            <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300" title="Facebook">
                <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300" title="Twitter">
                <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300" title="Instagram">
                <FaInstagram size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" title="GitHub">
                <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300" title="LinkedIn">
                <FaLinkedin size={24} />
            </a>
            </div>
        </div>

        {/* Footer Links */}
        <div className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition">Contact Us</Link>
        </div>

      </div>
    </footer>
  );
}