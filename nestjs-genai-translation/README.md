<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This repo uses Azure OpenAI/Langchain + Gemini API to translate text from one language to another language

## Installation

```bash
$ npm install
```

## Sign up Azure OpenAI

- Create a new account in azure.portal.com
- Search Translator, and create a new Translator
- Click "Keys and Endpoint", and then copy API Keys, Text Translation URL, and Location/Region

## Create a new Gemini API Key

- Navigate to https://aistudio.google.com/app/apikey
- Click Create API key button to generate API key

## Access Google Cloud Translation API in your local environment

- Google translate NPM: https://www.npmjs.com/package/@google-cloud/translate
- Set up ADC - https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev

## Environment variables

- Copy `.env.example` to `.env` and update the environment variables

```bash
$ cp .env.example .env
```

```
PORT=3000
AZURE_OPENAI_TRANSLATOR_API_KEY=<translator api key>
AZURE_OPENAI_TRANSLATOR_URL=<translator url>/translate
AZURE_OPENAI_TRANSLATOR_API_VERSION="3.0"
AZURE_OPENAI_LOCATION=eastasia
GOOGLE_GEMINI_API_KEY=<google gemini api key>
GOOGLE_GEMINI_MODEL=gemini-pro
AI_SERVICE=langchain_googleChatModel
GOOGLE_PROJECT_ID=<google project id>
```

## Configure the AI service

The application supports azureOpenAI, langchain_googleChatModel, google_translate to translate text. To choose the AI service, you have to update AI_SERVICE in .env. Valid values lf AI_SERVICE are azureOpenAI and langchain_googleChatModel.

Definition:

- azureOpenAI - Azure OpenAI Translator
- langchain_googleChatModel - Langchain JS, Google Chat Model and Gemini API
- google_translate - Google translate Cloud API in the local environment

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

Type http://localhost:3000/api to show the Swagger documentation and test out `POST /translator` endpoint

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
