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
          padding: '16px',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
            {drawnCard.card.symbol}
          </div>
          <div className="font-cinzel text-gold-light text-sm tracking-widest">
            {drawnCard.card.name}
          </div>
          {drawnCard.card.arcana === 'minor' && (
            <div className="text-smoke text-xs font-raleway mt-1 capitalize">
              {drawnCard.card.suit} • {drawnCard.card.arcana === 'minor' ? 'Minor Arcana' : 'Major Arcana'}
            </div>
          )}
          {drawnCard.card.arcana === 'major' && (
            <div className="text-smoke text-xs font-raleway mt-1">
              Major Arcana • {drawnCard.card.symbol}
            </div>
          )}
          <div className="mt-2">
            <span style={{
              fontSize: '0.65rem',
              padding: '3px 10px',
              borderRadius: '20px',
              fontFamily: 'Cinzel',
              letterSpacing: '0.15em',
              background: drawnCard.isReversed ? 'rgba(124,77,202,0.3)' : 'rgba(201,168,76,0.2)',
              color: drawnCard.isReversed ? '#b794f4' : '#c9a84c',
              border: `1px solid ${drawnCard.isReversed ? 'rgba(124,77,202,0.4)' : 'rgba(201,168,76,0.3)'}`,
            }}>
              {drawnCard.isReversed ? '↓ REVERSED' : '↑ UPRIGHT'}
            </span>
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
