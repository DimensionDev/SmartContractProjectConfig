# Mask Smart Contract Configurations

This repository contains some common configurations for smart contract projects.

After integrated this submodule into your project, please check the following steps in advance to ensure it works well:

- Update the submodule. Make sure the network info is up-to-date.
- Create an `.env` file in the submodule root dir.
- Set up the your `wallet private key`, [`alchemy key`](https://www.alchemy.com/) and [`etherscan api key`](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics) in `.env` file. [`.env.example`](/.env.example) is an example which contains dummy configuration.

## NOTICE

Please handle your secrets carefully. In this project, `.env` has already been added into `.gitignore`.
