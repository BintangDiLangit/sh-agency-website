"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Smartphone, Box } from "lucide-react";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const Services = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Icon glow effect
  const iconGlow = {
    hidden: { scale: 1, filter: "blur(0px)" },
    visible: {
      scale: [1, 1.2, 1],
      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const services = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Website Development",
      description:
        "Create stunning, responsive websites that engage your audience",
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Application Development",
      description: "Build powerful applications for web and mobile platforms",
    },
    {
      icon: <Box className="h-12 w-12" />,
      title: "3D/AR/VR/XR",
      description: "Immersive experiences using cutting-edge technologies",
    },
  ];

  // Background animation with Canvas
  useEffect(() => {
    const canvas = document.getElementById(
      "servicesCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create grid pattern
    const drawGrid = () => {
      if (!ctx) return;
      ctx.strokeStyle =
        theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 0.5;

      const cellSize = 50;
      const xOffset = scrollYProgress.get() * 50;

      for (let x = -cellSize; x <= canvas.width + cellSize; x += cellSize) {
        for (let y = -cellSize; y <= canvas.height + cellSize; y += cellSize) {
          ctx.beginPath();
          ctx.moveTo(x + xOffset, y);
          ctx.lineTo(x + cellSize + xOffset, y + cellSize);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme, scrollYProgress]);

  return (
    <section
      ref={ref}
      id="service"
      className={`relative min-h-screen py-20 overflow-hidden
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <canvas
        id="servicesCanvas"
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y, opacity }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 rounded-xl overflow-hidden
                ${theme === "dark" ? "bg-zinc-900/50" : "bg-gray-100"}
                hover:shadow-2xl transition-all duration-500`}
            >
              {/* Background gradient */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Icon with glow effect */}
              <motion.div
                className="mb-6 relative"
                variants={iconGlow}
                initial="hidden"
                animate="visible"
              >
                <div className={`text-blue-500 relative z-10`}>
                  {service.icon}
                </div>
                <div className="absolute inset-0 bg-blue-500/20 blur-lg" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-4 relative z-10">
                {service.title}
              </h3>
              <p
                className={`relative z-10 
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
