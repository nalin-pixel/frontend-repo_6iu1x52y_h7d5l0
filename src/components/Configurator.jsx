import { useEffect, useMemo, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-slate-800/60 border border-slate-700 text-white rounded-lg px-3 py-2"
      >
        {Object.keys(options).map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

function Price({ basePrice, addons }) {
  const total = useMemo(() => basePrice + Object.values(addons).reduce((a, b) => a + b, 0), [basePrice, addons])

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between text-slate-300">
        <span>Base</span>
        <span className="font-semibold">${basePrice.toFixed(2)}</span>
      </div>
      {Object.entries(addons).map(([k, v]) => (
        <div key={k} className="flex items-center justify-between text-slate-300/90 mt-1">
          <span className="capitalize">{k}</span>
          <span>+ ${v.toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between text-white text-lg">
        <span>Total</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

function Configurator() {
  const [loading, setLoading] = useState(true)
  const [basePrice, setBasePrice] = useState(0)
  const [options, setOptions] = useState({ color: {}, seat: {}, bars: {}, exhaust: {}, tires: {} })
  const [selection, setSelection] = useState({ color: '', seat: '', bars: '', exhaust: '', tires: '' })
  const [addons, setAddons] = useState({})

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/options`)
        const data = await res.json()
        setBasePrice(data.base_price)
        setOptions(data.options)
        const initSel = {
          color: Object.keys(data.options.color)[0],
          seat: Object.keys(data.options.seat)[0],
          bars: Object.keys(data.options.bars)[0],
          exhaust: Object.keys(data.options.exhaust)[0],
          tires: Object.keys(data.options.tires)[0],
        }
        setSelection(initSel)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!selection.color) return
    const calc = async () => {
      const res = await fetch(`${baseUrl}/api/price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selection),
      })
      const data = await res.json()
      setAddons(data.addons || {})
    }
    calc()
  }, [selection])

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-300">Loading customizer...</div>
    )
  }

  return (
    <section className="relative z-10 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">Customize</h2>
          <div className="space-y-4">
            <Select label="Color" value={selection.color} onChange={(v) => setSelection(s => ({ ...s, color: v }))} options={options.color} />
            <Select label="Seat" value={selection.seat} onChange={(v) => setSelection(s => ({ ...s, seat: v }))} options={options.seat} />
            <Select label="Handlebars" value={selection.bars} onChange={(v) => setSelection(s => ({ ...s, bars: v }))} options={options.bars} />
            <Select label="Exhaust" value={selection.exhaust} onChange={(v) => setSelection(s => ({ ...s, exhaust: v }))} options={options.exhaust} />
            <Select label="Tires" value={selection.tires} onChange={(v) => setSelection(s => ({ ...s, tires: v }))} options={options.tires} />
          </div>

          <div className="mt-6">
            <Price basePrice={basePrice} addons={addons} />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-slate-200 font-semibold mb-2">Live Preview</h3>
          <p className="text-slate-400 text-sm">Interact with the 3D scene above. Visual highlights follow your choices.</p>
          <ul className="mt-4 space-y-2 text-slate-300 text-sm">
            <li>• Color: <span className="text-white font-medium">{selection.color}</span></li>
            <li>• Seat: <span className="text-white font-medium">{selection.seat}</span></li>
            <li>• Bars: <span className="text-white font-medium">{selection.bars}</span></li>
            <li>• Exhaust: <span className="text-white font-medium">{selection.exhaust}</span></li>
            <li>• Tires: <span className="text-white font-medium">{selection.tires}</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Configurator
