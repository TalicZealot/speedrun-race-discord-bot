# Speedrun Race Bot for Discord
A Discord bot for coordinating speedrun races.

## Version 2.0.0

## Requirements
* Node.js 16.6.0 +

## Setup:
* npm install
* create a .env file for a discord authentication token
* create a new Discord application and bot
* configure from config.json and eloConfig.json, launch and use the roles debug command to get role ids
* add countdown audio files to ./audio/
* ELO uses a json storage file. Good enough for small servers, but I would replace it with MongoDB or another db server for a large population. Data handling is abstracted in ../data/data.js for easy swapping.