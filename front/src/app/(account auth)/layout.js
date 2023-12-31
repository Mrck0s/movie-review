import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import bgPattern from "@/assets/bg-hero.jpg";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function AccountLayout({ children }) {
  return (
    <section
      className={`${inter.className} flex place-items-center w-full h-full`}
    >
      <Image
        src={bgPattern}
        alt="Background pattern"
        fill
        className="absolute object-cover top-0 left-0 -z-10 hidden md:block"
      />
      {children}
    </section>
  );
}
