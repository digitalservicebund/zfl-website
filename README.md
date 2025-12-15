# Zentrum für Legistik — Website

This is an exemplary implementation for Zentrum für Legistik, based on Astro and KERN UX.

## Prerequisites

### Node.js

We aim to use the current active [LTS version of nodejs](https://nodejs.dev/en/about/releases/).
There is a `.node-version` file to simplify setup using [nodenv](https://github.com/nodenv/nodenv).

### Dependencies

Install the dependencies using pnpm.

```sh
pnpm install
```

### Git Hooks

For the provided Git hooks you will need to install [lefthook](https://github.com/evilmartians/lefthook/blob/master/docs/full_guide.md)
(git hook manager):

```bash
brew install lefthook talisman gitleaks
./run.sh init
```

The following hooks are specified in the `lefthook.yml`:

- `commitlint` - write [conventional commit messages](https://chris.beams.io/posts/git-commit/)
- `lint` - avoid committing code violating linting rules
- `format` - avoid committing wrongly formatted code

Before pushing, the following checks are additionally run:

- `licenses-audit` - uses `license-checker-rseidelsohn` to verify dependency licenses

## Running

Run the project using

```shell
pnpm dev
```

## Testing

Not yet implemented.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Contributing

TODO

## Contributing code

TODO
