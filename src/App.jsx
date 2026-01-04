import Hero from './components/Hero'
import StatusGraphic from './components/StatusGraphic'
import ExpertModal from './components/ExpertModal'


import HelpAccordion from './components/HelpAccordion'
import WifiProvider from './components/WifiProvider'
import Section from './components/Section'
import ContactSection from './components/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-50 relative overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-200/40 rounded-full blur-3xl opacity-70 animate-blob will-change-transform"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-200/40 rounded-full blur-3xl opacity-70 animate-blob animation-delay-2000 will-change-transform"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-200/40 rounded-full blur-3xl opacity-70 animate-blob animation-delay-4000 will-change-transform"></div>
      </div>

      <main className="relative z-10">

        <Section id="home">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Hero />
            <div className="flex justify-center lg:justify-end">
              <StatusGraphic />
            </div>
          </div>
        </Section>

        <Section className="!min-h-0 !py-12">
          <div className="max-w-2xl mx-auto w-full">
            <WifiProvider />
          </div>
        </Section>



        <Section id="help">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-10">
              <span className="text-sm font-bold tracking-wider text-pink-600 uppercase mb-2 block">Support</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Common Questions</h2>
            </div>
            <HelpAccordion />
          </div>
        </Section>

        <ContactSection />

      </main>

      <ExpertModal />
    </div>
  )
}

export default App
