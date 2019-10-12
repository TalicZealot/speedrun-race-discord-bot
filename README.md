# Speedrun Race Bot for Discord
A Discord bot for coordinating speedrun races.
#### features
* categories
* automatic text and audio countdown
* race timing
* timing offset
* elo ranking
* category leaderboards
* buttons and commands for ease of use

## Version 1.3.3

## Commands: 
   ```css
 .prefixes :        both . and ! are acceptable prefixes
 .toggle /pager:    Grants or removes the RacePager role.
 .seed:             Generates a random seed link for the randomizer.
 .leaderboard:      Shows the current rankings for a category ".leaderboard gsb"
 .rank:             Shows the player's rank for a category ".rank maria"
 .stream:           Sets the Twitch username for the player and saves it. ".stream Alucard"
 .new / .startrace  Starts a new race. Optional category and offset ".new rab xb"
 .close /end/exit    Ends the current race with no result.
 .category          Changes the category for the current race.
 .join:             Joins the current race or starts a new one ".join aab psx"
 .leave:            Leaves the current race.
 .ready:            Sets player status to ready to start.
 .unready:          Sets player status to not ready to start.
 .done / .time:     Finishes the race for the player.
 .forfeit:          Forfeits the race for the player.
 .reset:            Resets the race status and joined players.
 .rematch:          Starts new race with the same players.
 .offset:           Sets the starting time offset ".offset 4/.offset psx/.offset xb"
 ```

## Reactions: 
➕:   Join
✅:   Ready
🏁:   Done
❌ :   Forfeit
↩:   Rematch

## Category aliases: 
gsb, rando, randomizer, any%, alucard, aab, glitchless, ps4, requiem, abrsr, richter, rich, rab, maria, mab

## Requirements
* Node.js 12.10.0 +
* FFmpeg

## Setup:
* npm install
* create a .env file for a discord authentication token
* create a new Discord application and bot
* configure from config.json and eloConfig.json
* add countdown audio file to root folder or remove audio playback from startRace.js
* ELO uses a json storage file. Good enough for small servers, but I would replace it with MongoDB or another db server for a large population. Data handling is abstracted in ../data/data.js for easy swapping.

## TODO
* Spam prevention

### changelog
#### 1.3.3
* Added a command to toggle a race pager role for dedicated race pinging.
* Refactoring.
#### 1.3.2
* Added an automatic kadgar link. Unfortunately Discord does not allow bots to see people's linked social media accounts, even though they put them there publically, so if a user's Twitch has a different username it has to be set with the ".stream" command.
#### 1.3.1
* Fixed scores being calculated before final player array sort.
* Added rank command to check player standings without showing the whole leaderboard.
* Refactoring.
#### 1.3.0
* Added ELO ranking system.
#### 1.2.2
* Regex for command matching.
* Extended command functionality.
* Numerous small fixes.
#### 1.2.1
* Added emoji reaction-based buttons as an alternate method of triggering the commands
#### 1.2.0
* Changed output from individual messages to a continuously updated status message
#### 1.1.0
* Added rematch command
* Added audio countdown
* More output adjustments
#### 1.0.5
* More output adjustments
* Kinda forgot that let exists
#### 1.0.4
* Output adjustments
#### 1.0.3
* Added default offset
* Added automatic race timeout and reset
#### 1.0.2
* Added leave command
#### 1.0.1
* Commands need to be in required channel
#### 1.0.0
* Release