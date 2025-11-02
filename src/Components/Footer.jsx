import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-base-300 rounded-box border-t border-base-200 p-4 flex flex-wrap items-center justify-center gap-6 text-base-content text-sm">
      {/* Brand Name */}
      <span className="text-lg font-semibold">StackMate 🛜</span>

      {/* Contact / Social Links */}
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

      {/* Copyright */}
      <p className="text-gray-500">
        © {new Date().getFullYear()} StackMate — All rights reserved 🧑‍💻
      </p>
    </footer>
  );
};

export default Footer;
