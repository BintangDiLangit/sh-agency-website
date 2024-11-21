"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const WhyChooseUs = () => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const features = [
    {
      number: "01",
      title: "Expertise and Experience",
      description:
        "Our team's comprehensive skills and rich experience in various domains ensure top-notch digital solutions tailored to your needs.",
    },
    {
      number: "02",
      title: "Client-Centric Approach",
      description:
        "We prioritize clear communication and understanding your unique requirements to deliver solutions that exceed expectations.",
    },
    {
      number: "03",
      title: "Quality and Innovation",
      description:
        "Quality and innovation are the hallmarks of our service offerings. We are committed to delivering high-quality products that bring measurable value.",
    },
    {
      number: "04",
      title: "Comprehensive Support",
      description:
        "Post-project support through expert maintenance, updates, and continuous monitoring ensure your digital presence remains optimal.",
    },
  ];

  // Background animation with dots pattern
  useEffect(() => {
    const canvas = document.getElementById(
      "whyChooseUsCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots: { x: number; y: number; speedX: number; speedY: number }[] = [];
    const numberOfDots = 50;

    // Create dots
    for (let i = 0; i < numberOfDots; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach((dot, i) => {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "dark"
            ? "rgba(59, 130, 246, 0.2)"
            : "rgba(219, 39, 119, 0.2)";
        ctx.fill();

        // Draw connections
        dots.forEach((otherDot, j) => {
          if (i !== j) {
            const dx = dot.x - otherDot.x;
            const dy = dot.y - otherDot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
              ctx.strokeStyle =
                theme === "dark"
                  ? `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
                  : `rgba(219, 39, 119, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          }
        });
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
      id="why-choose-us"
      className={`relative min-h-screen py-20 overflow-hidden
      ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}
    >
      <canvas
        id="whyChooseUsCanvas"
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
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -10,
                boxShadow:
                  theme === "dark"
                    ? "0 0 20px rgba(59, 130, 246, 0.2)"
                    : "0 0 20px rgba(219, 39, 119, 0.2)",
              }}
              className={`relative p-6 rounded-xl overflow-hidden
                ${theme === "dark" ? "bg-zinc-900/30" : "bg-white"} 
                backdrop-blur-sm transition-all duration-500`}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, #3b82f6 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`text-5xl font-bold mb-4 
                 ${theme === "dark" ? "text-blue-500" : "text-pink-500"}`}
              >
                {feature.number}
              </motion.div>

              <motion.h3
                className="text-xl font-semibold mb-4"
                whileHover={{ x: 10 }}
              >
                {feature.title}
              </motion.h3>

              <p
                className={`text-sm leading-relaxed
               ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                {feature.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2
                 ${theme === "dark" ? "bg-blue-500/10" : "bg-pink-500/10"}
                 rounded-full blur-xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
