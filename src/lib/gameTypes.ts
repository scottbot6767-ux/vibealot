export interface KnightConfig {
  armorColor: string
  armorDark: string
  helmetType: 'barbuta' | 'greathelm' | 'open' | 'horned'
  shieldColor: string
  shieldDark: string
  shieldDesign: 'solid' | 'cross' | 'diagonal' | 'chevron'
  weapon: 'sword' | 'axe' | 'spear' | 'mace'
}

export interface Plot {
  id: number
  plotNumber: number
  x: number
  y: number
  claimed: boolean
  owner?: string
  ownerTitle?: string
  building?: string
  sign?: string
  knightConfig?: KnightConfig
  invasions: number
  discordUsername?: string
  plotPasscode?: string
  claimedAt?: string
}

export const DEFAULT_KNIGHT: KnightConfig = {
  armorColor: '#a8b4c0', armorDark: '#6a7a88',
  helmetType: 'barbuta',
  shieldColor: '#b83232', shieldDark: '#7a1a1a',
  shieldDesign: 'cross', weapon: 'sword',
}

export const ARMOR_OPTIONS = [
  { id: 'silver',   c: '#a8b4c0', dk: '#6a7a88', label: 'Silver'   },
  { id: 'gold',     c: '#c9a227', dk: '#8a6e18', label: 'Gold'     },
  { id: 'iron',     c: '#3c3c3c', dk: '#1c1c1c', label: 'Iron'     },
  { id: 'crimson',  c: '#b83232', dk: '#7a1a1a', label: 'Crimson'  },
  { id: 'sapphire', c: '#2a5a9c', dk: '#1a3a6c', label: 'Sapphire' },
  { id: 'forest',   c: '#2d6b2a', dk: '#1a3d18', label: 'Forest'   },
  { id: 'purple',   c: '#6b2d8b', dk: '#3d1a52', label: 'Purple'   },
]

export const HELMET_OPTIONS = [
  { id: 'barbuta',   label: 'Barbuta'   },
  { id: 'greathelm', label: 'Greathelm' },
  { id: 'open',      label: 'Open Face' },
  { id: 'horned',    label: 'Horned'    },
]

export const SHIELD_COLOR_OPTIONS = [
  { id: 'crimson', c: '#b83232', dk: '#7a1a1a', label: 'Crimson' },
  { id: 'blue',    c: '#2a5a9c', dk: '#1a3a6c', label: 'Blue'    },
  { id: 'gold',    c: '#c9a227', dk: '#8a6e18', label: 'Gold'    },
  { id: 'green',   c: '#2d6b2a', dk: '#1a3d18', label: 'Green'   },
  { id: 'black',   c: '#2a2a2a', dk: '#0a0a0a', label: 'Black'   },
  { id: 'white',   c: '#e0e0da', dk: '#9a9a94', label: 'White'   },
  { id: 'purple',  c: '#6b2d8b', dk: '#3d1a52', label: 'Purple'  },
]

export const SHIELD_DESIGN_OPTIONS = [
  { id: 'solid',    label: 'Solid'    },
  { id: 'cross',    label: 'Cross'    },
  { id: 'diagonal', label: 'Diagonal' },
  { id: 'chevron',  label: 'Chevron'  },
]

export const WEAPON_OPTIONS = [
  { id: 'sword', label: 'Sword' },
  { id: 'axe',   label: 'Axe'   },
  { id: 'spear', label: 'Spear' },
  { id: 'mace',  label: 'Mace'  },
]

export const OWNER_TITLES = ['Sir', 'Lady', 'Lord', 'Master', 'Dame', 'Elder', 'Scholar']

export const BUILDINGS: Record<string, { name: string; svg: string }> = {
  cottage:    { name: 'Cottage',    svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="24" height="18" fill="#c9a07a"/><polygon points="20,2 4,14 36,14" fill="#8b4522"/><rect x="16" y="20" width="8" height="12" fill="#3a2010"/><rect x="10" y="17" width="5" height="5" fill="#7ab8d4"/><rect x="25" y="17" width="5" height="5" fill="#7ab8d4"/></svg>` },
  manor:      { name: 'Manor',      svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="12" width="32" height="20" fill="#b0a07a"/><rect x="6" y="14" width="8" height="8" fill="#7ab8d4"/><rect x="26" y="14" width="8" height="8" fill="#7ab8d4"/><rect x="16" y="18" width="8" height="14" fill="#3a2010"/><polygon points="20,0 0,12 40,12" fill="#3a5a8c"/><rect x="18" y="2" width="4" height="8" fill="#5a5a58"/></svg>` },
  blacksmith: { name: 'Blacksmith', svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="14" width="28" height="18" fill="#7a6345"/><polygon points="20,4 2,14 38,14" fill="#4a4a48"/><rect x="14" y="20" width="12" height="12" fill="#2a1a08"/><rect x="32" y="8" width="6" height="24" fill="#5a5a58"/><rect x="31" y="4" width="8" height="6" fill="#4a4a48"/><circle cx="10" cy="24" r="3" fill="#880000"/></svg>` },
  tavern:     { name: 'Tavern',     svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="12" width="32" height="20" fill="#c09020"/><polygon points="20,2 0,12 40,12" fill="#7a4a1a"/><rect x="14" y="18" width="12" height="14" fill="#3a2010"/><rect x="6" y="14" width="6" height="8" fill="#7ab8d4"/><rect x="28" y="14" width="6" height="8" fill="#7ab8d4"/><circle cx="4" cy="6" r="3" fill="#c09020"/></svg>` },
  market:     { name: 'Market',     svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="16" width="32" height="16" fill="#c09a7a"/><polygon points="20,4 0,16 40,16" fill="#8a4220"/><rect x="6" y="18" width="28" height="12" fill="#3a2010"/><rect x="8" y="20" width="8" height="8" fill="#c09020"/><rect x="18" y="20" width="8" height="8" fill="#3a6820"/></svg>` },
  chapel:     { name: 'Chapel',     svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="14" width="20" height="18" fill="#d0d0cc"/><polygon points="20,4 6,14 34,14" fill="#4a4a48"/><rect x="16" y="20" width="8" height="12" fill="#3a2010"/><rect x="18" y="0" width="4" height="6" fill="#c09020"/><rect x="16" y="2" width="8" height="2" fill="#c09020"/></svg>` },
  windmill:   { name: 'Windmill',   svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,32 28,32 24,8 16,8" fill="#c09a7a"/><rect x="14" y="24" width="6" height="8" fill="#3a2010"/><circle cx="20" cy="10" r="3" fill="#7a4a1a"/><line x1="20" y1="10" x2="20" y2="0" stroke="#7a4a1a" stroke-width="2"/><line x1="20" y1="10" x2="30" y2="10" stroke="#7a4a1a" stroke-width="2"/><line x1="20" y1="10" x2="20" y2="20" stroke="#7a4a1a" stroke-width="2"/><line x1="20" y1="10" x2="10" y2="10" stroke="#7a4a1a" stroke-width="2"/></svg>` },
  library:    { name: 'Library',    svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="32" height="26" fill="#b0a07a"/><rect x="2" y="4" width="36" height="4" fill="#5a5a58"/><rect x="8" y="10" width="6" height="10" fill="#7ab8d4"/><rect x="17" y="10" width="6" height="10" fill="#7ab8d4"/><rect x="26" y="10" width="6" height="10" fill="#7ab8d4"/><rect x="14" y="22" width="12" height="10" fill="#3a2010"/></svg>` },
  tower:      { name: 'Tower',      svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="8" width="16" height="24" fill="#7a7a78"/><rect x="10" y="6" width="20" height="4" fill="#5a5a58"/><polygon points="20,0 8,6 32,6" fill="#3a5a8c"/><rect x="16" y="24" width="8" height="8" fill="#2a1a08"/></svg>` },
  theatre:    { name: 'Theatre',    svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="12" width="32" height="20" fill="#c09020"/><rect x="2" y="10" width="36" height="4" fill="#7a4a1a"/><rect x="14" y="18" width="12" height="14" fill="#3a2010"/><circle cx="11" cy="16" r="2" fill="#880000"/><circle cx="29" cy="16" r="2" fill="#3a5a8c"/></svg>` },
  bakery:     { name: 'Bakery',     svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="14" width="28" height="18" fill="#d4bc60"/><polygon points="20,4 2,14 38,14" fill="#8a4220"/><rect x="14" y="20" width="12" height="12" fill="#3a2010"/><ellipse cx="28" cy="18" rx="5" ry="3" fill="#c09020"/></svg>` },
  stable:     { name: 'Stable',     svg: `<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="14" width="32" height="18" fill="#7a4a1a"/><polygon points="20,4 0,14 40,14" fill="#3a2010"/><rect x="6" y="18" width="10" height="14" fill="#2a1208"/><rect x="18" y="18" width="10" height="14" fill="#2a1208"/><rect x="8" y="20" width="6" height="4" fill="#5a5a58"/></svg>` },
}

export const INVASION_COOLDOWN_MS = 3 * 60 * 60 * 1000
export const INVASION_KEY = 'vibealot_invasion_ts'
export const ROLL_THRESHOLD = 13
export const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1475703516520644687/eXl4XhmdHY_RdvYbKxSV5xhr1YOnt6rgQfYNI0sEfx4bse7fJI77hLm2DoZD7eRujgH0'
