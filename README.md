### Decent Next.js Starter Template

Quickly start a new Next.js project with defaults for UI components, layout, database setup and more.

By [Joost Schuur](https://joostschuur.com) ([Twitter](https://twitter.com/joostschuur), [Threads](https://threads.net/@joostschuur)).

## Usage

```
git clone https://github.com/jschuur/decent-nextjs-starter-template
```

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
