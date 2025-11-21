import Hero from './components/Hero'
import Configurator from './components/Configurator'
import DemoIntegrations from './components/DemoIntegrations'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <Configurator />
      <DemoIntegrations />
      <footer className="relative z-10 py-10 text-center text-slate-500">
        Built for minimal, futuristic customization vibes.
      </footer>
    </div>
  )
}

export default App
