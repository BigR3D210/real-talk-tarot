import { useRef, useState } from 'react';
import { type Reading, readingTypeLabels, readingTypeEmojis } from '../utils/tarotEngine';

interface ShareImageProps {
  reading: Reading;
  onClose: () => void;
}

export default function ShareImage({ reading, onClose }: ShareImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setGenerating(true);

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // --- Background ---
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0612');
    bg.addColorStop(0.5, '#110820');
    bg.addColorStop(1, '#0d0518');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // --- Stars ---
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.5 + 0.3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Outer border ---
    ctx.strokeStyle = 'rgba(201,168,76,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    // --- Inner border ---
    ctx.strokeStyle = 'rgba(201,168,76,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, W - 72, H - 72);

    // --- Corner ornaments ---
    drawCornerOrn(ctx, 50, 50);
    drawCornerOrn(ctx, W - 50, 50, true);
    drawCornerOrn(ctx, 50, H - 50, false, true);
    drawCornerOrn(ctx, W - 50, H - 50, true, true);

    // --- Site name ---
    ctx.fillStyle = 'rgba(201,168,76,0.5)';
    ctx.font = '500 22px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦  REAL TALK TAROT  ✦', W / 2, 90);

    // --- Reading type badge ---
    const emoji = readingTypeEmojis[reading.readingType];
    const label = readingTypeLabels[reading.readingType].toUpperCase();
    ctx.fillStyle = 'rgba(201,168,76,0.12)';
    roundRect(ctx, W / 2 - 120, 108, 240, 36, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.35)';
    ctx.lineWidth = 1;
    roundRect(ctx, W / 2 - 120, 108, 240, 36, 18);
    ctx.stroke();
    ctx.fillStyle = '#c9a84c';
    ctx.font = '500 15px Georgia, serif';
    ctx.fillText(`${emoji}  ${label}`, W / 2, 132);

    // --- Question (if present) ---
    let yStart = 185;
    if (reading.question) {
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = 'italic 20px Georgia, serif';
      const wrapped = wrapText(ctx, `"${reading.question}"`, W - 160);
      wrapped.forEach((line, i) => {
        ctx.fillText(line, W / 2, yStart + i * 30);
      });
      yStart += wrapped.length * 30 + 20;
    }

    // --- Divider ---
    drawDivider(ctx, W / 2, yStart, 200);
    yStart += 30;

    // --- Cards ---
    const cards = reading.drawnCards;
    const cardW = Math.min(180, (W - 120) / cards.length - 20);
    const cardH = cardW * 1.5;
    const totalCardsW = cards.length * (cardW + 16) - 16;
    const cardStartX = (W - totalCardsW) / 2;

    cards.forEach((drawn, i) => {
      const cx = cardStartX + i * (cardW + 16);
      const cy = yStart;

      // Card background
      const cardBg = ctx.createLinearGradient(cx, cy, cx + cardW, cy + cardH);
      cardBg.addColorStop(0, '#1a0f2e');
      cardBg.addColorStop(1, '#2d1b5e');
      ctx.fillStyle = cardBg;
      roundRect(ctx, cx, cy, cardW, cardH, 10);
      ctx.fill();

      // Card border
      ctx.strokeStyle = drawn.isReversed
        ? 'rgba(192,132,252,0.5)'
        : 'rgba(201,168,76,0.6)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, cx, cy, cardW, cardH, 10);
      ctx.stroke();

      // Symbol
      ctx.fillStyle = '#c9a84c';
      ctx.font = `${Math.floor(cardW * 0.28)}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.fillText(drawn.card.symbol, cx + cardW / 2, cy + cardH * 0.42);

      // Card name
      ctx.fillStyle = '#e8dcc8';
      ctx.font = `bold ${Math.floor(cardW * 0.1)}px Georgia, serif`;
      const nameLines = wrapText(ctx, drawn.card.name, cardW - 16);
      nameLines.forEach((line, li) => {
        ctx.fillText(line, cx + cardW / 2, cy + cardH * 0.62 + li * (cardW * 0.12));
      });

      // Reversed badge
      if (drawn.isReversed) {
        ctx.fillStyle = 'rgba(192,132,252,0.15)';
        roundRect(ctx, cx + 8, cy + cardH - 28, cardW - 16, 20, 6);
        ctx.fill();
        ctx.fillStyle = '#c084fc';
        ctx.font = `${Math.floor(cardW * 0.08)}px Georgia, serif`;
        ctx.fillText('REVERSED', cx + cardW / 2, cy + cardH - 14);
      }

      // Position label below card
      ctx.fillStyle = 'rgba(201,168,76,0.7)';
      ctx.font = `12px Georgia, serif`;
      ctx.fillText(drawn.position, cx + cardW / 2, cy + cardH + 20);
    });

    yStart += cardH + 44;

    // --- Divider ---
    drawDivider(ctx, W / 2, yStart, 160);
    yStart += 30;

    // --- Real Talk ---
    ctx.fillStyle = '#c084fc';
    ctx.font = '500 16px Georgia, serif';
    ctx.fillText('⚡  REAL TALK', W / 2, yStart);
    yStart += 28;

    ctx.fillStyle = '#f0e8ff';
    ctx.font = `italic 21px Georgia, serif`;
    const rtLines = wrapText(ctx, `"${reading.realTalkMessage}"`, W - 160);
    rtLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, yStart + i * 32);
    });
    yStart += rtLines.length * 32 + 24;

    // --- Divider ---
    drawDivider(ctx, W / 2, yStart, 100);
    yStart += 24;

    // --- URL watermark ---
    ctx.fillStyle = 'rgba(201,168,76,0.4)';
    ctx.font = '14px Georgia, serif';
    ctx.fillText('realtalktarot.com', W / 2, yStart + 10);

    // Done
    setGenerating(false);
    setGenerated(true);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `real-talk-tarot-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mystic-card max-w-lg w-full p-6 border-gold/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-cinzel text-gold text-lg">Share Your Reading</h2>
          <button onClick={onClose} className="text-smoke hover:text-gold transition-colors font-cinzel text-xl leading-none">✕</button>
        </div>

        {!generated ? (
          <div className="text-center space-y-5">
            <p className="text-mist font-cormorant italic text-base">
              Generate a shareable image for Instagram, Facebook, or wherever you post.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-raleway text-smoke">
              <div className="mystic-card p-3 border-gold/15">
                <div className="text-gold mb-1">✦</div>
                <p>Your cards and positions</p>
              </div>
              <div className="mystic-card p-3 border-gold/15">
                <div className="text-gold mb-1">⚡</div>
                <p>Your Real Talk message</p>
              </div>
              <div className="mystic-card p-3 border-gold/15">
                <div className="text-gold mb-1">☽</div>
                <p>Dark luxury aesthetic</p>
              </div>
              <div className="mystic-card p-3 border-gold/15">
                <div className="text-gold mb-1">◈</div>
                <p>1080x1080 square format</p>
              </div>
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="btn-gold w-full py-3 text-sm"
            >
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">✦</span> Generating...
                </span>
              ) : 'Generate Image'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <canvas
              ref={canvasRef}
              className="w-full rounded border border-gold/20"
              style={{ display: 'block' }}
            />
            <div className="flex gap-3">
              <button onClick={download} className="btn-gold flex-1 py-2.5 text-sm">
                Download PNG
              </button>
              <button
                onClick={() => setGenerated(false)}
                className="btn-outline px-4 py-2.5 text-sm"
              >
                Regenerate
              </button>
            </div>
            <p className="text-smoke/50 font-raleway text-xs text-center">
              Save the image then post it anywhere. Tag us if you share it!
            </p>
          </div>
        )}

        {/* Hidden canvas for pre-generation */}
        {!generated && (
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        )}
      </div>
    </div>
  );
}

// --- Canvas helpers ---

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

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
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

function drawDivider(ctx: CanvasRenderingContext2D, cx: number, y: number, halfW: number) {
  ctx.strokeStyle = 'rgba(201,168,76,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - halfW, y);
  ctx.lineTo(cx - 12, y);
  ctx.stroke();
  ctx.fillStyle = 'rgba(201,168,76,0.6)';
  ctx.font = '12px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦', cx, y + 5);
  ctx.beginPath();
  ctx.moveTo(cx + 12, y);
  ctx.lineTo(cx + halfW, y);
  ctx.stroke();
}

function drawCornerOrn(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  flipX = false, flipY = false
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  ctx.strokeStyle = 'rgba(201,168,76,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(20, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 20);
  ctx.stroke();
  ctx.restore();
}
