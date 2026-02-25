import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:            '#0d0b08',
        card:          '#13100c',
        parchment:     '#e8d4a0',
        'parchment-dark': '#c4ae7a',
        'parchment-dim':  '#b8a06a',
        ink:           '#1a1208',
        gold:          '#d4a827',
        'gold-light':  '#e8c04a',
        'gold-dark':   '#9a7818',
        crimson:       '#b83232',
        'crimson-dark':'#7a1a1a',
        'crimson-light':'#d44040',
        stone:         '#5a5a58',
        'stone-light': '#7a7a78',
        wood:          '#6b4a2a',
        'wood-dark':   '#3a2a14',
        forest:        '#2a5220',
        'forest-light':'#3e7830',
        water:         '#2a5a8c',
        'water-light': '#4a7aac',
        grass:         '#2a4a1e',
        'grass-dark':  '#1e3614',
      },
      fontFamily: {
        title:  ['"Cinzel Decorative"', 'MedievalSharp', 'cursive'],
        heading:['Cinzel', 'serif'],
        body:   ['"Crimson Text"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
