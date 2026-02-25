import React from 'react'
import { KnightConfig, DEFAULT_KNIGHT } from './gameTypes'

export function renderKnightSVG(cfg: Partial<KnightConfig>, height = 100): string {
  const c = { ...DEFAULT_KNIGHT, ...cfg }
  const { armorColor: ac, armorDark: ad, helmetType: ht, shieldColor: sc, shieldDark: sd, shieldDesign: sd2, weapon: wp } = c

  let helm = ''
  if (ht === 'barbuta') {
    helm = `<rect x="15" y="2" width="18" height="18" rx="3" fill="${ac}"/>
            <rect x="20" y="4" width="8" height="13" fill="#111" rx="1"/>
            <rect x="16" y="9" width="16" height="5" fill="#111"/>
            <rect x="15" y="2" width="18" height="4" rx="2" fill="${ad}"/>`
  } else if (ht === 'greathelm') {
    helm = `<rect x="14" y="2" width="20" height="18" fill="${ac}"/>
            <rect x="14" y="2" width="20" height="4" fill="${ad}"/>
            <rect x="15" y="10" width="18" height="3" fill="#111"/>
            <rect x="16" y="15" width="3" height="2" fill="#111"/>
            <rect x="21" y="15" width="3" height="2" fill="#111"/>
            <rect x="26" y="15" width="3" height="2" fill="#111"/>`
  } else if (ht === 'open') {
    helm = `<ellipse cx="24" cy="14" rx="7" ry="8" fill="#c9a07a"/>
            <rect x="14" y="5" width="6" height="14" fill="${ac}" rx="2"/>
            <rect x="28" y="5" width="6" height="14" fill="${ac}" rx="2"/>
            <rect x="16" y="2" width="16" height="8" fill="${ac}" rx="4"/>
            <ellipse cx="21" cy="11" rx="2" ry="2.5" fill="#1a1a18" opacity="0.65"/>
            <ellipse cx="27" cy="11" rx="2" ry="2.5" fill="#1a1a18" opacity="0.65"/>`
  } else {
    helm = `<rect x="15" y="4" width="18" height="16" fill="${ac}" rx="2"/>
            <rect x="20" y="6" width="8" height="11" fill="#111" rx="1"/>
            <rect x="16" y="11" width="16" height="4" fill="#111"/>
            <rect x="15" y="4" width="18" height="3" fill="${ad}"/>
            <polygon points="15,4 9,0 14,9" fill="${ac}"/>
            <polygon points="33,4 39,0 34,9" fill="${ac}"/>`
  }

  let shield = `<path d="M1,22 L13,22 L13,41 L7,47 Z" fill="${sc}"/>`
  if (sd2 === 'cross') shield += `<rect x="5" y="22" width="3" height="25" fill="white" opacity="0.32"/><rect x="1" y="30" width="12" height="3" fill="white" opacity="0.32"/>`
  else if (sd2 === 'diagonal') shield += `<polygon points="1,22 13,22 1,42" fill="black" opacity="0.18"/>`
  else if (sd2 === 'chevron') shield += `<polygon points="1,34 7,40 13,34 13,37 7,43 1,37" fill="white" opacity="0.28"/>`
  shield += `<circle cx="7" cy="34" r="2.5" fill="${sd}"/>`

  let weap = ''
  if (wp === 'sword') weap = `<rect x="38" y="12" width="3" height="30" fill="#b8b8b8"/><rect x="33" y="39" width="12" height="3" fill="${ac}"/><rect x="38" y="42" width="3" height="11" fill="#7a4a2a"/><circle cx="39.5" cy="54" r="2.8" fill="${ad}"/>`
  else if (wp === 'axe') weap = `<rect x="39" y="14" width="3" height="44" fill="#6a4a2a"/><path d="M28,14 L42,14 L42,32 Z" fill="#909090"/><path d="M28,32 L42,32 L42,14 Z" fill="#787878" opacity="0.45"/>`
  else if (wp === 'spear') weap = `<rect x="39" y="18" width="3" height="48" fill="#7a5a2a"/><polygon points="38,18 42,18 40,10" fill="#c0c0c0"/><rect x="37" y="18" width="6" height="3" fill="#909090"/>`
  else weap = `<rect x="39" y="22" width="3" height="36" fill="#6a4a2a"/><rect x="33" y="12" width="13" height="13" fill="#888"/><polygon points="33,12 28,9 33,18" fill="#999"/><polygon points="46,12 51,9 46,18" fill="#999"/>`

  const body = `<rect x="18" y="18" width="12" height="6" fill="${ad}"/>
                <rect x="13" y="24" width="22" height="22" fill="${ac}"/>
                <rect x="13" y="24" width="22" height="3" fill="${ad}"/>
                <rect x="13" y="44" width="22" height="4" fill="${ad}"/>
                <rect x="9" y="25" width="5" height="18" fill="${ac}"/>
                <rect x="34" y="25" width="5" height="18" fill="${ac}"/>`
  const legs = `<rect x="14" y="46" width="9" height="16" fill="${ac}"/>
                <rect x="25" y="46" width="9" height="16" fill="${ac}"/>
                <rect x="14" y="54" width="9" height="3" fill="${ad}"/>
                <rect x="25" y="54" width="9" height="3" fill="${ad}"/>
                <rect x="12" y="60" width="11" height="10" rx="2" fill="#2a1a0a"/>
                <rect x="25" y="60" width="11" height="10" rx="2" fill="#2a1a0a"/>`

  const w = Math.round(height * 0.667)
  return `<svg viewBox="0 0 48 72" width="${w}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="71" rx="13" ry="2" fill="black" opacity="0.28"/>
    ${legs}${body}${shield}${weap}${helm}
  </svg>`
}

interface KnightSVGProps {
  cfg?: Partial<KnightConfig>
  height?: number
  className?: string
}

export const KnightSVG: React.FC<KnightSVGProps> = ({ cfg = {}, height = 100, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: renderKnightSVG(cfg, height) }}
  />
)
