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
import CommandMenu from "@/components/CommandMenu";
import ScrollChrome from "@/components/ScrollChrome";
import ChapterBreak from "@/components/ChapterBreak";

export default function Home() {
  return (
    <main className="bg-bg text-ink">
      <ScrollChrome />
      <Nav />
      <Hero />
      <ChapterBreak number="01" label="The signal" />
      <ImpactDashboard />
      <ChapterBreak number="02" label="Selected work" />
      <Projects />
      <ChapterBreak number="03" label="Point of view" />
      <About />
      <ChapterBreak number="04" label="Experience & capabilities" />
      <Timeline />
      <Leadership />
      <Skills />
      <ChapterBreak number="05" label="Ask / connect" />
      <AIChat />
      <Contact />
      <CommandMenu />
    </main>
  );
}
