import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-base-300 rounded-box border-t border-base-200 p-4 flex flex-col md:flex-row items-center justify-between text-base-content text-sm gap-4">
      <span className="text-lg font-semibold">StackMate 🛜</span>

      <div className="flex items-center gap-6">
        <a
          href="https://linkedin.com/in/ankur-baijal-32526022b/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <FaLinkedin size={18} />
          <span>LinkedIn</span>
        </a>
        <a
          href="mailto:ankur.baijal11@gmail.com"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <FaEnvelope size={18} />
          <span>Contact</span>
        </a>
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        <Link to="/privacy-policy" className="hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-primary transition-colors">
          Terms & Conditions
        </Link>
        <Link to="/refund-policy" className="hover:text-primary transition-colors">
          Refund Policy
        </Link>
      </div>

      <p className="text-gray-500 text-center md:text-right w-full md:w-auto">
        © {new Date().getFullYear()} StackMate — All rights reserved 🧑‍💻
      </p>
    </footer>
  );
};

export default Footer;
