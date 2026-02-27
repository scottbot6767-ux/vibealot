import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core
        void:    '#060504',
        ink:     '#0c0a07',
        'ink-2': '#14100c',
        'ink-3': '#1e1810',
        // Parchment (map surface)
        parch:        '#ddc98a',
        'parch-mid':  '#c9ae72',
        'parch-dark': '#a88e50',
        'parch-aged': '#f0dfb4',
        // Gold
        gold:        '#c8971a',
        'gold-hi':   '#e8b832',
        'gold-dim':  '#8a6a12',
        'gold-faint':'#4a3a0c',
        // Crimson
        crim:        '#a02828',
        'crim-hi':   '#c83232',
        'crim-dim':  '#6a1818',
        // Stone / neutral
        stone:       '#4e4a44',
        'stone-mid': '#706860',
        'stone-hi':  '#9a9088',
        // Terrain
        grass:   '#2a4a1e',
        forest:  '#1e3614',
        water:   '#1e4a7a',
        road:    '#6b4a2a',
        // Glow
        'glow-gold': 'rgba(200,151,26,0.35)',
        'glow-crim': 'rgba(168,40,40,0.4)',
      },
      fontFamily: {
        title:   ['"Cinzel Decorative"', 'serif'],
        heading: ['Cinzel', 'serif'],
        body:    ['"Crimson Text"', 'Georgia', 'serif'],
        mono:    ['"Courier New"', 'monospace'],
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scalePop:  { '0%': { opacity: '0', transform: 'scale(0.88)' }, '70%': { transform: 'scale(1.03)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        emberDrift:{ '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0' }, '15%': { opacity: '1' }, '85%': { opacity: '0.5' }, '100%': { transform: 'translateY(-120px) translateX(var(--dx)) scale(0.3)', opacity: '0' } },
        pulse:     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.55' } },
        glow:      { '0%,100%': { 'box-shadow': '0 0 8px var(--glow-c,rgba(200,151,26,0.3))' }, '50%': { 'box-shadow': '0 0 22px var(--glow-c,rgba(200,151,26,0.6))' } },
        slideIn:   { '0%': { opacity: '0', transform: 'translateX(18px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        diceRoll:  { '0%': { transform: 'rotate(0deg) scale(0.55)', opacity: '0.3' }, '18%': { opacity: '1' }, '100%': { transform: 'rotate(720deg) scale(1)', opacity: '1' } },
        resultPop: { '0%': { transform: 'scale(0.45)', opacity: '0' }, '65%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        spin:      { '100%': { transform: 'rotate(360deg)' } },
        shake:     { '0%,100%': { transform: 'translate(0,0)' }, '20%': { transform: 'translate(-4px,-2px)' }, '40%': { transform: 'translate(4px,2px)' }, '60%': { transform: 'translate(-3px,3px)' }, '80%': { transform: 'translate(3px,-1px)' } },
        chronicle: { '0%': { opacity: '0', transform: 'translateY(-6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        fadeUp:     'fadeUp 0.4s ease-out both',
        scalePop:   'scalePop 0.38s cubic-bezier(0.34,1.56,0.64,1) both',
        ember:      'emberDrift 3.5s ease-in infinite',
        pulse:      'pulse 2.8s ease-in-out infinite',
        glow:       'glow 2.4s ease-in-out infinite',
        slideIn:    'slideIn 0.32s ease-out both',
        diceRoll:   'diceRoll 1.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        resultPop:  'resultPop 0.5s ease-out forwards',
        spin:       'spin 1.1s linear infinite',
        shake:      'shake 0.4s ease-in-out',
        chronicle:  'chronicle 0.3s ease-out both',
      },
      backgroundImage: {
        'parch-texture': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
} satisfies Config
