import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function DemoIntegrations() {
  const [javaMsg, setJavaMsg] = useState('...')
  const [cppMsg, setCppMsg] = useState('...')

  useEffect(() => {
    fetch(`${baseUrl}/api/demo/java`).then(r => r.json()).then(d => setJavaMsg(d.message || JSON.stringify(d))).catch(() => setJavaMsg('unavailable'))
    fetch(`${baseUrl}/api/demo/cpp`).then(r => r.json()).then(d => setCppMsg(d.message || JSON.stringify(d))).catch(() => setCppMsg('unavailable'))
  }, [])

  return (
    <section className="relative z-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg">Java microservice</h3>
          <p className="text-slate-300 mt-2 text-sm">{javaMsg}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-lg">C++ microservice</h3>
          <p className="text-slate-300 mt-2 text-sm">{cppMsg}</p>
        </div>
      </div>
    </section>
  )
}

export default DemoIntegrations
