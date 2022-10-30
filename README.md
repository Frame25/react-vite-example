# React Vite App Example (Oct, 2022)

It is just an example of my code style. App with basic auth functionality. Of course it tries to make requests to backend, and they going to fail, unless you add a live REST API url to `.env`. For minimum example, backend should have a route:

POST `user/partialLogin` `{email: string; password: string;}`
and return

```json
{
  result: {
    data: {
      id: number;
      name: string;
      email: string;
      role_id: Role;
      is_new_customer: boolean;
      two_factor_paired: boolean;
    },
    token: string;
  },
  error: null
}
```

If `two_factor_paired` is `true` - you'll have plain login and redirect to `/`, if `false` - redirect to screen with pairing Google Authenticator.

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
