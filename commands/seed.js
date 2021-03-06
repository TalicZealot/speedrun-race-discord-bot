module.exports = (message, channel, isBingo, bingoType, bingoRando, randoType) => {
    let adjectives = [
        "Invincible",
        "Burning",
        "Preposterous",
        "Grumpy",
        "SuperDuper",
        "Boring",
        "Sorry",
        "Hot",
        "Used",
        "Afraid",
        "Tall",
        "Large",
        "Terrible",
        "Curious",
        "Pregnant",
        "Useful",
        "Decent",
        "Asleep",
        "Cultural",
        "Exciting",
        "Healthy",
        "Logical",
        "Popular",
        "Unhappy",
        "Known",
        "Critical",
        "Ugly",
        "Legal",
        "Powerful",
        "Hungry",
        "Angry",
        "Aware",
        "Scared",
        "Tiny",
        "Wooden",
        "Informal",
        "Happy",
        "Strict",
        "Obvious",
        "Federal",
        "Nice",
        "Every",
        "Relevant",
        "Friendly",
        "Distinct",
        "Unlikely",
        "Odd",
        "Weak",
        "Suitable",
        "Severe",
        "Capable",
        "Unfair",
        "Lonely",
        "Entire",
        "Similar",
        "Obscure",
        "Redundant",
        "Intelligent",
        "Yellow",
        "Sinister",
        "Spectacular",
        "Mint",
        "Fuzzy",
        "Squishy",
        "Corrupted",
        "Super",
        "Sharp",
        "Junior",
        "Riveting",
        "Perfect",
        "EX",
        "Supreme",
        "Dark",
        "Colorful",
        "Flimsy",
        "Silly",
        "Shin",
        "Denjin",
        "Surprising",
        "Optimal",
        "Suboptimal",
        "Ultra",
        "Powerful",
        "Cowardly",
        "Hairy",
        "Rage",
        "Vegan",
        "Epic",
        "Turbo",
        "Undead",
        "Chill",
        "True",
        "Moody",
        "Frozen",
        "Flawless",
        "Pointless"
    ];
    let nouns = [
        "Axelord",
        "Fleaman",
        "Saiyan",
        "Turtle",
        "Ranger",
        "Whip",
        "Octopus",
        "Slayer",
        "Vampire",
        "Zombie",
        "Skeleton",
        "Zerg",
        "Terran",
        "Protoss",
        "Spark",
        "Steel",
        "Rage",
        "Connection",
        "Radiator",
        "Alien",
        "Dog",
        "Cat",
        "Setup",
        "Shoryuken",
        "Fireball",
        "Fist",
        "Force",
        "Star",
        "Bug",
        "Beard",
        "Moustache",
        "Junior",
        "Planet",
        "Mist",
        "Wolf",
        "Bat",
        "Armor",
        "Axe",
        "Sword",
        "Boss",
        "Seed",
        "Alien",
        "Cable",
        "Soup",
        "Poem",
        "Cheek",
        "Girl",
        "Fortune",
        "Drawing",
        "Grocery",
        "Leader",
        "Setting",
        "Security",
        "Office",
        "Agency",
        "User",
        "Resource",
        "Policy",
        "Love",
        "Extent",
        "Week",
        "Employee",
        "Climate",
        "Unit",
        "Union",
        "Person",
        "Painting",
        "Analysis",
        "Night",
        "City",
        "Church",
        "Surgery",
        "Police",
        "Finding",
        "Member",
        "Patience",
        "Computer",
        "Movie",
        "Argument",
        "Virus",
        "Courage",
        "Debt",
        "Engine",
        "Tooth",
        "Wife",
        "Employer",
        "Gate",
        "Accident",
        "Warning",
        "Dinner",
        "Avocado",
        "Banana",
        "Cherry",
        "Celery",
        "Proton",
        "Neutron",
        "Apple",
        "Button",
        "Monitor",
        "Controller",
        "Potential"
    ];

    let adjective = adjectives[Math.floor(Math.random() * Math.floor(adjectives.length - 1))];
    let noun = nouns[Math.floor(Math.random() * Math.floor(nouns.length - 1))];
    let number = Math.floor(Math.random() * Math.floor(102));
    if (number == 100) {
        number = 420;
    }
    if (number == 101) {
        number = 702;
    }
    if (number == 69) {
        number = '69Nice';
    }

    let match = [];
    if (message) {
        match = message.content.match(/^[.!](\bseed\b)( ){0,1}((\badventure\b)|(\bspeedrun\b)|(\bscavenger\b)|(\bempty-hand\b)|(\bglitch\b)){0,1}( ){0,1}(\bbingo\b){0,1}( ){0,1}((\bhex\b)|(\bmission\b)){0,1}( ){0,1}(\brando\b){0,1}/i);
    }

    const rando = 't.sotn.io/?';
    const adventureUrl = 'a.t.sotn.io/?';
    const casualUrl = 'c.t.sotn.io/?';
    const speedrunUrl = 's.t.sotn.io/?';
    const glitchUrl = 'g.t.sotn.io/?';
    const scavengerUrl = 'sc.t.sotn.io/?';
    const handUrl = 'eh.t.sotn.io/?';
    const bingo = 'testrunnersrl.github.io/?seed=';
    const bingoSuffix = '&game=sotn&type=';
    const bingospeedrunUrluffix = '&game=sotnr&type=';
    let site = '';
    let suffix = '';

    if (match[9] || isBingo) {
        site = bingo;
        if (match[15] || bingoRando) {
            suffix += bingospeedrunUrluffix;
        } else {
            suffix += bingoSuffix;
        }
        if (match[11]) {
            suffix += match[11];
        } else {
            if (bingoType) {
                suffix += bingoType;
            } else {
                suffix += 'hex';
            }
        }
    } else {
        if (match[3]) {
            if (match[3] == 'speedrun') {
                site += speedrunUrl;
            } else if (match[3] == 'casual') {
                site += casualUrl;
            } else if (match[3] == 'adventure') {
                site += adventureUrl;
            } else if (match[3] == 'glitch') {
                site += glitchUrl;
            } else if (match[3] == 'scavenger') {
                site += scavengerUrl;
            } else if (match[3] == 'empty-hand') {
                site += handUrl;
            } else  {
                site += rando +  'p:' + match[3] + ',,';
            }
        } else if (randoType) {
            if (randoType == 'speedrun') {
                site += speedrunUrl;
            } else if (randoType == 'casual') {
                site += casualUrl;
            } else if (randoType == 'adventure') {
                site += adventureUrl;
            } else if (randoType == 'glitch') {
                site += glitchUrl;
            } else if (randoType == 'scavenger') {
                site += scavengerUrl;
            } else if (randoType == 'empty-hand') {
                site += handUrl;
            }else  {
                site += rando +  'p:' + randoType + ',,';
            }
        } else {
            site = rando;
        }
    }

    let seed = '<https://' + site + adjective + noun + number + suffix + '>';

    if (channel) {
        channel.send(seed).then().catch(console.error);
    }
    if (message) {
        message.delete().then().catch(console.error);
    }

    return seed;
};