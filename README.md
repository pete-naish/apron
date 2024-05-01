This is a [Next.js](https://nextjs.org/) project by Pete Naish for Apron.

I used Next JS so that the mocked backend can be colocated with front end code, without the need for a database. However, this may cause some weirdness and it may be necessary to restart the dev server sometimes.

## Getting Started

First install dependencies, then run the development server:

```bash
nvm use 20.12.2
npm install
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Linting

```bash
npm run lint
```

### Testing

Before running tests, please close the project in any browser windows, restart the dev server using `npm run dev`, and in another terminal window run `npm run test`.
