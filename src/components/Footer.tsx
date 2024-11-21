"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Background animation
  useEffect(() => {
    const canvas = document.getElementById("footerCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle =
        theme === "dark"
          ? `rgba(59, 130, 246, ${opacity})`
          : `rgba(219, 39, 119, ${opacity})`;
      ctx.fill();
    };

    let stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      opacity: Math.random() * 0.5,
      speed: Math.random() * 0.5,
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        drawStar(star.x, star.y, star.size, star.opacity);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ];

  return (
    <footer
      ref={ref}
      id="contact"
      className={`relative pt-20 pb-10 overflow-hidden
        ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <canvas
        id="footerCanvas"
        className="absolute inset-0 pointer-events-none opacity-30"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative w-32 h-12">
              <Logo />
            </div>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Creating digital excellence through innovation and expertise.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      theme === "dark"
                        ? "bg-zinc-900 hover:bg-blue-500/20"
                        : "bg-gray-100 hover:bg-pink-500/20"
                    }
                    transition-colors`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["About", "Services", "Projects", "Contact"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>info@digital.agency</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+62 882 1104 1737</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg outline-none
                  ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"}
                  focus:ring-2 ${
                    theme === "dark"
                      ? "focus:ring-blue-500"
                      : "focus:ring-pink-500"
                  }`}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                  ${
                    theme === "dark"
                      ? "bg-blue-500/20 hover:bg-blue-500"
                      : "bg-pink-500/20 hover:bg-pink-500"
                  }`}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className={`h-px mb-8 ${
            theme === "dark" ? "bg-zinc-800" : "bg-gray-200"
          }`}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-400"
          >
            © {new Date().getFullYear()} Sublime Headquarters. All rights
            reserved.
          </motion.p>

          {/* Scroll to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`mt-4 md:mt-0 p-3 rounded-full
              ${
                theme === "dark"
                  ? "bg-zinc-900 hover:bg-zinc-800"
                  : "bg-gray-100 hover:bg-gray-200"
              }
              transition-colors`}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
