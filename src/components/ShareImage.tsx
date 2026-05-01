import { useRef, useEffect, useState } from 'react';
import { type Reading, readingTypeLabels, readingTypeEmojis } from '../utils/tarotEngine';

interface ShareImageProps {
  reading: Reading;
  onClose: () => void;
}

export default function ShareImage({ reading, onClose }: ShareImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'generating' | 'ready'>('generating');

  useEffect(() => {
    const timer = setTimeout(() => drawCard(), 150);
    return () => clearTimeout(timer);
  }, []);

  const drawCard = () => {
    setStatus('generating');
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0612');
    bg.addColorStop(0.5, '#130920');
    bg.addColorStop(1, '#0d0518');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 110; i++) {
      const alpha = Math.random() * 0.7 + 0.2;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.5 + 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Borders
    ctx.strokeStyle = 'rgba(201,168,76,0.5)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(28, 28, W - 56, H - 56);
    ctx.strokeStyle = 'rgba(201,168,76,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, W - 84, H - 84);

    // Corner ornaments
    ([
      [56, 56, 1, 1], [W - 56, 56, -1, 1],
      [56, H - 56, 1, -1], [W - 56, H - 56, -1, -1],
    ] as [number, number, number, number][]).forEach(([x, y, sx, sy]) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.strokeStyle = 'rgba(201,168,76,0.55)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(26, 0);
      ctx.moveTo(0, 0); ctx.lineTo(0, 26);
      ctx.stroke();
      ctx.restore();
    });

    ctx.textAlign = 'center';

    // Site name
    ctx.fillStyle = 'rgba(201,168,76,0.5)';
    ctx.font = '500 21px Georgia, serif';
    ctx.fillText('✦  REAL TALK TAROT  ✦', W / 2, 90);

    // Thin divider under site name
    ctx.strokeStyle = 'rgba(201,168,76,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(160, 104); ctx.lineTo(W - 160, 104);
    ctx.stroke();

    // Reading type pill
    const pillLabel = `${readingTypeEmojis[reading.readingType]}  ${readingTypeLabels[reading.readingType].toUpperCase()}`;
    ctx.font = '500 16px Georgia, serif';
    const pillW = ctx.measureText(pillLabel).width + 52;
    const pillX = (W - pillW) / 2;
    ctx.fillStyle = 'rgba(201,168,76,0.1)';
    roundRect(ctx, pillX, 116, pillW, 38, 19); ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.lineWidth = 1;
    roundRect(ctx, pillX, 116, pillW, 38, 19); ctx.stroke();
    ctx.fillStyle = '#c9a84c';
    ctx.fillText(pillLabel, W / 2, 141);

    let yPos = 186;

    // Question
    if (reading.question) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = 'italic 22px Georgia, serif';
      const qLines = wrapText(ctx, `"${reading.question}"`, W - 180);
      qLines.slice(0, 3).forEach((line, i) => {
        ctx.fillText(line, W / 2, yPos + i * 34);
      });
      yPos += Math.min(qLines.length, 3) * 34 + 18;
    }

    divider(ctx, W / 2, yPos, 190);
    yPos += 38;

    // Cards
    const cards = reading.drawnCards;
    const gap = 14;
    const pad = 56;
    const cardW = Math.floor((W - pad * 2 - gap * (cards.length - 1)) / cards.length);
    const cardH = Math.floor(cardW * 1.55);

    cards.forEach((drawn, i) => {
      const cx = pad + i * (cardW + gap);
      const cy = yPos;

      ctx.shadowColor = drawn.isReversed ? 'rgba(192,132,252,0.3)' : 'rgba(201,168,76,0.25)';
      ctx.shadowBlur = 18;

      const cardBg = ctx.createLinearGradient(cx, cy, cx + cardW, cy + cardH);
      cardBg.addColorStop(0, '#1a0f2e');
      cardBg.addColorStop(1, '#2a1650');
      ctx.fillStyle = cardBg;
      roundRect(ctx, cx, cy, cardW, cardH, 12); ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = drawn.isReversed ? 'rgba(192,132,252,0.65)' : 'rgba(201,168,76,0.7)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, cx, cy, cardW, cardH, 12); ctx.stroke();

      // Top glow line
      const topGlow = ctx.createLinearGradient(cx, cy, cx + cardW, cy);
      topGlow.addColorStop(0, 'transparent');
      topGlow.addColorStop(0.5, drawn.isReversed ? 'rgba(192,132,252,0.45)' : 'rgba(201,168,76,0.45)');
      topGlow.addColorStop(1, 'transparent');
      ctx.strokeStyle = topGlow;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + 12, cy + 1.5); ctx.lineTo(cx + cardW - 12, cy + 1.5);
      ctx.stroke();

      // Symbol
      const symPx = Math.floor(cardW * 0.28);
      ctx.fillStyle = '#c9a84c';
      ctx.font = `${symPx}px Georgia, serif`;
      ctx.fillText(drawn.card.symbol, cx + cardW / 2, cy + cardH * 0.43);

      // Name
      const namePx = Math.max(11, Math.floor(cardW * 0.092));
      ctx.fillStyle = '#e8dcc8';
      ctx.font = `bold ${namePx}px Georgia, serif`;
      wrapText(ctx, drawn.card.name, cardW - 14).slice(0, 2).forEach((line, li) => {
        ctx.fillText(line, cx + cardW / 2, cy + cardH * 0.60 + li * (namePx + 5));
      });

      // Reversed tag
      if (drawn.isReversed) {
        ctx.fillStyle = 'rgba(192,132,252,0.18)';
        roundRect(ctx, cx + 6, cy + cardH - 26, cardW - 12, 20, 6); ctx.fill();
        ctx.fillStyle = '#c084fc';
        ctx.font = `bold ${Math.max(9, Math.floor(cardW * 0.072))}px Georgia, serif`;
        ctx.fillText('REVERSED', cx + cardW / 2, cy + cardH - 12);
      }

      // Position label
      ctx.fillStyle = 'rgba(201,168,76,0.6)';
      ctx.font = `12px Georgia, serif`;
      ctx.fillText(drawn.position.toUpperCase(), cx + cardW / 2, cy + cardH + 22);
    });

    yPos += cardH + 52;

    divider(ctx, W / 2, yPos, 150);
    yPos += 42;

    // Real Talk header
    ctx.fillStyle = '#c084fc';
    ctx.font = '600 17px Georgia, serif';
    ctx.fillText('⚡  REAL TALK', W / 2, yPos);
    yPos += 34;

    // Real Talk box
    ctx.font = `italic 22px Georgia, serif`;
    const rtLines = wrapText(ctx, `"${reading.realTalkMessage}"`, W - 160);
    const rtBoxH = rtLines.length * 34 + 32;
    ctx.fillStyle = 'rgba(192,132,252,0.07)';
    roundRect(ctx, 72, yPos - 16, W - 144, rtBoxH, 12); ctx.fill();
    ctx.strokeStyle = 'rgba(192,132,252,0.22)';
    ctx.lineWidth = 1;
    roundRect(ctx, 72, yPos - 16, W - 144, rtBoxH, 12); ctx.stroke();
    ctx.fillStyle = '#ede0ff';
    rtLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, yPos + 10 + i * 34);
    });
    yPos += rtBoxH + 32;

    divider(ctx, W / 2, yPos, 110);
    yPos += 32;

    // URL
    ctx.fillStyle = 'rgba(201,168,76,0.38)';
    ctx.font = '600 18px Georgia, serif';
    ctx.fillText('realtalktarot.com', W / 2, yPos + 8);

    setStatus('ready');
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'real-talk-tarot-reading.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mystic-card max-w-sm w-full p-5 border-gold/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cinzel text-gold text-base">Share Your Reading</h2>
          <button onClick={onClose} className="text-smoke hover:text-gold transition-colors text-lg leading-none">✕</button>
        </div>

        {status === 'generating' && (
          <div className="h-40 flex items-center justify-center">
            <span className="animate-spin text-gold text-3xl">✦</span>
          </div>
        )}

        {/* Canvas — always in DOM so ref stays valid, hidden while generating */}
        <canvas
          ref={canvasRef}
          className={`w-full block rounded border border-gold/20 mb-4 ${status === 'generating' ? 'hidden' : ''}`}
        />

        {status === 'ready' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <button onClick={download} className="btn-gold flex-1 py-2.5 text-sm">
                Download PNG
              </button>
              <button onClick={drawCard} className="btn-outline px-4 py-2.5 text-sm">
                Regenerate
              </button>
            </div>
            <p className="text-smoke/40 font-raleway text-xs text-center">
              1080×1350 — sized for Instagram, Facebook, anywhere.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function divider(ctx: CanvasRenderingContext2D, cx: number, y: number, halfW: number) {
  ctx.strokeStyle = 'rgba(201,168,76,0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - halfW, y); ctx.lineTo(cx - 14, y); ctx.stroke();
  ctx.fillStyle = 'rgba(201,168,76,0.55)';
  ctx.font = '13px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦', cx, y + 5);
  ctx.beginPath();
  ctx.moveTo(cx + 14, y); ctx.lineTo(cx + halfW, y); ctx.stroke();
}
