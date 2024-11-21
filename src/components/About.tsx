"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Users, Target, Award, Code } from "lucide-react";

const About = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <Target className="w-6 h-6" />,
      number: "100+",
      label: "Projects Completed",
    },
    {
      icon: <Award className="w-6 h-6" />,
      number: "50+",
      label: "Happy Clients",
    },
    {
      icon: <Code className="w-6 h-6" />,
      number: "25+",
      label: "Team Experts",
    },
  ];

  // Animated background
  useEffect(() => {
    const canvas = document.getElementById("aboutCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create gradient lines
    const createLine = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 100 + 50,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.5,
      thickness: Math.random() * 2,
    });

    const lines = Array.from({ length: 50 }, createLine);

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle =
        theme === "dark" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle =
          theme === "dark"
            ? `rgba(59, 130, 246, ${Math.random() * 0.2})`
            : `rgba(219, 39, 119, ${Math.random() * 0.2})`;
        ctx.lineWidth = line.thickness;
        ctx.stroke();

        line.angle += line.speed;
        if (Math.random() < 0.01) {
          line.length = Math.random() * 100 + 50;
        }
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

  return (
    <section
      ref={ref}
      id="about"
      className={`relative min-h-screen py-20 overflow-hidden
        ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <canvas
        id="aboutCanvas"
        className="absolute inset-0 pointer-events-none opacity-50"
      />

      <motion.div
        style={{ y }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          About Us
        </motion.h2>

        {/* Main content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Left side - About text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              className="text-2xl font-bold mb-4"
              whileInView={{ opacity: 1, x: 0 }}
            >
              Shaping Digital Excellence
            </motion.h3>
            <motion.p
              className={`text-lg leading-relaxed
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Sublime Headquarters is a premier digital agency headquartered in
              Jakarta, Indonesia. With a strategic blend of technology and
              creativity, we shape extraordinary digital experiences for a range
              of industries.
            </motion.p>
            <motion.p
              className={`text-lg leading-relaxed
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Our team of seasoned professionals harnesses the latest
              technologies and innovative strategies to create compelling
              digital experiences that drive growth and success.
            </motion.p>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl text-center
                  ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-50"}
                  backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
              >
                <motion.div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center
                    ${theme === "dark" ? "bg-blue-500/20" : "bg-pink-500/20"}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className={`text-3xl font-bold mb-2
                    ${theme === "dark" ? "text-blue-400" : "text-pink-500"}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {stat.number}
                </motion.div>
                <div
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Innovation", "Excellence", "Integrity"].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl
                  ${theme === "dark" ? "bg-zinc-900/30" : "bg-gray-50"}
                  backdrop-blur-sm`}
              >
                <h4
                  className={`text-xl font-bold mb-2
                  ${theme === "dark" ? "text-blue-400" : "text-pink-500"}`}
                >
                  {value}
                </h4>
                <p
                  className={`text-sm
                  ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  Committed to delivering the highest standards in every project
                  we undertake.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
