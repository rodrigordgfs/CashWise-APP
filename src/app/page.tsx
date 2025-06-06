"use client";

import { Header } from "@/components/ui/Home/Header";
import { Hero } from "@/components/ui/Home/Hero";
import { Features } from "@/components/ui/Home/Features";
import { Testimonials } from "@/components/ui/Home/Testimonials";
import { CtaSection } from "@/components/ui/Home/CtaSection";
import { Footer } from "@/components/ui/Home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
