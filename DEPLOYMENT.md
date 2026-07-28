# Deployment

Two branches, two hosts. Nothing deploys to the live site except a merge into `main`.

| Branch | Deploys to | URL | Purpose |
| --- | --- | --- | --- |
| `dev` | Vercel | https://diamond-edge-cutting-g9kq.vercel.app | Staging. Review changes here. |
| `main` | Hostinger | https://diamondedgecutting.com | Live. Only merge into it once staging looks right. |

The domain sits in cPanel with an A record pointing at Hostinger. Vercel never touches
the live domain.

## The everyday workflow

```bash
git checkout dev
git pull

# ...make changes...

git add -A
git commit -m "describe the change"
git push
```

Vercel rebuilds staging within a minute or two. Check
https://diamond-edge-cutting-g9kq.vercel.app.

When staging looks right, ship it:

```bash
git checkout main
git pull
git merge dev
git push
```

Hostinger picks up the push to `main` and rebuilds the live site.

Then bring `dev` back in line so the two branches do not drift:

```bash
git checkout dev
git merge main
git push
```

> If you would rather review changes as a pull request (and have GitHub show you the CI
> result before you merge), open a PR from `dev` into `main` on GitHub instead of merging
> locally. Same outcome, with a checklist.

## What runs automatically

**GitHub Actions** (`.github/workflows/ci.yml`) runs on every push to `dev` or `main` and
on every PR into them. Two jobs:

- **Build** — blocking. `next build` type-checks the whole project, so a green Build means
  the branch compiles. A red Build on `dev` means: do not merge to `main`.
- **Lint (advisory)** — non-blocking, via `continue-on-error`. The project has 7
  pre-existing eslint errors (2 × `no-explicit-any`, 2 × `react/no-unescaped-entities`,
  2 × setState-inside-effect, 1 × `no-explicit-any` in `ProductSchema.tsx`). Making lint
  required today would leave every branch permanently red. Clear those 7, then delete the
  `continue-on-error: true` line so lint becomes a real gate.

CI builds without Sanity credentials by default, which is enough to catch compile and type
errors. To have it build against the real CMS, add these under **Settings → Secrets and
variables → Actions**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN`

**Vercel** builds `dev` and publishes it to the staging URL above. This relies on `dev`
being set as Vercel's *production* branch — if it is only a preview branch, the URL sits
behind a Vercel login and you cannot share it. That setting is not on the Git settings page
where you would expect it:

> Vercel → project → **Settings → Environments → Production → Branch Tracking** →
> set the branch to `dev` → **Save**

`vercel.json` switches
off Vercel builds for `main` (`git.deploymentEnabled`), because `main` belongs to
Hostinger — without it every merge would trigger a pointless second build. Delete that
entry if you ever want a Vercel copy of `main` again.

**Hostinger** builds `main` and serves diamondedgecutting.com.

## Staging is not indexed by Google

`src/app/robots.ts` serves `Disallow: /` whenever `VERCEL=1`, so the staging copy cannot be
indexed as a duplicate of the live site. Hostinger does not set that variable, so the live
site is unaffected and stays crawlable.

## Environment variables

Each host keeps its own copy — changing one does not change the other. Set all four on both
Vercel and Hostinger:

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `6sbcjjxj` |
| `NEXT_PUBLIC_SANITY_DATASET` | |
| `NEXT_PUBLIC_SANITY_API_VERSION` | |
| `SANITY_API_TOKEN` | Server-only. Never prefix with `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Server-only. Enquiry emails stop without it. |
| `NEXT_PUBLIC_SITE_URL` | Set to `https://diamondedgecutting.com` on Hostinger, and to the staging URL on Vercel, so OG/meta tags resolve to the right host. |

If staging shows old or generic content, the Sanity token on **Vercel** has expired. If the
live site does, it is the token on **Hostinger**. The site falls back to bundled content
rather than erroring, so this fails quietly — see `HANDOFF.md` §6.

`RESEND_API_KEY` used to be required at *build* time — `app/api/rental-inquiry/route.ts`
constructed the Resend client at module load, so a host without the key failed the entire
build, not just that one route. It is now constructed only when the key is present, and the
route returns a 503 telling the visitor to email `info@` directly if it is missing. The
build no longer depends on it, but the rental enquiry form still does — keep it set on
Hostinger.

## If something goes wrong on the live site

`main` is a plain branch, so rolling back is a revert:

```bash
git checkout main
git revert <bad-commit-sha>
git push
```

Hostinger rebuilds from the reverted state. Do not force-push `main`.
