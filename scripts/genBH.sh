#!/bin/bash
# echo "cp $1 ./tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin"
echo "========================================================================"
cp "$1" '/c/Users/Nikku/Documents/GitHub/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin'

echo "========================================================================"
"$2" a '/c/Users/Nikku/Documents/GitHub/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin' "$3"
echo "========================================================================"

"$4" -input '/c/Users/Nikku/Documents/GitHub/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).bin'
mv '/c/Users/Nikku/Documents/GitHub/speedrun-race-discord-bot/tmpbin/Castlevania - Symphony of the Night (USA) (Track 1).ppf' "$3"
