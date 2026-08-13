import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Leadership from "@/components/Leadership";
import Skills from "@/components/Skills";
import AIChat from "@/components/AIChat";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-bg text-ink">
      <Nav />
      <Hero />
      <ImpactDashboard />
      <About />
      <Projects />
      <Timeline />
      <Leadership />
      <Skills />
      <AIChat />
      <Contact />
    </main>
  );
}
