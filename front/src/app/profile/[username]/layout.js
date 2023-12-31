"use client";

import ProfileData from "@/components/ProfileData";
import ProfileNav from "@/components/ProfileNav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ProfileLayout({ children }) {
  return (
    <main className={`${inter.className} flex flex-col min-h-screen`}>
      <section className="flex flex-col items-center mt-10 max-w-[900px] mx-auto">
        <ProfileData />

        <ProfileNav />
      </section>

      {children}
    </main>
  );
}
