import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Reading from './pages/Reading'
import CardMeanings from './pages/CardMeanings'
import Saved from './pages/Saved'
import Blog from './pages/Blog'

const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }))
  return (
    <div className="star-field">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

const Navbar = () => {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/reading', label: 'Reading' },
    { to: '/cards', label: 'Card Library' },
    { to: '/saved', label: 'Saved' },
    { to: '/blog', label: 'Blog' },
  ]
  return (
    <nav className="relative z-20 border-b border-gold/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-gold text-xl" style={{ fontFamily: 'Cinzel' }}>✦</span>
          <span className="font-cinzel text-ivory text-sm tracking-[0.2em] uppercase group-hover:text-gold transition-colors">
            Real Talk Tarot
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        {/* Mobile: just show the reading button */}
        <Link to="/reading" className="md:hidden btn-gold text-xs px-4 py-2">
          Start Reading
        </Link>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden flex gap-4 px-4 pb-3 overflow-x-auto">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link whitespace-nowrap text-xs ${location.pathname === l.to ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-void">
      {/* Background atmosphere */}
      <div className="orb w-96 h-96 bg-mystic/20 top-10 -left-24" style={{ animationDelay: '0s' }} />
      <div className="orb w-80 h-80 bg-amethyst/10 bottom-40 right-10" style={{ animationDelay: '-4s' }} />
      <div className="orb w-64 h-64 bg-gold-dim/10 top-1/2 left-1/2" style={{ animationDelay: '-8s' }} />
      <StarField />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/cards" element={<CardMeanings />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <footer className="relative z-10 border-t border-gold/10 py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-cinzel text-gold/60 text-xs tracking-widest mb-3">✦ REAL TALK TAROT ✦</p>
            <p className="text-smoke text-xs font-raleway leading-relaxed max-w-lg mx-auto">
              Tarot readings are for reflection, entertainment, and personal insight only. They should not replace professional financial, medical, legal, or mental health advice.
            </p>
            <p className="text-smoke/40 text-xs mt-4 font-raleway">
              © {new Date().getFullYear()} Real Talk Tarot. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
