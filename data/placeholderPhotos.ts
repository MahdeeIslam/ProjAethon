/**
 * Placeholder photos from public/placeholders/photos/
 * Horizontal and vertical images for use across the site.
 * Saad, Nazif, and Barisa have dedicated folders for head shots.
 */

const PHOTOS_BASE = '/placeholders/photos'

/** Photos for the three project heads (Saad, Nazif, Barisa) */
export const HEADS_PHOTOS = {
  saad: `${PHOTOS_BASE}/Saad/IMG_3832.PNG`,
  nazif: `${PHOTOS_BASE}/Nazif/IMG_3831.jpg`,
  barisa: `${PHOTOS_BASE}/Barisa/IMG_3833.PNG`,
} as const

export const HORIZONTAL_PHOTOS: string[] = [
  `${PHOTOS_BASE}/horizontal/DSC02676.jpg`,
  `${PHOTOS_BASE}/horizontal/DSC02654.jpg`,
  `${PHOTOS_BASE}/horizontal/hf_20260309_005554_c8fa21eb-106b-4e61-b2bf-847299988f38.jpeg`,
  `${PHOTOS_BASE}/horizontal/hf_20260309_010322_24c03a36-0870-46df-bdc7-0ef5dd92ce7e.jpeg`,
]

export const VERTICAL_PHOTOS: string[] = [
  `${PHOTOS_BASE}/vertical/DSC02649.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02664.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02646.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02640.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02629.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02622.jpg`,
  `${PHOTOS_BASE}/vertical/DSC02687.jpg`,
  `${PHOTOS_BASE}/vertical/DSC01201-2.jpg`,
  `${PHOTOS_BASE}/vertical/DSC01202-3.jpg`,
]

/** First horizontal photo — e.g. for hero poster */
export const HERO_PHOTO = HORIZONTAL_PHOTOS[0]

/** Get horizontal photo by index (wraps around) */
export function getHorizontalPhoto(index: number): string {
  return HORIZONTAL_PHOTOS[index % HORIZONTAL_PHOTOS.length]
}

/** Get vertical photo by index (wraps around) */
export function getVerticalPhoto(index: number): string {
  return VERTICAL_PHOTOS[index % VERTICAL_PHOTOS.length]
}
