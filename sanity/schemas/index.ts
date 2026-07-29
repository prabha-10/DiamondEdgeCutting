import { projectCategory } from './projectCategory'
import { project } from './project'
import { teamMember } from './teamMember'
import { service } from './service'
import { rentalCategory } from './rentalCategory'
import { blockContent } from './blockContent'
import { postCategory } from './postCategory'
import { author } from './author'
import { post } from './post'

export const schemaTypes = [
  projectCategory,
  project,
  teamMember,
  service,
  rentalCategory,
  // Blog. `blockContent` is an object type, not a document — it only exists so
  // `post.body` can reference it, and never shows up in Studio's document list.
  blockContent,
  postCategory,
  author,
  post
]
