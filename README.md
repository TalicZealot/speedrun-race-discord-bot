# Speedrun Race Bot for Discord
A simple bot that helps discord users coordinate speedrun races.
## Version 1.0.3

## Commands: 
* .seed / !seed
    * Generates a random seed link for the randomizer.
* .join / !join 
    * Joins the current race.
* .leave / !leave 
    * Leaves the current race.
* .ready / !ready
    * Sets player status to ready to start.
* .unready / !unready
    * Sets player status to not ready to start.
* .done / !done / .time / !time
    * Finishes the race for the player.
* .forfeit / !forfeit
    * Forfeits the race for the player.
* .reset / !reset
    * Resets the race status and joined players.
* .offset / !offset
    * Sets the starting time offset.

## Requirements
* Node.js 12.10.0 +

## Setup:
* npm install
* create a .env file for a discord authentication token
* create a new Discord application and bot
* configure from config.json

### changelog
#### 1.0.3
* Added default offset
* Added automatic race timeout and reset
#### 1.0.2
* Added leave command
#### 1.0.1
* Commands need to be in required channel
#### 1.0.0
* Release