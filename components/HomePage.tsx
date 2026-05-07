import ChatGuide from '@/components/ChatGuide'
import Contact from '@/components/Contact'
import Expertise from '@/components/Expertise'
import FieldNotes from '@/components/FieldNotes'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Intelligence from '@/components/Intelligence'
import Navbar from '@/components/Navbar'
import Portfolio from '@/components/Portfolio'
import Vision from '@/components/Vision'

export default function HomePage() {
  return (
    <div id="ferdi-editorial-site">
      <div aria-hidden="true" id="top" />
      <Navbar />
      <main className="fi-shell" id="main-content">
        <Hero />
        <Impact />
        <Portfolio />
        <Expertise />
        <Intelligence />
        <Vision />
        <FieldNotes />
        <Contact />
        <ChatGuide />
      </main>
      <Footer />
    </div>
  )
}
