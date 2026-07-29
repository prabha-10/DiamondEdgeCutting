# Diamond Edge Cutting Website — Project Handoff

**Project:** Diamond Edge Cutting marketing site (specialist demolition & concrete cutting, Dubai / UAE)
**Live domain:** diamondedgecutting.com
**Staging:** https://diamond-edge-cutting-g9kq.vercel.app
**Repo:** github.com/prabha-10/DiamondEdgeCutting
**Handed over by:** _(fill in)_ → **to:** _(fill in)_ · **Date:** _(fill in)_

**Audience:** This document is written for two readers at once — the client (non-technical, needs
to know what they can change themselves and who to call when something breaks) and the developer
(needs the technical map to get productive fast). Sections are marked accordingly; skim past the
ones that aren't for you.

> 🔒 Section 4 will contain passwords once filled in. Keep the completed copy in a password
> manager, not in the repo — this file is committed to git.

---

## ⚠ Status at handover — read this first

**The website is not currently capturing any leads.** Every enquiry path is either a dead end or
does nothing. This is not a subtle bug; it is the site's main commercial function, and it is off.

| Path | State |
| --- | --- |
| Contact form on `/contact` | Shows "Message Sent" but **sends nothing**. No email, no record. |
| Equipment enquiry basket | Fully built and wired to the API, but **no page can add items to it**, so it never appears. |
| `/api/rental-inquiry` | Working code, but **nothing on the site calls it**. |

Details and file references in §6.1. Everything else in this document describes a site that
otherwise works. **Fixing lead capture is the first job for whoever takes this over.**

---

## 1. Project Overview

Diamond Edge Cutting is a Next.js marketing website for a specialist demolition contractor
operating across the UAE and wider GCC since 2008. It presents the company's demolition services,
its rental equipment fleet (billed as the GCC's largest robotic demolition fleet), a portfolio of
completed projects, the leadership team, and an enquiry route for new work.

**Plain-language summary (client):** the site is a set of pages plus one "control panel" — a
content editor (Sanity Studio, at `/studio`) where you can change services, projects, rental
equipment categories and team members yourself. There is no login for anything else. Enquiries are
meant to arrive by email at `info@diamondedgecutting.com`; see the warning above about why they
currently do not.

**Technical stack (developer):**

- Next.js **16.2.12** (App Router, server components), React **19.2.4**, TypeScript
- Tailwind CSS **4** (via `@tailwindcss/postcss`), `class-variance-authority` + `tailwind-merge`
- Framer Motion **12** and GSAP **3** for animation; `lucide-react` for icons
- Sanity **v5** (headless CMS, Studio embedded at `/studio`), `next-sanity`, `@sanity/image-url`
- Resend for transactional email; `react-hook-form` + `zod` for form handling
- **No database. No auth system** — Sanity handles Studio login; nothing else is gated.
- Two hosts: Vercel serves staging from `dev`, Hostinger serves production from `main`.

---

## 2. Site Map

| Route | What it is | Content source |
| --- | --- | --- |
| `/` | Home — hero, services grid, featured projects, leadership, FAQ, rental teaser | Sanity for services/projects/team, each **falling back to checked-in data** if Sanity returns nothing |
| `/demolition-services` | Service catalogue (cutting, controlled demolition, etc.) | Sanity `service`, falls back to `src/data/services.ts` |
| `/rental-equipment` | Flat grid of equipment category cards | Sanity `rentalCategory`, falls back to `src/data/rental-categories.ts`. Cards link to `/contact?inquiry=Equipment+Rental`, **not** to detail pages — there are none. |
| `/projects` | Project portfolio with category filter pills | Sanity `project` + `projectCategory` |
| `/projects/[slug]` | Individual project case study with hero gallery | Sanity `project` |
| `/blog` | Article archive — featured post, category filter pills, card grid | Sanity `post` + `postCategory`. **No fallback data** — renders an empty state when nothing is published (§6.6) |
| `/blog/[slug]` | Article with sticky contents rail, author bio, related posts | Sanity `post` (Portable Text body) |
| `/contact` | Contact form, office details | Static page; **form does not submit** (§6.1) |
| `/privacy`, `/terms` | Legal pages | Fully hardcoded |
| `/studio` | Embedded Sanity Studio — the CMS admin UI | Admin-only, `Disallow`ed in robots.txt |
| `POST /api/inquiries` | Saves enquiry to Sanity **and** emails it via Resend | Called only by the enquiry modal, which is currently unreachable |
| `POST /api/rental-inquiry` | Emails a rental enquiry via Resend | **No caller anywhere in the app** |

`/rental-equipment` and `/projects` use `export const revalidate = 60`, so Studio edits appear
within about a minute.

---

## 3. Content Management — What the Client Can Edit vs. What Needs a Developer

**You (client) can edit yourself, via Sanity Studio at diamondedgecutting.com/studio:**

| Document type | Controls |
| --- | --- |
| **Service** | Demolition service cards — title, image, description, key points, CTA text/link, display order |
| **Project** | Portfolio entries — title, category, location, year, scope, highlights, hero image, gallery. "Featured on Homepage" toggle + "Homepage Slot" control the homepage teaser independently of the `/projects` order. |
| **Project Category** | The filter pills on `/projects`, and their order |
| **Rental Equipment Category** | The cards on `/rental-equipment` — name, image, description, link, order |
| **Team Member** | Leadership section — name, role, bio, years, photo |
| **Blog Post** | Articles on `/blog` — title, category, author, excerpt, hero image, published date, rich-text body. "Featured on Blog" picks the large card at the top of the archive. The newest three also appear on the homepage. |
| **Blog Category** | The filter pills on `/blog`, their order, and each one's badge colour |
| **Blog Author** | Byline and end-of-article bio — name, role, photo, short bio, LinkedIn |

Log into Studio with the Sanity account credentials (§4.2). Publish to go live — drafts are not
shown. Changes appear within about a minute on the pages that revalidate.

**Everything else requires a developer to change code and redeploy:**

- Homepage copy, hero text, FAQ, footer, navigation menu
- Contact page details, office address, phone numbers
- Privacy policy and terms of service
- Page layouts, colours, fonts, imagery outside the CMS
- The fallback content bundled into the code (`src/data/*.ts`, `src/lib/equipment-data.ts`)

**Why this split exists:** services, projects, rental categories and team members change often and
benefit from a friendly editor. Layout and legal copy are tightly coupled to the page components,
so they stay in code where they can't be broken accidentally.

> **Display Order fields:** rental categories and project categories use a custom "Display Order"
> input that disables numbers already taken by another document. If a number looks greyed out,
> another item is using it.

---

## 4. Third-Party Services & Accounts

These are the outside services the site depends on. The client should know these exist and who
holds the login for each — if a subscription lapses or a key expires, the corresponding feature
breaks, in most cases **silently**.

| Service | Used for | Who should own the account |
| --- | --- | --- |
| Domain registrar | The name diamondedgecutting.com (site **and** email) | Client — in the company's name |
| Hostinger | Hosting for the live site | Client or agency, whoever pays hosting |
| Sanity.io | CMS for services, projects, rental categories, team; embedded Studio | Client (content owner) |
| Resend | All outbound email from the site | Client or agency — whoever monitors leads |
| Email provider | The `@diamondedgecutting.com` mailboxes | Client |
| GitHub | Source code | Client (so developers can be swapped) |
| Vercel | Staging deploys from `dev` | Developer/agency |

**Client action item:** confirm you personally have login access to the **domain registrar,
Hostinger, Sanity and Resend**. Those four hold your name, your site, your content and your leads.
GitHub and Vercel are developer plumbing, but you should still own GitHub so you are not locked to
one developer.

### 4.1 Domain registrar — diamondedgecutting.com

| Field | Value |
| --- | --- |
| Registrar | _(fill in — DNS is managed in cPanel with an A record pointing at Hostinger)_ |
| Login URL | _(fill in)_ |
| Username / email | _(fill in)_ |
| Password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| Registered in the name of | _(fill in — must be the company)_ |
| Renewal date / auto-renew | _(fill in)_ |
| Account owner | _(fill in)_ |

> Do not delete DNS records without asking a developer. The Resend DKIM record
> (`resend._domainkey`), the SPF record, and the feedback MX on the `send.` subdomain are what keep
> enquiry email out of spam folders.

### 4.2 Sanity — CMS

| Field | Value |
| --- | --- |
| Login URL | https://www.sanity.io/manage · Studio: https://diamondedgecutting.com/studio |
| Project ID | `6sbcjjxj` |
| Dataset | `production` — **private**, which is why a token is required |
| API version | `2024-01-01` |
| Studio config name | `dec-cms` ("Diamond Edge Cutting CMS") |
| Username / email | _(fill in)_ |
| Password | _(fill in)_ |
| SSO provider (Google/GitHub?) | _(fill in)_ |
| 2FA method | _(fill in)_ |
| API write token (`SANITY_API_TOKEN`) | _(fill in — password manager only)_ |
| Token created by / expiry | _(fill in)_ |
| Plan, seats, monthly cost | _(fill in)_ |
| Editors to hand over | _(fill in — one row per person + role)_ |

### 4.3 Resend — outbound email

| Field | Value |
| --- | --- |
| Login URL | https://resend.com/login |
| Username / email | _(fill in)_ |
| Password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| API key (`RESEND_API_KEY`) | _(fill in — password manager only)_ |
| Verified sending domain | `diamondedgecutting.com` (DKIM + SPF + SES feedback MX all in place) |
| From address | `Diamond Edge Website <website@diamondedgecutting.com>` |
| To address | `info@diamondedgecutting.com` |
| Plan / monthly send limit | _(fill in)_ |
| Account owner | _(fill in)_ |

### 4.4 Hostinger — production hosting

| Field | Value |
| --- | --- |
| Login URL | https://hpanel.hostinger.com |
| Username / email | _(fill in)_ |
| Password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| Plan / renewal date | _(fill in)_ |
| Node.js app name / path | _(fill in)_ |
| SSH host / port / user | _(fill in)_ |
| SSH password or key location | _(fill in)_ |
| Payment card on file | _(fill in — whose?)_ |
| Account owner | _(fill in)_ |

### 4.5 Company email

| Field | Value |
| --- | --- |
| Provider | _(fill in — Google Workspace / Zoho / Hostinger / other)_ |
| Admin console URL | _(fill in)_ |
| Admin username / password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| `info@diamondedgecutting.com` password | _(fill in)_ |
| Who monitors `info@` (+ backup) | _(fill in)_ |
| Other mailboxes | _(fill in)_ |

`website@diamondedgecutting.com` is a send-only DNS identity, not a real mailbox — there is nothing
to log into and nobody can read replies sent to it. Staff replies go to the customer via `replyTo`.

### 4.6 GitHub — source code

| Field | Value |
| --- | --- |
| Repository | https://github.com/prabha-10/DiamondEdgeCutting |
| Login URL | https://github.com/login |
| Username / email | _(fill in)_ |
| Password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| Personal access token (if any) | _(fill in)_ |
| Account owner | _(fill in)_ |

### 4.7 Vercel — staging

| Field | Value |
| --- | --- |
| Login URL | https://vercel.com/login |
| Staging URL | https://diamond-edge-cutting-g9kq.vercel.app |
| Username / email / SSO | _(fill in)_ |
| Password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| Team / scope | _(fill in)_ |
| Account owner | _(fill in)_ |

### 4.8 Analytics & Search Console — not installed

No analytics, tag manager, or search-console verification exists in the codebase. Nobody currently
knows how many people visit this site.

| Field | Value |
| --- | --- |
| Google account username / password | _(fill in)_ |
| 2FA method | _(fill in)_ |
| Google Analytics 4 | _(not installed)_ |
| Google Search Console | _(not installed)_ |
| Google Business Profile | _(fill in)_ |

### 4.9 Anything else

| Service | Login URL | Username | Password | 2FA | Owner |
| --- | --- | --- | --- | --- | --- |
| _(fill in)_ | | | | | |

---

## 5. Environment Variables Reference (Developer)

Create `.env.local` for local dev; set the same keys in **both** hosts' environment panels —
Hostinger (production) and Vercel (staging) keep separate copies, and changing one does not change
the other.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | All CMS content, Studio | `6sbcjjxj` |
| `NEXT_PUBLIC_SANITY_DATASET` | All CMS content, Studio | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | CMS client | Defaults to `2024-01-01` if unset |
| `SANITY_API_TOKEN` | Reading the **private** dataset; writing enquiries | Server-only — never prefix with `NEXT_PUBLIC_`. Without it the site silently serves bundled fallback content. |
| `RESEND_API_KEY` | Enquiry emails | Server-only. Both routes construct the Resend client lazily, so a missing key no longer fails the build — but no email is sent. |
| `NEXT_PUBLIC_SITE_URL` | OG / Twitter card URLs | **Currently unset.** Defaults to the Vercel staging URL, so live social previews point at staging. Set to `https://diamondedgecutting.com` on Hostinger and the staging URL on Vercel. |
| `INQUIRY_FROM` | Enquiry sender | Optional. Defaults to `Diamond Edge Website <website@diamondedgecutting.com>` |
| `INQUIRY_TO` | Enquiry recipient | Optional. Defaults to `info@diamondedgecutting.com` |
| `INQUIRY_CC` | Extra recipients | Optional, comma-separated. Empty by default — set to `laxmikant@diamondedgecutting.com` to add a second recipient. |
| `RENTAL_SPEC_PATH`, `SEED_YES` | Seed scripts only | See `scripts/seed-rental-equipment.mjs` |

`SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_WRITE_TOKEN` and `SANITY_TOKEN` are accepted as
fallback aliases in server code. Pick one convention and stick to it.

> ⚠ `NEXT_PUBLIC_*` variables are **baked in at build time**, not read at runtime. Changing one
> requires a fresh build, not just a restart.

---

## 6. Feature Deep-Dives

### 6.1 Lead capture — currently broken

Three separate mechanisms exist. None of them delivers a lead.

**a) The contact form does not submit.** [`src/app/contact/ContactForm.tsx:46-65`](src/app/contact/ContactForm.tsx#L46-L65)
— `onSubmit` waits one second with `setTimeout`, writes the form data to `console.log`, then shows
the "Message Sent" confirmation. There is no `fetch`, no email, no stored record. It looks like
placeholder code that was never replaced. Every enquiry submitted through `/contact` since launch
has been discarded, and the visitor was told it succeeded.

**b) The equipment enquiry basket is unreachable.** The basket (sticky bar → modal → `POST
/api/inquiries`) is complete and correct: it saves to Sanity, emails via Resend, sets `replyTo` to
the visitor, and returns HTTP 207 if the email fails so the lead survives in the CMS. But
`InquiryStickyBar` returns `null` when the basket is empty, and the only components that call
`addItem` — `InquiryButton` (used solely by `EquipmentCard`) and `AddToInquiryButton` — sit in
`src/components/rental/`, which **nothing renders**. Those components are leftovers from a rental
detail-page structure that was removed; `/rental-equipment` is now a flat grid whose cards link
straight to `/contact`. So the basket can never be populated, never appears, and the working API is
never called.

**c) `/api/rental-inquiry` has no caller.** It validates properly, honeypots bots, returns a clear
503 if `RESEND_API_KEY` is missing, and sends a nicely formatted HTML email — but no component in
the app posts to it. It also still sends from Resend's shared `onboarding@resend.dev` address
([`route.ts:48`](src/app/api/rental-inquiry/route.ts#L48)) rather than the verified company domain,
which would be spam-prone if it were ever wired up.

**Shortest route to a working site:** point `ContactForm.onSubmit` at `POST /api/inquiries` — that
route already does the right thing. Then decide whether to restore the equipment basket entry
points or delete the orphaned `src/components/rental/` set and the dead `rental-inquiry` route.

### 6.2 Sanity content and the silent fallback

Every content fetch follows the same policy: **use Sanity when it returns documents, otherwise fall
back to checked-in data files of the same shape.** See `src/lib/content.ts` and the `try/catch` in
`src/app/layout.tsx:61-71`.

This makes a half-configured environment render the same layout as production — but it also means
**a missing or expired `SANITY_API_TOKEN` produces no error at all**. The site just quietly serves
whatever was bundled at build time. There is no error page and nothing in the UI to notice.

> If **staging** shows old or generic content, the token on **Vercel** has expired.
> If the **live site** does, it is the token on **Hostinger**.
> This is the single most likely explanation for "my CMS change isn't showing."

Because the dataset is private, `useCdn` is `false` — the Sanity CDN does not honour tokens, so all
fetches hit the API endpoint directly. `revalidate = 60` keeps the load down.

### 6.3 Enquiries are invisible in Studio

`POST /api/inquiries` creates documents of type `inquiry`, but **there is no `inquiry` schema
registered** — `sanity/schemas/index.ts` exports only `projectCategory`, `project`, `teamMember`,
`service` and `rentalCategory`. Sanity accepts the documents, but Studio's structure tool has no
definition for them, so they do not appear in any list. They exist in the dataset and can be read
through the Vision plugin with `*[_type == "inquiry"]`, but no non-technical user will ever find
them. Adding a small `inquiry` schema would turn this into a usable leads inbox.

### 6.4 Dead GROQ queries

`sanity/lib/queries.ts` still contains a large block of queries against `_type == "equipment"` and
`_type == "category"` — document types from the removed rental-equipment structure. Neither type
has a schema any more, so these always return empty. Two visible consequences:

- `getAllCategories()` is called by `src/app/layout.tsx` to build the header's rental dropdown. It
  always returns `[]`, so the header **always** uses the local fallback list, regardless of Sanity.
- The equipment-title lookup in `/api/inquiries` always finds nothing, so enquiry emails would list
  raw document IDs instead of readable model names.

Neither breaks a page, but both are misleading to read. They should be deleted or reimplemented
against the current schema.

### 6.5 Enquiry basket persistence

The basket is stored in `localStorage` under `dec_inquiry_basket` with a **30-day expiry**
(`src/lib/inquiry-storage.ts`). It is per-browser, never sent anywhere until the modal is
submitted, and cleared on successful submit.

### 6.6 The blog, and why it has no fallback content

`/blog` and `/blog/[slug]` are driven entirely by three Sanity types — `post`, `postCategory` and
`author` — plus `blockContent`, the project's first Portable Text field
(`sanity/schemas/blockContent.ts`). Resolvers live in `src/lib/blog.ts`, components in
`src/components/sections/blog/`.

**Unlike every other page, the blog has no checked-in fallback data.** Services, projects and
rental categories fall back to `src/data/*.ts` because that content is real company information.
Blog fallbacks would have to be invented articles — placeholder claims about permits, method and
pricing on a licensed contractor's live site. So the resolvers return `[]`/`null` on failure and
the archive renders a designed empty state instead. The homepage `BlogTeaser` renders nothing at
all when there are no posts.

The practical consequence: **if the Sanity token expires, `/blog` goes empty rather than stale.**
That is the opposite of the rest of the site (§6.2) and is intentional — an empty archive is an
obvious failure, a stale one is not.

Other things worth knowing:

- **Drafts are excluded in GROQ.** The client authenticates with a token that can read drafts, so
  without `!(_id in path("drafts.**"))` a half-written article would appear the moment it was
  saved. The blog queries filter it; the older project queries do not.
- **Reading time is computed, not stored.** Word count ÷ 200, from the Portable Text body. Editors
  never see the field.
- **The table of contents is built from the `h2` blocks**, using each block's Sanity `_key` as the
  anchor id. Nothing to maintain — adding a Heading in Studio adds a contents entry.
- **JSON-LD uses a plain `<script>` tag**, not the `next/script` `beforeInteractive` strategy the
  other six schema components in `src/components/seo/` use. That strategy never emits a tag into
  the HTML — it pushes the payload into a JS array for the client to inject, so crawlers that do
  not run JS see no structured data. The other components should be migrated the same way.
- **Sample content** was seeded with `npm run seed:blog` and every document carries a
  `sample-blog.*` id. Remove it with `npm run seed:blog -- --delete` once real articles exist.

---

## 7. Deployment & Hosting (Developer)

Two branches, two hosts. **Nothing reaches the live site except a merge into `main`.**

| Branch | Deploys to | URL | Purpose |
| --- | --- | --- | --- |
| `dev` | Vercel | diamond-edge-cutting-g9kq.vercel.app | Staging. Review here. |
| `main` | Hostinger | diamondedgecutting.com | Live. Merge only once staging looks right. |

The domain sits in cPanel with an A record pointing at Hostinger; Vercel never touches the live
domain. `vercel.json` disables Vercel builds for `main` so merges don't trigger a pointless second
build.

**Everyday workflow:** work on `dev`, push, check staging, then `git checkout main && git merge dev
&& git push`. Bring `dev` back in line afterwards so the branches don't drift. Rollback is
`git revert` on `main` — never force-push it. Full detail in `DEPLOYMENT.md`.

**CI** (`.github/workflows/ci.yml`) runs on every push and PR to `dev`/`main`:

- **Build** — blocking. `next build` type-checks the project; red on `dev` means do not merge.
- **Lint** — advisory (`continue-on-error`). There are 7 known pre-existing eslint errors; clear
  those, then remove the `continue-on-error` line to make lint a real gate.

**Staging is not indexed:** `src/app/robots.ts` serves `Disallow: /` whenever `VERCEL=1`. Hostinger
doesn't set that variable, so the live site stays crawlable.

> ⚠ **Never run `npm audit fix --force`.** npm's "fix" for this tree is a downgrade to
> `next@9.3.3`. Security patches are pinned via `overrides` in `package.json`, each scoped to the
> vulnerable range and documented in the `"//overrides"` block.

---

## 8. Security (Developer)

- **No security headers are configured.** `next.config.ts` sets only `images.remotePatterns`
  (allowing `images.unsplash.com` and `cdn.sanity.io`). There is no HSTS, no `X-Frame-Options`, no
  `X-Content-Type-Options`, no `Referrer-Policy`, no CSP, and no `middleware.ts`. Adding a headers
  block is a quick, low-risk improvement.
- No auth system. `/studio` is protected by Sanity's own login; everything else is public.
- `SANITY_API_TOKEN` is read only in `sanity/lib/client.ts` and the inquiries route, both
  server-only. **Never import `sanityClient` into a `"use client"` component** without auditing the
  import graph — it would bundle the token into the browser payload.
- Both public forms carry honeypot fields. There is **no rate limiting** on either API route.
- `/studio` is `Disallow`ed in robots.txt, so it is not indexed.

---

## 9. Developer Setup

```bash
git clone https://github.com/prabha-10/DiamondEdgeCutting.git
cd DiamondEdgeCutting
npm install
# create .env.local — see §5
npm run dev            # http://localhost:3000, Studio at /studio
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (also the CI type-check) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (7 known pre-existing errors) |
| `npm run import:projects` | Bulk-import project documents into Sanity |
| `npm run seed:rental` | Seed rental equipment into Sanity |
| `npm run seed:blog` | Seed the sample blog content (1 author, 3 categories, 4 posts). `-- --replace` overwrites, `-- --delete` removes it all. |

**Read `AGENTS.md` first.** This Next.js version has breaking changes versus older documentation —
check `node_modules/next/dist/docs/` before writing code. `AGENTS.md` also carries the branch
policy: work on `dev`, never push to `main` without being asked.

**Key folders:**

- `src/app/` — routes and API handlers (App Router)
- `src/components/` — UI, grouped by area (`layout/`, `sections/`, `inquiry/`, `rental/`, `ui/`, `seo/`)
- `src/data/` — checked-in fallback content (services, rental categories, navigation, equipment)
- `src/lib/` — content resolvers (`content.ts`), form schemas, storage helpers, Sanity image utils
- `sanity/schemas/` — the five document types; `sanity/lib/queries.ts` — all GROQ
- `scripts/` — one-off seed and import scripts
- `src/components/rental/` — **currently orphaned**, see §6.1

---

## 10. Client Quick-Reference / FAQ

**"How do I edit a service, project, or team member?"** Log into diamondedgecutting.com/studio,
open the document type, edit, Publish. Live within about a minute.

**"How do I reorder the cards on a page?"** Use the Display Order field. Lower numbers come first;
numbers already used by another item appear disabled.

**"How do I feature a project on the homepage?"** In the Project document, switch on "Featured on
Homepage" and set a "Homepage Slot". That slot controls homepage position only — the `/projects`
listing keeps its own Display Order.

**"I published a change and the website still shows the old version."** Wait a minute and refresh.
If it persists, the CMS connection has expired — the site falls back to bundled content rather than
showing an error. Tell your developer: *"the Sanity token on Hostinger has expired."*

**"Someone said they filled in the contact form and we never heard from them."** Correct — the
contact form currently sends nothing (§6.1). Until it is fixed, treat the phone number and
`info@` address as the only working enquiry routes.

**"I want to change the homepage headline / contact details / add a page."** That needs a
developer — this content lives in code, not the CMS, by design (§3).

**"Who do I contact for what?"**

- Content changes (services, projects, rental cards, team) → you, via Sanity Studio
- Website offline → Hostinger account, check billing first
- Website *and* email both dead → the domain has expired, go to the registrar immediately
- Leads not arriving → see §6.1; this is a development fix, not an account problem
- Anything else (design, new pages, bugs) → developer

---

## 11. Appendix — Accounts Checklist

Confirm access to each before considering handoff complete:

- [ ] Domain registrar login — **and the domain is in the company's name**
- [ ] Hostinger hPanel login
- [ ] Sanity project (Studio login + `sanity.io/manage` admin)
- [ ] Sanity `SANITY_API_TOKEN` — recorded, and its expiry known
- [ ] Resend account + API key
- [ ] Email admin console + the `info@` mailbox
- [ ] GitHub repo access (github.com/prabha-10/DiamondEdgeCutting)
- [ ] Vercel account (staging)
- [ ] Every account's recovery address is a company address, not a personal one
- [ ] Payment cards on every account belong to the company
- [ ] Auto-renew on for the domain and hosting
- [ ] A second person has admin access to Sanity and to email
- [ ] All tokens and passwords rotated after handover
- [ ] Previous developer's access revoked
- [ ] **Lead capture fixed and a test enquiry confirmed received end-to-end**

---

## 12. Outstanding Work

Roughly in priority order.

| # | Item | Impact |
| --- | --- | --- |
| 1 | Contact form sends nothing — wire to `/api/inquiries` | **Critical.** All enquiries lost. |
| 2 | Equipment basket has no entry points; `src/components/rental/` orphaned | **Critical.** Restore or remove. |
| 3 | No `inquiry` schema — leads invisible in Studio (§6.3) | High. Leads unusable by staff. |
| 4 | `/api/rental-inquiry` dead, and sends from `onboarding@resend.dev` | Medium. Wire up or delete. |
| 5 | `NEXT_PUBLIC_SITE_URL` unset — OG images point at staging | Medium. One env var. |
| 6 | No security headers in `next.config.ts` (§8) | Medium. |
| 7 | `next-sitemap` installed but no config and no postbuild script — no sitemap generated | Medium (SEO). |
| 8 | No analytics, no Search Console (§4.8) | Medium. |
| 9 | Dead `equipment`/`category` GROQ queries (§6.4) | Low. Misleading. |
| 10 | 7 eslint errors keeping lint advisory rather than blocking | Low. |
| 11 | `package.json` name is still `temp-app`; `README.md` is create-next-app boilerplate | Cosmetic. |

---

## 13. Key Contacts

| Role | Name | Email | Phone |
| --- | --- | --- | --- |
| Business owner | _(fill in)_ | | |
| Monitors website enquiries | _(fill in)_ | info@diamondedgecutting.com | |
| Backup for enquiries | _(fill in)_ | | |
| Previous developer | _(fill in)_ | | |
| Current developer / support | _(fill in)_ | | |
| Hosting support | Hostinger | hPanel live chat | |
