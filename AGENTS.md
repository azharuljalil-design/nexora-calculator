# NexoraCalculator development workflow

These instructions apply to the entire repository.

## Branches and review

- Create a separate feature branch for every development task, using a descriptive name such as `feat/<task>`, `fix/<task>`, or `docs/<task>`.
- Never commit or push directly to `main`. Push changes only to the task's feature branch.
- Use the existing isolated checkout; do not create a Git worktree unless the user explicitly requests one.
- When development is complete, create a pull request targeting `main` for the user's review.
- Never merge pull requests or enable automatic merging. The user makes the final merge decision.

## Required validation

Install dependencies with `npm ci`. Before completing a task, run all of these checks from the repository root:

```sh
npm run build
npx tsc --noEmit
npm run lint
npm test
```

Stop any development server before building because development and production share `.next` output. Rebuild production output before using `npm run start` after a development session.

Investigate failed checks and fix the problems before requesting a merge. Do not bypass checks, disable assertions, or claim unrun checks passed. If a failure cannot be resolved within the authorized scope, document the failure and blocker in the pull request and task report, and leave the task explicitly blocked rather than requesting a merge.

Review `git status` before committing. Do not commit dependencies, generated test output (including `.tmp-test`), build output, or TypeScript build caches.

## Pull request contents

Include all of the following in every pull request:

- A summary of the changes and their purpose.
- Test results for each required check, including failures or checks that could not run.
- A list of affected files and what changed in them.
- Any remaining issues, limitations, or blockers; state explicitly when there are none.

## Production and deployment

- Never deploy directly to Hostinger.
- Merging into `main` triggers the existing Hostinger production deployment. Leave the merge decision and action to the user.
- Do not modify production credentials, environment variables, or deployment configuration without the user's explicit approval.
- Never include credentials or secret values in commits, pull requests, logs, or task reports.
