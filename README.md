# B2B Off-ramp App

## Stack

- Vite
- React + Typescript
- React-router
- MobX
- Formik
- Vitest + Jest + Testing library

## Package manager

We recommend to use [PNPM](https://pnpm.io/) instead of NPM or Yarn.
It is easy to install via `npm install -g pnpm`.

## Build & Run (Developer guide)

- `pnpm install`
- `pnpm run start` / `pnpm run build`

## Production deploy (DevOps guide)

### Prepare on machine

- Install latest [NodeJS](https://nodejs.org/en/)
- Install PNPM `npm install -g pnpm`

### Regular deploy

- `pnpm install`
- `pnpm run build`
- Done: you have `/dist` folder with `/dist/index.html`, it should be served as `/`
  and Nginx / Apache / Framework should redirect all routes to `/`, because frontend uses
  SPA with ReactRouter.

## Testing

We use Vitest with TestingLibrary and Jest.

`pnpm run test`
