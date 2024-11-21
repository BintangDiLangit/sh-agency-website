"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold relative w-32 h-12">
            {" "}
            <Logo />
          </Link>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden md:flex space-x-8">
            {["Home", "Service", "Mission", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-black/95 py-4 md:hidden"
            >
              <div className="flex flex-col space-y-4 px-4">
                {["Home", "Service", "Mission", "About", "Contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-blue-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
