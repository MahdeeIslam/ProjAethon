export interface Organisation {
  id: string
  name: string
  logo: string
}

/**
 * Featured client logos shown on the About page. All variants chosen are
 * intended to read well against the dark obsidian background — white text /
 * transparent / light gold marks. Light-background variants (dark text on
 * white panels) are intentionally skipped.
 */
export const organisations: Organisation[] = [
  { id: 'amssa', name: 'AMSSA', logo: '/orgs/amssa.png' },
  { id: 'ar360', name: 'Arabic Revival 360', logo: '/orgs/ar360.png' },
  { id: 'iicsa', name: 'IICSA', logo: '/orgs/iicsa.png' },
  { id: 'iraus', name: 'Islamic Relief Australia', logo: '/orgs/iraus.png' },
  { id: 'icv', name: 'Islamic Council of Victoria', logo: '/orgs/icv.png' },
  { id: 'jbe', name: 'JBE Events', logo: '/orgs/jbe.png' },
  { id: 'pgcc', name: 'PGCC Next Gen', logo: '/orgs/pgcc.png' },
  { id: 'umma', name: 'UMMA', logo: '/orgs/umma.png' },
  { id: 'strangers-studio', name: 'The Strangers Studio', logo: '/orgs/strangers-studio.png' },
  { id: 'wartaqi', name: 'Wartaqi', logo: '/orgs/wartaqi.png' },
  { id: 'virgin-mary-mosque', name: 'Virgin Mary Mosque', logo: '/orgs/white-logo.png' },
  { id: 'npicc', name: 'NPICC', logo: '/orgs/images-removebg.png' },
  { id: 'early-hours', name: 'Early Hours Run Club', logo: '/orgs/early-hours.png' },
  { id: 'mben', name: 'Muslim Built Environment Network', logo: '/orgs/mben.png' },
  { id: 'cafe-carlton', name: 'Café Carlton', logo: '/orgs/cafe-carlton.png' },
  { id: 'strength-engineering', name: 'Strength Engineering', logo: '/orgs/strength-engineering.png' },
  { id: 'halal-bros', name: 'Halal Bros', logo: '/orgs/halal-bros.png' },
  { id: 'al-emaan', name: 'Al Emaan Travels', logo: '/orgs/al-emaan.png' },
  { id: 'aais', name: 'Albanian Australian Islamic Society', logo: '/orgs/aais.png' },
]
