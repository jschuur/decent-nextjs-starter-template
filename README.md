### Decent Next.js Starter Template

Quickly start a new Next.js project with defaults for UI components, layout, database setup and more.

By [Joost Schuur](https://joostschuur.com) ([Twitter](https://twitter.com/joostschuur), [Threads](https://threads.net/@joostschuur)).

(Very) early work in progress. [More](https://github.com/jschuur/decent-nextjs-starter-template/issues?q=is%3Aissue+is%3Aopen+label%3Afeature%2Cdocs) to come.

## Usage

Not much here yet, but if you're taking an early look, start by cloning the repository:

```
git clone https://github.com/jschuur/decent-nextjs-starter-template
```

1. Install dependencies: `pnpm install`.
2. Rename `decent-nextjs-starter-template` in `package.json` to your project name.
3. Optionally [set up Turso](https://docs.turso.tech/quickstart). Local development will work fine without it.
4. Copy `.env.example` to `.env` and fill in the values as desired.
5. Run `pnpm dev` to start the development server. Visit http://localhost:3000.
6. With the dev server running, run `pnpm run db:migrate` to set up the database. The dev script also runs the local Turso database instance. You can also run `pnpm run dev:db:turso` to run that separately.
7. Populate the sample data with `pnpm run db:seed`. Refresh the local page to see the stack list loaded from the database.
8. For SST based [live development](https://ion.sst.dev/docs/live/), set up your AWS credentials manually in `~/aws/credentials` or [via their CLI](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-configure.html). If you don't want to use SST just yet, you can run local dev via `pnpm run dev-nosst`.
9. For Auth.js, set up credentials for the [Google Provider](https://next-auth.js.org/providers/google) for `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` (or update `auth.ts` to use a different one). Don't forget the random `AUTH_SECRET` string.
10. Test auth via the login button in the header. If you see an error, you might not have set the correct URLs for your Google OAuth credentials for 'Authorized JavaScript origins' (http://localhost:3000) and 'Authorized redirect URIs' (http://localhost:3000/api/auth/callback/google).
11. To deploy, run `pnpm run deploy` (for a staging build) or `pnpm run deploy:prod`. This deploys to AWS via SST. Cloudflare deploys are also supported by SST Ion. Or use the Vercel CLI to [deploy to Vercel](https://vercel.com/docs/cli/deploy). Create preview and production env files under `.env.preview` and `.env.production` respectively. Set a `SITE_DOMAIN` to define the [hostname](https://ion.sst.dev/docs/custom-domains/) for the site.

Substitute `pnpm` for your package manager of choice (npm, bun, yarn etc).

## Stack

- [Next.js](https://nextjs.org/) React framework, configured for Tailwind, TypeScript, ESlint and app router ([docs](https://nextjs.org/docs)).
- [shadcn/ui](https://ui.shadcn.com/) Accessible, customisable UI components based on Radix. Default style. Slate base colour with CSS variables for colour, by [shadcn](https://github.com/shadcn) ([docs](https://ui.shadcn.com/docs)).
  - Pre-installed components: [Alert](https://ui.shadcn.com/docs/components/alert), [Avatar](https://ui.shadcn.com/docs/components/avatar), [Badge](https://ui.shadcn.com/docs/components/badge), [Button](https://ui.shadcn.com/docs/components/button), [Card](https://ui.shadcn.com/docs/components/card), [Checkbox](https://ui.shadcn.com/docs/components/checkbox), [Command](https://ui.shadcn.com/docs/components/command), [Dialog](https://ui.shadcn.com/docs/components/dialog), [Form](https://ui.shadcn.com/docs/components/form), [Input](https://ui.shadcn.com/docs/components/input), [Label](https://ui.shadcn.com/docs/components/label), [Popover](https://ui.shadcn.com/docs/components/popover), [Radio Group](https://ui.shadcn.com/docs/components/radio-group), [Select](https://ui.shadcn.com/docs/components/select), [Sonner](https://ui.shadcn.com/docs/components/sonner), [Switch](https://ui.shadcn.com/docs/components/switch), [Tabs](https://ui.shadcn.com/docs/components/tabs), [Textarea](https://ui.shadcn.com/docs/components/textarea), [Tooltip](https://ui.shadcn.com/docs/components/tooltip)
  - VS Code extensions: [shadcn/ui](https://marketplace.visualstudio.com/items?itemName=SuhelMakkad.shadcn-ui) (by [Suhel Makkad](https://github.com/SuhelMakkad)), [shadcn/ui snippets](https://marketplace.visualstudio.com/items?itemName=VeroXyle.shadcn-ui-snippets) (by [Neeraj Dalal](https://github.com/nrjdalal)).
  - More at [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui).
- [React Hook Form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation ([docs](https://react-hook-form.com/get-started)).
- [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference.
- [Drizzle](https://orm.drizzle.team/): Database ORM with TypeScript support ([docs](https://orm.drizzle.team/docs/overview)).
  - Configured for [Turso](https://turso.tech) for local and production SQLite databases ([docs](https://docs.turso.tech/introduction)).
  - Extensions: [Drizzle ORM snippets (VS Code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-drizzle-snippets) by [Manuel Gil](https://github.com/ManuelGil), [Drizzle Studio Chrome](https://chromewebstore.google.com/detail/drizzle-studio/mjkojjodijpaneehkgmeckeljgkimnmd?hl=en).
- [SST (Ion)](https://ion.sst.dev/): Deployment framework for AWS/Cloudflare with OpenNext support ([docs](https://ion.sst.dev/docs/start/aws/nextjs)).
- [T3 Env](https://env.t3.gg/): Type-safe environment variables ([docs](https://env.t3.gg/docs/introduction)).
- [Auth.js](https://authjs.dev/) Authentication library ([docs](https://authjs.dev/getting-started/installation?framework=next.js)).
  - via [Drizzle adapter](https://authjs.dev/getting-started/adapters/drizzle)
- [Google Analytics](https://analytics.google.com/): Via @next/third-parties ([docs](https://nextjs.org/docs/messages/next-script-for-ga)).
- [TanStack Query]() Data fetching library ([docs](https://tanstack.com/query/latest/docs/framework/react/overview)).
  - configured for build time [pre-fetching and rehydrating](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data)
