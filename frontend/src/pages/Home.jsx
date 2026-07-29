import React from 'react';
import { Bike, Car, ArrowRight } from 'lucide-react';

const COLORS = {
  skyTop: '#F3E3EC',
  skyMid: '#FBC9C2',
  skyBottom: '#FF8F86',
  pole: '#3A1D2E',
  poleLight: '#5C3049',
  plate: '#211020',
  amber: '#FFC23C',
  yellow: '#FFE18C',
  green: '#3FAE7A',
  cream: '#FAF7F2',
  ink: '#171B2E',
  slate: '#8A93B0',
  coral: '#FF5F4D',
};

const Cloud = ({ style, scale = 1, opacity = 1 }) => (
  <div style={{ position: 'absolute', ...style, opacity }}>
    <div style={{ position: 'relative', width: 90 * scale, height: 34 * scale }}>
      <div style={{ position: 'absolute', left: 0, top: 10 * scale, width: 50 * scale, height: 24 * scale, background: '#fff', borderRadius: 999 }} />
      <div style={{ position: 'absolute', left: 22 * scale, top: 0, width: 46 * scale, height: 30 * scale, background: '#fff', borderRadius: 999 }} />
      <div style={{ position: 'absolute', left: 44 * scale, top: 8 * scale, width: 46 * scale, height: 24 * scale, background: '#fff', borderRadius: 999 }} />
    </div>
  </div>
);

const SignalLight = ({ color, mark }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{ width: 30, height: 30, background: color, boxShadow: `0 0 10px ${color}99` }}
  >
    <span className="font-bold text-xs" style={{ color: color === COLORS.green ? '#fff' : '#3A2400' }}>
      {mark}
    </span>
  </div>
);

const Home = () => {
  return (
    <div className="w-screen min-h-[100dvh]">
      <style>{`
        
        .rtg-frame { font-family: 'Inter', system-ui, sans-serif; }
        .rtg-wordmark { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .rtg-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes rtg-drift {
          0%   { transform: translateX(0px); }
          50%  { transform: translateX(10px); }
          100% { transform: translateX(0px); }
        }
        @keyframes rtg-rise {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .rtg-cloud-a { animation: rtg-drift 9s ease-in-out infinite; }
        .rtg-cloud-b { animation: rtg-drift 12s ease-in-out infinite 1s; }
        .rtg-rise-1 { animation: rtg-rise 0.5s ease-out 0.1s both; }
        .rtg-rise-2 { animation: rtg-rise 0.5s ease-out 0.25s both; }
        .rtg-rise-3 { animation: rtg-rise 0.5s ease-out 0.4s both; }

        @media (prefers-reduced-motion: reduce) {
          .rtg-cloud-a, .rtg-cloud-b, .rtg-rise-1, .rtg-rise-2, .rtg-rise-3 { animation: none !important; }
        }
      `}</style>

        <div
        className="rtg-frame relative w-full min-h-[100dvh] overflow-hidden flex flex-col"
        style={{ boxShadow: 'none' }}
        >
        {/* ===== TOP: illustrated hero ===== */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${COLORS.skyTop} 0%, ${COLORS.skyMid} 55%, ${COLORS.skyBottom} 100%)` }}
        >
          {/* mini logo */}
          <div className="rtg-rise-1 absolute z-20" style={{ top: 20, left: 24 }}>
            <span className="rtg-wordmark font-bold text-lg" style={{ color: COLORS.plate }}>RTG</span>
          </div>

          {/* live badge */}
          <div className="rtg-rise-1 absolute z-20" style={{ top: 18, right: 20 }}>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.55)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.green }} />
              <span className="rtg-mono text-[10px] tracking-wider" style={{ color: COLORS.plate }}> 12 NEARBY</span>
            </div>
          </div>

          {/* clouds */}
          <Cloud style={{ top: 46, left: 18 }} scale={1.1} opacity={0.9} className="rtg-cloud-a" />
          <div className="rtg-cloud-a"><Cloud style={{ top: 40, left: 10 }} scale={1.15} opacity={0.95} /></div>
          <div className="rtg-cloud-b"><Cloud style={{ top: 90, right: 26, left: 'auto' }} scale={0.85} opacity={0.8} /></div>
          <div><Cloud style={{ top: 130, left: '38%' }} scale={0.7} opacity={0.55} /></div>

          {/* skyline */}
          <div className="absolute left-0 right-0 bottom-0 flex items-end" style={{ height: '15%' }}>
            {[34, 52, 40, 66, 46, 58, 36, 48].map((h, i) => (
              <div
                key={i}
                style={{
                  height: h,
                  width: '12.5%',
                  background: 'rgba(58,29,46,0.28)',
                  marginRight: 1,
                }}
              />
            ))}
          </div>

          {/* signpost */}
          <div
            className="rtg-rise-2 absolute"
            style={{
              left: '54%',
              top: '15%',
              bottom: '14%',
              width: 10,
              transform: 'translateX(-50%)',
              background: `linear-gradient(90deg, ${COLORS.pole} 0%, ${COLORS.poleLight} 45%, ${COLORS.pole} 100%)`,
              borderRadius: 4,
            }}
          >
            {/* cap */}
            <div
              style={{
                position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                width: 20, height: 20, borderRadius: '50%', background: COLORS.poleLight,
              }}
            />
          </div>

          {/* sign plate */}
          <div
            className="rtg-rise-2 absolute z-10"
            style={{
              top: '18%',
              left: 'calc(54% + 8px)',
              transform: 'rotate(-4deg)',
              background: COLORS.plate,
              padding: '10px 18px',
              borderRadius: 8,
              boxShadow: '0 8px 16px rgba(33,16,32,0.35)',
            }}
          >
            <span className="rtg-wordmark font-bold text-base tracking-wide" style={{ color: COLORS.cream }}>RTG</span>
          </div>

          {/* traffic-light signal box */}
          <div
            className="rtg-rise-3 absolute z-10 flex flex-col items-center gap-2"
            style={{
              top: '33%',
              left: '54%',
              transform: 'translateX(-50%)',
              background: COLORS.plate,
              padding: '10px 8px',
              borderRadius: 14,
              boxShadow: '0 10px 20px rgba(33,16,32,0.35)',
            }}
          >
            <SignalLight color={COLORS.amber} mark="!" />
            <SignalLight color={COLORS.yellow} mark="–" />
            <SignalLight color={COLORS.green} mark="✓" />
          </div>

          {/* ride-type icon box */}
          <div
            className="rtg-rise-3 absolute z-10 flex flex-col items-center gap-3"
            style={{
              top: '52%',
              left: 'calc(54% + 42px)',
              background: COLORS.plate,
              padding: '12px 10px',
              borderRadius: 14,
              boxShadow: '0 10px 20px rgba(33,16,32,0.35)',
            }}
          >
            <Bike size={18} style={{ color: COLORS.cream }} />
            <div style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: COLORS.coral }}>
              <Car size={14} style={{ color: '#fff' }} />
            </div>
          </div>
        </div>

        {/* ===== BOTTOM: sheet ===== */}
        <div
          className="relative px-7 pt-7 pb-8 flex flex-col gap-5"
          style={{
            background: COLORS.cream,
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            marginTop: '-20px',
            boxShadow: '0 -10px 30px rgba(10,14,28,0.12)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: `${COLORS.coral}1a` }}>
              <Bike size={18} style={{ color: COLORS.coral }} />
            </div>
            <h2 className="rtg-wordmark font-bold text-xl" style={{ color: COLORS.ink, letterSpacing: '-0.01em' }}>
              Get started with RTG
            </h2>
          </div>

          <p className="text-sm leading-relaxed -mt-2" style={{ color: '#5B6178' }}>
            Track your ride live, split fares with friends, and get where
            you're going — no surge guesswork, no waiting around.
          </p>

          <button
            className="w-full flex items-center justify-center gap-2 rounded-full py-4 font-semibold text-[15px] transition-transform active:scale-[0.98]"
            style={{ background: COLORS.amber, color: COLORS.ink }}
          >
            Continue
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm" style={{ color: '#9198AC' }}>
            Already riding with us?{' '}
            <span className="font-semibold underline" style={{ color: COLORS.ink }}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;