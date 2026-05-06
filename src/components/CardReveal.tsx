import { useState, useEffect } from 'react'
import { DrawnCard } from '../utils/tarotEngine'

interface CardBackProps {
  delay?: number
  onClick?: () => void
  revealed: boolean
}

const CardBack = ({ delay = 0, onClick, revealed }: CardBackProps) => (
  <div
    className="card-tarot"
    onClick={onClick}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`card-inner ${revealed ? 'flipped' : ''}`}>
      {/* Card back face */}
      <div className="card-face" style={{
        background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b5e 50%, #1a0f2e 100%)',
        border: '1px solid rgba(201,168,76,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
      }}>
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <div style={{ fontSize: '2rem', color: '#c9a84c', marginBottom: '8px' }}>✦</div>
          <div style={{
            width: '60%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
            margin: '0 auto 8px',
          }} />
          <div style={{ fontSize: '0.4rem', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.3em', fontFamily: 'Cinzel' }}>
            REAL TALK TAROT
          </div>
        </div>
      </div>
      {/* Card front face (revealed) */}
      <div className="card-back-face" style={{
        background: 'linear-gradient(135deg, #0e0818 0%, #1a0f2e 100%)',
        border: '1px solid rgba(201,168,76,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 30px rgba(201,168,76,0.2)',
      }}>
        <div style={{ fontSize: '1.5rem', color: '#c9a84c' }}>✦</div>
      </div>
    </div>
  </div>
)

interface CardFrontProps {
  drawnCard: DrawnCard
  index: number
  positionLabel: string
  meaning: string
}

export const CardFront = ({ drawnCard, index, positionLabel, meaning }: CardFrontProps) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 200)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className="card-reveal"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`mystic-card rounded-lg overflow-hidden transition-all duration-500 ${visible ? 'glow-gold' : ''}`}>
        {/* Card Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a0f2e, #2d1b5e)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card image */}
          <div style={{
            transform: drawnCard.isReversed ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s ease',
          }}>
            <img
              src={`/cards/${drawnCard.card.id}.png`}
              alt={drawnCard.card.name}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
              style={{ width: '100%', display: 'block', aspectRatio: '2/3', objectFit: 'cover' }}
            />
            {/* Fallback symbol (hidden if image loads) */}
            <div style={{
              display: 'none',
              fontSize: '3rem',
              color: '#c9a84c',
              padding: '32px 16px',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '2/3',
            }}>
              {drawnCard.card.symbol}
            </div>
          </div>

          {/* Reversed badge overlay */}
          {drawnCard.isReversed && (
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              fontSize: '0.6rem',
              padding: '3px 8px',
              borderRadius: '20px',
              fontFamily: 'Cinzel',
              letterSpacing: '0.12em',
              background: 'rgba(124,77,202,0.7)',
              color: '#e9d5ff',
              border: '1px solid rgba(124,77,202,0.6)',
              backdropFilter: 'blur(4px)',
            }}>
              ↓ REVERSED
            </div>
          )}
        </div>

        {/* Card name + arcana */}
        <div style={{
          padding: '10px 16px 6px',
          background: 'linear-gradient(135deg, #1a0f2e, #2d1b5e)',
          textAlign: 'center',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}>
          <div className="font-cinzel text-gold-light text-sm tracking-widest">
            {drawnCard.card.name}
          </div>
          <div className="text-smoke text-xs font-raleway mt-1 capitalize">
            {drawnCard.card.arcana === 'minor'
              ? `${drawnCard.card.suit} • Minor Arcana`
              : `Major Arcana • ${drawnCard.card.symbol}`}
          </div>
        </div>

        {/* Position label */}
        <div style={{
          padding: '8px 16px',
          background: 'rgba(201,168,76,0.06)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          textAlign: 'center',
        }}>
          <span className="text-gold font-cinzel text-xs tracking-widest uppercase">
            {positionLabel}
          </span>
        </div>

        {/* Keywords */}
        <div style={{ padding: '12px 16px', textAlign: 'center' }}>
          <div className="flex flex-wrap gap-1 justify-center">
            {(drawnCard.isReversed ? drawnCard.card.keywordsReversed : drawnCard.card.keywordsUpright)
              .slice(0, 3)
              .map((kw, i) => (
                <span key={i} style={{
                  fontSize: '0.6rem',
                  padding: '2px 8px',
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '20px',
                  color: '#c4b8d8',
                  fontFamily: 'Raleway',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {kw}
                </span>
              ))}
          </div>
        </div>

        {/* Meaning */}
        <div style={{ padding: '0 20px 20px' }}>
          <p className="font-cormorant text-ivory/90 leading-relaxed" style={{ fontSize: '0.95rem' }}>
            {meaning}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardBack
