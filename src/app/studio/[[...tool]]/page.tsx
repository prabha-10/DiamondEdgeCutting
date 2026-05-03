import { metadata, viewport } from 'next-sanity/studio'
import StudioLoader from './Studio'

export { metadata, viewport }

export default function StudioPage() {
  return <StudioLoader />
}
