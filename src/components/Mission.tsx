"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const Mission = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  // Background animation
  useEffect(() => {
    const canvas = document.getElementById(
      "missionCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const colors =
      theme === "dark"
        ? ["rgba(59, 130, 246, 0.1)", "rgba(37, 99, 235, 0.1)"]
        : ["rgba(219, 39, 119, 0.1)", "rgba(190, 24, 93, 0.1)"];

    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create floating circles
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + i * 0.15);
        const y = canvas.height * 0.5 + Math.sin(time + i) * 30;
        const radius = 50 + Math.sin(time + i) * 20;
        drawCircle(x, y, radius, colors[i % colors.length]);
      }

      time += 0.01;
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
      id="mission"
      className={`relative min-h-screen py-20 overflow-hidden
        ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <canvas
        id="missionCanvas"
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
          Our Mission
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Top line animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`absolute h-0.5 top-0 left-0
                ${theme === "dark" ? "bg-blue-500" : "bg-pink-500"}`}
            />

            {/* Mission content */}
            <motion.div
              className={`p-8 rounded-xl backdrop-blur-sm
                ${theme === "dark" ? "bg-zinc-900/30" : "bg-white/70"}
                shadow-xl`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <p
                  className={`text-lg leading-relaxed text-center
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Sublime Headquarters is a premier digital agency headquartered
                  in the heart of Jakarta, Indonesia. With a strategic blend of
                  technology and creativity, we shape extraordinary digital
                  experiences for a range of industries.
                </p>

                <p
                  className={`text-lg leading-relaxed text-center
                  ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  Our team of seasoned professionals harnesses the latest
                  technologies and innovative strategies to create compelling
                  digital experiences that drive growth and success.
                </p>

                {/* Vision points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {["Innovation", "Excellence", "Growth"].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-lg text-center
                        ${theme === "dark" ? "bg-black/50" : "bg-gray-50"}
                      `}
                    >
                      <h3
                        className={`text-xl font-bold mb-2
                        ${
                          theme === "dark" ? "text-blue-400" : "text-pink-500"
                        }`}
                      >
                        {item}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom line animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`absolute h-0.5 bottom-0 right-0
                ${theme === "dark" ? "bg-blue-500" : "bg-pink-500"}`}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Mission;
