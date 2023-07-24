"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero"
import dynamic from "next/dynamic";
import { UserProvider } from "./context/UserContext";



const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <UserProvider>
          <AnimatedCursor />
          <Navbar />
          <Hero />
          <Footer />
      </UserProvider>
    </>
  );
}