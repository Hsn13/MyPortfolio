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
      <ChapterBreak number="01" label="Proof / the signal" />
      <ImpactDashboard />
      <ChapterBreak number="02" label="The person behind the work" />
      <About />
      <ChapterBreak number="03" label="Selected systems" />
      <Projects />
      <ChapterBreak number="04" label="The path that shaped it" />
      <Timeline />
      <ChapterBreak number="05" label="Ownership beyond the interface" />
      <Leadership />
      <ChapterBreak number="06" label="Tools, judgment, range" />
      <Skills />
      <ChapterBreak number="07" label="A direct line to Hasan" />
      <AIChat />
      <Contact />
      <CommandMenu />
    </main>
  );
}
