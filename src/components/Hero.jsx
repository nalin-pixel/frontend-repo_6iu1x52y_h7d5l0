import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="backdrop-blur-sm bg-slate-900/40 border border-white/10 rounded-2xl p-6 md:p-8 w-fit">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Bobber Custom Studio
            </h1>
            <p className="mt-3 md:mt-4 text-slate-200/80 max-w-xl">
              Minimal. Futuristic. Interactive. Build your perfect bobber with live pricing.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
    </section>
  )
}

export default Hero
