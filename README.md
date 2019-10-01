# Speedrun Race Bot for Discord
A simple bot that helps discord users coordinate speedrun races.
## Version 1.2.1

## Commands: 
   ```css
 .prefixes :       both . and ! are acceptable prefixes
 .startrace /.new: Initiates a new race without joining.
 .seed:            Generates a random seed link for the randomizer.
 .join /.enter:    Joins the current race or starts a new one.
 .leave:           Leaves the current race.
 .ready:           Sets player status to ready to start.
 .unready:         Sets player status to not ready to start.
 .done /.time:     Finishes the race for the player.
 .forfeit:         Forfeits the race for the player.
 .reset:           Resets the race status and joined players.
 .rematch:         Starts new race with the same players.
 .offset:          Sets the starting time offset.
 ```

## Requirements
* Node.js 12.10.0 +
* FFmpeg

## Setup:
* npm install
* create a .env file for a discord authentication token
* create a new Discord application and bot
* configure from config.json
* add countdown audio file to root folder or remove audio playback from startRace.js

### changelog
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