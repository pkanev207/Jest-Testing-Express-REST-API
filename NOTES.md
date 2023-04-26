# Notes

## Typescript

npx tsc --init

npm i ts-node-dev typescript -D

npm i express

npm i @types/express @types/node -D

npm i typescript jest ts-jest @types/jest ts-node

## Jest

npm i supertest jest -D

npm i ts-jest @types/jest @types/supertest -D

npx ts-jest config:init

./node_modules/.bin/jest --clearCache

## Crucial

npm run test -- --silent=false

package.json => "start": "node dist/index.js",

package.json => "jest": {
"preset": "ts-jest",
"testEnvironment": "node",
"verbose": true
},

terminal => curl "http://localhost:8000/"

"test:watch": "jest --watch"

"test": "jest --coverage",

## Fix imports

node --experimental-vm-modules node_modules/jest/bin/jest.js

If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`).

## AAA principles -

    -arrange
    -act
    -assert

## FIRST principles

## Snapshot testing

    - test large objects
    - test UI components (React)
    - test generate logic (JSON)
