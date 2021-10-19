<h1 align="center"><a href="https://venture-capitol.de/" target="_blank" noopener>Venture Capitol</a></h1>

Optimizing the founding process for startups in Germany

## Installing & Running

### Prerequisites:

- Node v16 or later (check version using `node -v`)
- Docker v20 or later & Docker Compose (check using `docker -v`)

### Installation:

1. Install initial dependencies using `npm i`
2. Install nested dependencies and link apps and packages together using `npm run bootstrap`

### Running:

You can start the frontend and backend individually using `npm run start:fe` and `npm run start:be` or at the same time using `npm start`

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

## ToDo:

```
  [ ] graphql codegen
    [x] Backend Codegen
    [ ] Frontend Codegen
  [ ] storybook
  [ ] Docker-compose database Database
  [ ] Sentry
  [ ] Hotjar
  [ ] Deployment
    [ ] Dockerize Backend
    [ ] Dockerize Frontend / Generate Static Site
```
