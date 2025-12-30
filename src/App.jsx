import Hero from './components/Hero'
import StatusGraphic from './components/StatusGraphic'
import ExpertModal from './components/ExpertModal'
import ProviderQuiz from './components/ProviderQuiz'
import HelpAccordion from './components/HelpAccordion'
import Section from './components/Section'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-50 relative overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10">

        {/* Section 1: Hero & Visual */}
        <Section id="home">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Hero />
            <div className="flex justify-center lg:justify-end">
              <StatusGraphic />
            </div>
          </div>
        </Section>

        {/* Section 2: Quiz */}
        <Section id="quiz" className="bg-white/20 backdrop-blur-sm rounded-3xl my-8">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-10">
              <span className="text-sm font-bold tracking-wider text-indigo-600 uppercase mb-2 block">Self Diagnosis</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Identify Your Provider</h2>
            </div>
            <ProviderQuiz />
          </div>
        </Section>

        {/* Section 3: Help & FAQ */}
        <Section id="help">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-10">
              <span className="text-sm font-bold tracking-wider text-pink-600 uppercase mb-2 block">Support</span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Common Questions</h2>
            </div>
            <HelpAccordion />
          </div>
        </Section>

      </main>

      <ExpertModal />
    </div>
  )
}

export default App
