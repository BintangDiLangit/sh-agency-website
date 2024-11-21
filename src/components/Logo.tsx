import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/images/sh-logo.png" : "/images/sh-logo.png"}
      alt="SH Logo"
      fill
      className="object-contain"
      sizes="128px"
      priority
    />
  );
};

export default Logo;
