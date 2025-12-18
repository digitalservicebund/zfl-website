# Zentrum für Legistik — Website

This is an exemplary implementation for Zentrum für Legistik, based on Astro and KERN UX.

## Development Setup

To set up the project for development, follow these steps:

### Prerequisites

#### Node.js

We aim to use the current active [LTS version of nodejs](https://nodejs.dev/en/about/releases/).
There is a `.node-version` file to simplify setup using [nodenv](https://github.com/nodenv/nodenv).

#### Dependencies

Install the dependencies using pnpm:

```sh
pnpm install
```

#### Git Hooks

For the provided Git hooks, you will need to install [lefthook](https://github.com/evilmartians/lefthook/blob/master/docs/full_guide.md), [talisman](https://github.com/talisman-code/talisman), and [gitleaks](https://github.com/gitleaks/gitleaks):

```bash
brew install lefthook talisman gitleaks
lefthook install
```

The following hooks are specified in the `lefthook.yml` and run before committing or pushing:

- `commitlint`: Ensures [conventional commit messages](https://www.conventionalcommits.org/)
- `lint`: Checks code for stylistic and programmatic errors using ESLint.
- `typecheck`: Verifies TypeScript types to catch errors early.
- `format`: Ensures code adheres to predefined formatting rules.
- `talisman`: Detects and prevents accidental commits of sensitive information.
- `gitleaks`: Scans for secrets and credentials in the codebase.

Before pushing, the following checks are additionally run:

- `licenses-audit`: Uses `license-checker-rseidelsohn` to verify dependency licenses.

### VS Code Setup

For the best development experience, it is recommended to use VS Code. The project includes `.vscode` settings to:

- Recommend the ESLint extension (`dbaeumer.vscode-eslint`).
- Configure VS Code to use the workspace's TypeScript version.
- Enable ESLint validation for `.astro`, `.js`, and `.ts` files.

If you don't have the ESLint extension installed, VS Code should prompt you to install it when you open the project.

## Running the project

Run the project locally using:

```shell
pnpm dev
```

## Available Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `pnpm install`         | Installs dependencies                             |
| `pnpm dev`             | Starts local dev server at `localhost:4321`       |
| `pnpm build`           | Builds your production site to `./dist/`          |
| `pnpm preview`         | Previews your build locally, before deploying     |
| `pnpm lint`            | Runs ESLint to check for code quality and errors  |
| `pnpm typecheck`       | Runs TypeScript to check for type errors          |
| `pnpm format:check`    | Checks if files are formatted correctly           |
| `pnpm format:fix`      | Automatically formats files using Prettier        |
| `pnpm audit:licences`  | Audits dependency licenses                        |
| `pnpm astro ...`       | Runs CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Gets help using the Astro CLI                     |

## Testing

Not yet implemented.
