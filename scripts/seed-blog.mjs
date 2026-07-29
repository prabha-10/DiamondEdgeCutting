/**
 * Seed sample blog content into Sanity: 1 author, 3 categories, 4 posts.
 *
 * Purpose: give the /blog index and article template something real to render
 * so the design can be reviewed before the client writes their own pieces.
 * The copy is deliberately general — method, sequencing and trade-offs — and
 * states no prices, permit fees or regulation numbers, because inventing those
 * for a licensed contractor's site would be worse than shipping no content.
 * Treat every word as a placeholder to be rewritten in Studio.
 *
 * Every document uses a deterministic `sample-blog.*` _id, so:
 *   - re-running is idempotent (createIfNotExists by default)
 *   - `--delete` can find and remove exactly what this script created
 *
 * Usage:
 *   npm run seed:blog              # create if missing, keep existing edits
 *   npm run seed:blog -- --replace # overwrite the sample docs from this file
 *   npm run seed:blog -- --delete  # remove every sample-blog.* document
 *   SEED_YES=1 npm run seed:blog   # skip the confirmation prompt
 *
 * Hero images are uploaded from public/, so this needs no network beyond
 * Sanity and reuses the company's own photography rather than stock.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

dotenv.config({ path: '.env.local' })

const projectId =
  process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.')
  process.exit(1)
}

const REPLACE = process.argv.includes('--replace')
const DELETE = process.argv.includes('--delete')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Portable Text helpers ──────────────────────────────────────────────────
// Sanity requires a _key on every block and span. They only have to be unique
// within the document, so a per-document counter is enough and keeps the
// output stable between runs (which is what makes --replace a no-op diff).

function makeBodyBuilder() {
  let n = 0
  const key = () => `k${(n += 1)}`

  const textBlock = (style, text, markDefs = [], marks = []) => ({
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children: [{ _type: 'span', _key: key(), text, marks }],
  })

  return {
    p: (text) => textBlock('normal', text),
    h2: (text) => textBlock('h2', text),
    h3: (text) => textBlock('h3', text),
    quote: (text) => textBlock('blockquote', text),
    /** A paragraph ending in a link, e.g. pLink('Talk to us about ', 'scope', '/contact'). */
    pLink: (lead, linkText, href) => {
      const linkKey = key()
      return {
        _type: 'block',
        _key: key(),
        style: 'normal',
        markDefs: [{ _type: 'link', _key: linkKey, href }],
        children: [
          { _type: 'span', _key: key(), text: lead, marks: [] },
          { _type: 'span', _key: key(), text: linkText, marks: [linkKey] },
          { _type: 'span', _key: key(), text: '.', marks: [] },
        ],
      }
    },
    bullets: (items) =>
      items.map((text) => ({
        ...textBlock('normal', text),
        listItem: 'bullet',
        level: 1,
      })),
    numbers: (items) =>
      items.map((text) => ({
        ...textBlock('normal', text),
        listItem: 'number',
        level: 1,
      })),
    image: (assetId, alt, caption) => ({
      _type: 'image',
      _key: key(),
      asset: { _type: 'reference', _ref: assetId },
      alt,
      caption,
    }),
  }
}

// ─── Image upload ───────────────────────────────────────────────────────────
// Reuses an already-uploaded asset when one with the same filename exists, so
// re-running does not fill the media library with duplicates.

async function uploadImage(relativePath) {
  const filePath = path.resolve(relativePath)
  if (!fs.existsSync(filePath)) {
    console.error(`Image not found: ${filePath}`)
    process.exit(1)
  }
  const filename = path.basename(filePath)

  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  )
  if (existing) {
    console.log(`  reused  ${filename}`)
    return existing
  }

  const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename })
  console.log(`  uploaded ${filename}`)
  return asset._id
}

const imageRef = (assetId) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
})

// ─── Content ────────────────────────────────────────────────────────────────

const AUTHOR_ID = 'sample-blog.author.editorial'

// A team byline rather than an invented individual: attributing placeholder
// copy to a named person who may not exist would be a fabricated credential on
// a real company's site.
const author = {
  _id: AUTHOR_ID,
  _type: 'author',
  name: 'Diamond Edge Editorial',
  slug: { _type: 'slug', current: 'diamond-edge-editorial' },
  role: 'Technical Team, Diamond Edge Cutting',
  bio: 'Written by the engineers and site managers who plan and run Diamond Edge Cutting projects across the UAE and the wider GCC. Replace this bio, or point posts at a named author, from Studio.',
}

const categories = [
  {
    _id: 'sample-blog.category.equipment',
    _type: 'postCategory',
    title: 'Equipment',
    slug: { _type: 'slug', current: 'equipment' },
    description: 'Machines, attachments and what each one is actually for.',
    color: 'orange',
    order: 1,
  },
  {
    _id: 'sample-blog.category.method-safety',
    _type: 'postCategory',
    title: 'Method & Safety',
    slug: { _type: 'slug', current: 'method-and-safety' },
    description: 'Sequencing, controls and site preparation.',
    color: 'blue',
    order: 2,
  },
  {
    _id: 'sample-blog.category.industry-insights',
    _type: 'postCategory',
    title: 'Industry Insights',
    slug: { _type: 'slug', current: 'industry-insights' },
    description: 'How the work is changing, and what it means for clients.',
    color: 'teal',
    order: 3,
  },
]

const categoryRef = (id) => ({ _type: 'reference', _ref: id })

function buildPosts(assets) {
  const posts = []

  // ── 1. Featured ───────────────────────────────────────────────────────────
  {
    const b = makeBodyBuilder()
    posts.push({
      _id: 'sample-blog.post.robotic-demolition',
      _type: 'post',
      title: 'Where Robotic Demolition Earns Its Keep',
      slug: { _type: 'slug', current: 'where-robotic-demolition-earns-its-keep' },
      category: categoryRef('sample-blog.category.equipment'),
      author: { _type: 'reference', _ref: AUTHOR_ID },
      excerpt:
        'Remote-controlled machines are not a replacement for every excavator. They earn their place in confined, unstable or high-heat work where putting an operator in the structure is the real risk.',
      heroImage: imageRef(assets.robotic),
      publishedAt: '2026-06-18T09:00:00.000Z',
      featured: true,
      body: [
        b.p(
          'Robotic demolition machines get talked about as a straight upgrade on conventional plant. They are not. They are slower than a comparable excavator in open ground and they cost more per hour to run. What they buy you is the ability to take the operator out of the structure entirely — and on the right job, that single fact reorders the whole method statement.',
        ),
        b.h2('Confined and low-headroom work'),
        b.p(
          'The clearest case is anywhere a conventional machine simply will not fit. Basement slabs, plant rooms, lift shafts and internal cores all have headroom and access limits that rule out a tracked excavator long before they rule out a compact remote machine. A robot that fits through a standard door opening and works under two-and-a-half metres of headroom removes the alternative, which is usually hand-breaking with handheld tools.',
        ),
        b.p(
          'That comparison is the one that matters. The question is rarely "robot or excavator" — it is "robot or a crew of men with breakers", and on that basis the productivity gap is large.',
        ),
        b.h2('Structures you do not trust'),
        b.p(
          'Fire-damaged buildings, partially collapsed structures and anything with compromised reinforcement share a problem: you cannot safely assess what the structure will do as you take load out of it. Remote operation lets the machine work inside a zone the assessment says nobody should stand in.',
        ),
        b.quote(
          'The value is not that the machine is clever. It is that the exclusion zone can include the machine and still not include a person.',
        ),
        b.h2('Heat, dust and refractory work'),
        b.p(
          'Kiln and furnace strip-out is the other natural fit. Residual heat and refractory dust put hard limits on how long a person can work at the face, which fragments the programme into short shifts with long breaks. A remote machine works continuously in conditions that would otherwise dictate the schedule.',
        ),
        b.image(
          assets.coreDrilling,
          'Operator running a remote-controlled demolition machine at a distance from the work face',
          'Remote operation keeps the operator outside the zone the risk assessment excludes.',
        ),
        b.h2('Where they are the wrong answer'),
        b.p('Robotic plant is a poor choice when:'),
        ...b.bullets([
          'The site is open, the structure is sound, and a long-reach excavator can simply reach it.',
          'Bulk volume is the driver — tonnes per hour still favours conventional plant by a wide margin.',
          'The work is short enough that mobilisation and set-up outweigh the time saved at the face.',
        ]),
        b.h2('How to brief a contractor'),
        b.p(
          'If you are scoping work and are not sure whether remote plant applies, the useful things to put in front of a contractor are access dimensions, headroom, floor loading, and whether the structure has been assessed as sound. Those four determine the answer far more than the square metreage does.',
        ),
        b.pLink(
          'If you have a structure you are unsure how to approach, send us the drawings and constraints and we will tell you what the method would actually be — start with our ',
          'contact page',
          '/contact',
        ),
      ],
    })
  }

  // ── 2. Equipment ──────────────────────────────────────────────────────────
  {
    const b = makeBodyBuilder()
    posts.push({
      _id: 'sample-blog.post.concrete-cutting-methods',
      _type: 'post',
      title: 'Wall Saw, Wire Saw or Core Drill: Choosing a Cutting Method',
      slug: { _type: 'slug', current: 'wall-saw-wire-saw-or-core-drill' },
      category: categoryRef('sample-blog.category.equipment'),
      author: { _type: 'reference', _ref: AUTHOR_ID },
      excerpt:
        'Three tools, three very different jobs. Getting the method right at tender stage is usually the difference between a clean opening and a week of remedial work.',
      heroImage: imageRef(assets.wireSawing),
      publishedAt: '2026-05-02T09:00:00.000Z',
      featured: false,
      body: [
        b.p(
          'Most cutting scopes arrive described by the outcome — "form a new door opening", "remove this section of slab" — rather than by method. That is the right way round, but it means the method decision lands with the contractor, and it is worth understanding how that decision gets made.',
        ),
        b.h2('Wall sawing'),
        b.p(
          'A track-mounted circular blade, running on a rail fixed to the face. It gives straight, square, dimensionally accurate cuts and is the default for openings in walls and slabs where both faces are accessible.',
        ),
        b.p(
          'The constraint is blade diameter. Cut depth is roughly a third of the blade, so thickness sets the machine, and beyond a certain thickness you are cutting from both sides and living with the alignment tolerance where the two cuts meet.',
        ),
        b.h2('Wire sawing'),
        b.p(
          'A diamond-beaded wire driven in a loop through the element. There is effectively no depth limit, which makes it the method for mass concrete, heavily reinforced sections, bridge elements and anything a blade cannot reach through.',
        ),
        b.p(
          'It needs entry holes for the wire and space to run the drive unit, so it is more set-up-intensive than a wall saw. On thin elements it is usually the wrong tool — the set-up outweighs the cut.',
        ),
        b.h2('Core drilling'),
        b.p(
          'A rotating hollow bit producing a clean cylindrical hole. This is service penetration work — MEP risers, ducting, anchor holes, and investigation cores for testing.',
        ),
        b.p(
          'It is also the enabling step for the other two: wire saw entry points and wall saw plunge points are usually cored first.',
        ),
        b.h2('Choosing between them'),
        ...b.numbers([
          'Is the shape a circle? Core drill.',
          'Is it a straight-sided opening in an element you can reach both faces of, within blade depth? Wall saw.',
          'Is it thicker than a blade will reach, heavily reinforced, or awkward to access? Wire saw.',
        ]),
        b.h2('What changes the answer'),
        b.p(
          'Three site conditions override the simple version above: water management, because all three methods are wet-cut and the slurry has to go somewhere; access for the power pack; and whether the element is load-bearing, which turns a cutting job into a temporary works job with propping ahead of the cut.',
        ),
        b.pLink(
          'Diamond Edge runs all three in-house across the UAE. If you are scoping a cutting package, ',
          'talk to us before the method is fixed',
          '/contact',
        ),
      ],
    })
  }

  // ── 3. Method & Safety ────────────────────────────────────────────────────
  {
    const b = makeBodyBuilder()
    posts.push({
      _id: 'sample-blog.post.site-preparation',
      _type: 'post',
      title: 'What to Have Ready Before a Demolition Crew Mobilises',
      slug: { _type: 'slug', current: 'what-to-have-ready-before-mobilisation' },
      category: categoryRef('sample-blog.category.method-safety'),
      author: { _type: 'reference', _ref: AUTHOR_ID },
      excerpt:
        'Most demolition delays are not caused by the demolition. They are caused by a disconnection that was never confirmed, or a survey nobody commissioned.',
      heroImage: imageRef(assets.stripOut),
      publishedAt: '2026-04-11T09:00:00.000Z',
      featured: false,
      body: [
        b.p(
          'A contractor arriving on a site that is not ready is the single most common cause of a demolition programme slipping in its first week. Almost none of it is about the building. It is about paperwork and utilities that had to be resolved before anyone could safely start.',
        ),
        b.h2('Utilities, confirmed in writing'),
        b.p(
          'Every service into the building needs to be disconnected and — this is the part that gets missed — confirmed as disconnected by the authority or provider, in writing. A meter that has been removed is not the same as a supply that has been isolated upstream.',
        ),
        ...b.bullets([
          'Electrical supply isolated and confirmed at the authority, not just at the board.',
          'Water and irrigation capped at the boundary.',
          'Drainage identified, and any live runs crossing the site protected or diverted.',
          'Gas, telecoms and any private services traced — these are the ones missing from the drawings.',
        ]),
        b.h2('Surveys that change the method'),
        b.p(
          'Two surveys routinely change the method statement rather than merely informing it. A hazardous materials survey determines whether a licensed removal package has to run before demolition starts at all. A structural assessment determines the sequence — what holds up what, and therefore what comes down in which order.',
        ),
        b.quote(
          'Commissioning the survey after the contractor mobilises does not save time. It stops the job while the results come back.',
        ),
        b.h2('Access and the neighbours'),
        b.p(
          'Plant has to get in and material has to get out. That means confirmed access dimensions, a route that will carry the axle loads, and somewhere to stand equipment. Where the site adjoins occupied buildings, the party wall position, agreed working hours and the noise and dust controls should be settled before mobilisation, not negotiated during it.',
        ),
        b.h2('A short pre-mobilisation checklist'),
        ...b.numbers([
          'All utility disconnections confirmed in writing by the provider.',
          'Hazardous materials survey complete, and any removal package closed out.',
          'Structural assessment issued to the demolition contractor.',
          'Permits and approvals in hand for the intended working hours.',
          'Access route, crane or plant standing area, and waste egress agreed.',
          'Adjoining owners notified and any protection works agreed.',
        ]),
        b.pLink(
          'If you are unsure which of these apply to your site, we will walk the checklist with you — ',
          'request a site inspection',
          '/contact',
        ),
      ],
    })
  }

  // ── 4. Industry Insights ──────────────────────────────────────────────────
  {
    const b = makeBodyBuilder()
    posts.push({
      _id: 'sample-blog.post.selective-vs-full',
      _type: 'post',
      title: 'Selective Demolition or Full Teardown: How the Decision Gets Made',
      slug: { _type: 'slug', current: 'selective-demolition-or-full-teardown' },
      category: categoryRef('sample-blog.category.industry-insights'),
      author: { _type: 'reference', _ref: AUTHOR_ID },
      excerpt:
        'Keeping a frame and stripping back to it is often cheaper and faster than starting again — but only when the structure, the programme and the end use all line up.',
      heroImage: imageRef(assets.controlled),
      publishedAt: '2026-03-05T09:00:00.000Z',
      featured: false,
      body: [
        b.p(
          'Selective demolition — taking a building back to its frame or retaining part of it — is increasingly the default question on refurbishment work rather than an alternative to consider. It is not automatically the better answer, and the cases where it is not tend to share a few characteristics.',
        ),
        b.h2('When retaining the structure works'),
        b.p(
          'The strongest case is a sound frame with a floor plate that suits the new use. If the grid, floor-to-floor heights and loading all work for what the building is becoming, the frame is the most expensive thing on site and demolishing it is throwing money away.',
        ),
        b.p(
          'Programme is usually the second driver. Strip-out and refit can start floor by floor while other work continues, where a full teardown puts the whole site in one long single-threaded sequence.',
        ),
        b.h2('When it does not'),
        ...b.bullets([
          'Floor-to-floor heights that will not take the new services once ceilings and raised floors are allowed for.',
          'A column grid that fights the new layout — retaining it locks in a compromise for the life of the building.',
          'Structural condition that needs enough remediation to approach the cost of a new frame.',
          'Hazardous material distributed through the structure rather than concentrated in removable elements.',
        ]),
        b.h2('The part that gets underestimated'),
        b.p(
          'Selective work is more labour-intensive and more sequencing-sensitive than a full teardown. You are cutting and removing elements while the rest of the structure stays standing, which means temporary works, propping, and a method statement that has to be right rather than merely safe.',
        ),
        b.p(
          'That is a real cost. It is usually still the lower one, but it is not free, and a comparison that treats selective demolition as "the same job, less of it" will get the number wrong.',
        ),
        b.h2('Material recovery'),
        b.p(
          'Both routes generate recoverable material — structural steel, rebar and crushable concrete all have a value that offsets disposal. Recovery is worth building into the comparison explicitly rather than treating it as a rounding error, particularly on steel-framed and industrial buildings.',
        ),
        b.pLink(
          'We are usually able to give an indicative view from drawings and a site walk before you commit either way — ',
          'get in touch',
          '/contact',
        ),
      ],
    })
  }

  return posts
}

// ─── Confirm prompt ─────────────────────────────────────────────────────────
async function confirm(prompt) {
  if (process.env.SEED_YES === '1') {
    console.log(`${prompt} (auto-confirmed by SEED_YES=1)`)
    return true
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(`${prompt} (yes/no): `, (a) => {
      rl.close()
      resolve(a.trim().toLowerCase() === 'yes')
    })
  })
}

// ─── Delete mode ────────────────────────────────────────────────────────────
async function runDelete() {
  const ids = await client.fetch(`*[_id match "sample-blog.*"]._id`)
  // Drafts carry a `drafts.` prefix, so they do not match the pattern above and
  // have to be named explicitly or Studio keeps showing the deleted documents.
  const all = Array.from(new Set([...ids, ...ids.map((id) => `drafts.${id}`)]))

  if (ids.length === 0) {
    console.log('No sample-blog.* documents found. Nothing to delete.')
    return
  }
  console.log(`Found ${ids.length} sample document(s):`)
  for (const id of ids) console.log(`  - ${id}`)
  console.log('')

  const ok = await confirm('Delete all of these (and their drafts)?')
  if (!ok) {
    console.log('Aborted.')
    return
  }

  let tx = client.transaction()
  for (const id of all) tx = tx.delete(id)
  await tx.commit()
  console.log(`Deleted ${ids.length} document(s).`)
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Project ${projectId}, dataset ${dataset}`)

  if (DELETE) {
    await runDelete()
    return
  }

  console.log('Uploading hero images...')
  const assets = {
    robotic: await uploadImage('public/service-robotic-demolition.jpg'),
    wireSawing: await uploadImage('public/service-wire-sawing.jpg'),
    stripOut: await uploadImage('public/service-strip-out.jpg'),
    controlled: await uploadImage('public/service-controlled-demolition.jpg'),
    coreDrilling: await uploadImage('public/service-core-drilling.jpg'),
  }

  const posts = buildPosts(assets)
  const docs = [author, ...categories, ...posts]

  const existing = await client.fetch(`*[_id match "sample-blog.*"]._id`)
  console.log('')
  console.log('Plan:')
  console.log(`  documents in this script: ${docs.length}`)
  console.log(`  already in Sanity:        ${existing.length}`)
  console.log(`  mode:                     ${REPLACE ? 'createOrReplace' : 'createIfNotExists'}`)
  console.log('')

  const ok = await confirm(
    REPLACE
      ? 'Overwrite the sample blog documents from this file?'
      : 'Create the missing sample blog documents?',
  )
  if (!ok) {
    console.log('Aborted.')
    return
  }

  let tx = client.transaction()
  for (const doc of docs) {
    tx = REPLACE ? tx.createOrReplace(doc) : tx.createIfNotExists(doc)
  }
  await tx.commit()

  console.log('')
  console.log(`Done. ${docs.length} document(s) written.`)
  console.log('  1 author, 3 categories, 4 posts (1 featured).')
  console.log('  Review at /blog, edit at /studio.')
  console.log('  Remove later with: npm run seed:blog -- --delete')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
