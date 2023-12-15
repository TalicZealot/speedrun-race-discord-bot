#!/bin/bash
# echo "cp $1 ./tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin"
echo "========================================================================"
cp "$1" '/d/GithubDesktop/Repositories/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin'

echo "========================================================================"
"$2" a '/d/GithubDesktop/Repositories/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin' "$3"
echo "========================================================================"

"$4" -input '/d/GithubDesktop/Repositories/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin'
mv '/d/GithubDesktop/Repositories/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).ppf' "$3"

sleep 15