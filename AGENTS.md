<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Branches: work on `dev`, never touch `main`

`main` is the live site. Hostinger auto-deploys every push to `main` straight to
diamondedgecutting.com — there is no staging step in between, and no approval prompt. A
push to `main` is a publish.

**Do all work on `dev`.** Commit and push there. Vercel auto-deploys `dev` to the staging
URL, which is where changes get reviewed.

**Never push, merge, rebase, cherry-pick, or force-push into `main`** unless the user asks
for it in that same message. Being told to merge once does not authorise the next merge —
the user ships to production on their own schedule, so ask every time. If the current
branch is `main`, switch to `dev` before making any changes.

See `DEPLOYMENT.md` for the full pipeline, environment variables, and rollback.
