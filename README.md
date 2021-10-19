# Venture Capitol
Optimizing the founding process for startups in Germany 🚀

---

This application uses the monorepo technology lerna.

## Prerequisites

### Tools and applications

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js 12](https://nodejs.org/en/download/)

## Installation

```shell script
npm install
```

```shell script
npm run build
```

## Test

To unit test all packages run

```shell script
npm test
```

### Frontend Testing

To test frontend packages run

```shell script
npm run test:frontend
```

### Backend Testing

To test backend packages run

```shell script
npm run test:backend
```

### Visual Testing for UI review (Storybook)

```shell script
npm run chromatic
```

## Build

To build all packages run

```shell script
npm run build
```

### Frontend Build

To build frontend packages run

```shell script
npm run build:frontend
```

### Backend Build

To build backend packages run

```shell script
npm run build:backend
```

## Release

On which branches do we build? Conventions? Tags etc?