<h1 align="center"><a href="https://venture-capitol.de/" target="_blank" noopener>Venture Capitol</a></h1>

Optimizing the founding process for startups in Germany

## Installing & Running

### Prerequisites:

- Node v16 or later (check version using `node -v`)
- Docker v20 or later & Docker Compose (check using `docker -v`)

### Installation:

1. Install initial dependencies using `npm i`
2. Install nested dependencies and link apps and packages together using `npm run bootstrap`
3. To get firebase in the backend working, you'll need a firebase service account key. You can either get it yourself following [this](https://firebase.google.com/docs/admin/setup) guide if you have access to the firebase project, or ask in slack for it
4. Put the firebase.json file in the `apps/backend` folder

### Running:

You can start the frontend and backend individually using `npm run start:fe` and `npm run start:be` or at the same time using `npm start`

### Enhancing:

There are some Visual Studio Code Extensions that are not needed but are pretty useful for working with this project:

- [SASS](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

## Folder Structure

```
.
├─ apps             # Everything that is a standalone application
│  ├─ frontend      # Main frontend for Venture Capitol
│  └─ backend       # Main Backend for Venture Capitol
├─ packages         # Shared Code and libraries
│  └─ common        # Shared GraphQl API definition
├─ Dockerfile.*     # Dockerfiles used for deployment
└─ README.md        # This file :)
```

## Using Lerna

Installing a dependency has to be done through lerna using `npx lerna add <package> --scope @vc/<app>`

## Reserved Ports

Ports reserved for each service, all interchangeable by setting the `PORT` environment variable.

service      | port
--|--
frontend     | 8100
backend      | 8101
utr-frontend | 8102
utr-backend  | 8103
storybook    | 8104
database     | 5432
utr-database | 5433
