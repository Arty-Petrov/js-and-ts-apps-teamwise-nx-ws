# js-and-ts-apps-teamwise-nx-ws

## Description
This is testing work for potential employer.
This service consists from two apps:
- "Users" which can create, update and read records with filter by user is and pagination.
- "History" which stores Users operation log. Create history log action is bound to Users create and update actions by RPC call.

Both services have separate databases instances. 
>Users and has **TS codebase**, History written on **Vanilla JS** — this is main challenge of this task. 
> 
Because of class-validator library works with TS only, data validation has been performed with nestjs-zod library, also contracts and dto. 

!!! Special thank for author of the task !!!

## Requirements
- Node >= 18.18.2
- npm >= 9.8.1
- Docker.app

## Resources
- folder /queries contains http queries for both services  

## Installation

```bash
$ cd <package directory>
$ npm install

$ npm run services:docker-up

$ npm run services:db-generate
$ npm run services:db-migrate

$ nx run users-prisma-schema:db-fill
$ nx run history-prisma-schema:db-fill
```

## Running the app

```bash
# development
$ npm run services:serve
```

## Lint

```bash
$ npm run services:lint
```
