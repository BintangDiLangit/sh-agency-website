"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

const Clients = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  // List of clients
  const clients = [
    { name: "Client 1", logo: "/images/client1.png" },
    { name: "Client 2", logo: "/images/client2.png" },
  ];

  // Background animation
  useEffect(() => {
    const canvas = document.getElementById(
      "clientsCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Create particles
    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5,
        });
      }
    };

    createParticles();

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += (Math.random() - 0.5) * 0.01;

        // Reset position if out of bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        if (particle.opacity < 0) particle.opacity = 0.5;
        if (particle.opacity > 0.5) particle.opacity = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "dark"
            ? `rgba(59, 130, 246, ${particle.opacity})`
            : `rgba(219, 39, 119, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      createParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <section
      ref={ref}
      id="clients"
      className={`relative min-h-screen py-20 overflow-hidden
        ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <canvas
        id="clientsCanvas"
        className="absolute inset-0 pointer-events-none"
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
          Our Clients
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 },
              }}
              className={`relative group cursor-pointer`}
            >
              {/* Client Card */}
              <div
                className={`
                    aspect-square rounded-2xl overflow-hidden
                    ${theme === "dark" ? "bg-zinc-900/30" : "bg-white/70"}
                    backdrop-blur-sm shadow-xl
                    relative z-10
                    flex items-center justify-center
                    p-6
                  `}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 150px"
                    priority
                  />
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    background: [
                      `linear-gradient(0deg, ${
                        theme === "dark" ? "#3b82f6" : "#db2777"
                      } 0%, transparent 100%)`,
                      // ... rest of the gradients
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Client Logo/Name */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`text-xl font-bold text-center
                      ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                  ></motion.div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl
                    ${theme === "dark" ? "bg-blue-500" : "bg-pink-500"}`}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial or additional info could be added here */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center mt-16 max-w-2xl mx-auto
            ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          Trusted by leading companies around the world. We deliver exceptional
          digital solutions that drive success.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Clients;
