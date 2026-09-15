export type EarthPin = {
  id: string
  city: string
  lat: number
  lng: number
  image: string
  placeholder: string
}

export const EARTH_PINS: EarthPin[] = [
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    image: '/people/bengaluru.png',
    placeholder: '/people/bengaluru.svg',
  },
  {
    id: 'chennai',
    city: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    image: '/people/chennai.png',
    placeholder: '/people/chennai.svg',
  },
  {
    id: 'thanjavur',
    city: 'Thanjavur',
    lat: 10.787,
    lng: 79.1378,
    image: '/people/thanjavur.png',
    placeholder: '/people/thanjavur.svg',
  },
  {
    id: 'thanjavur-2',
    city: 'Thanjavur',
    lat: 10.787,
    lng: 79.1378,
    image: '/people/thanjavur-2.png',
    placeholder: '/people/thanjavur.svg',
  },
  {
    id: 'mannargudi',
    city: 'Mannargudi',
    lat: 10.6663,
    lng: 79.4551,
    image: '/people/mannargudi.png',
    placeholder: '/people/mannargudi.svg',
  },
]
