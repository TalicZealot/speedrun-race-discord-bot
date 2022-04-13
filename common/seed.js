module.exports = (preset) => {
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
        "Indistinguishable",
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
        "Ancient",
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
        "Chipped",
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
        "Volcanic",
        "Colorful",
        "Flimsy",
        "Silly",
        "Shin",
        "Denjin",
        "Surprising",
        "Optimal",
        "Suboptimal",
        "Ultra",
        "Counter",
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
        "Nutella",
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
        "Dolphin",
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
        "Trebuchet",
        "Cheek",
        "Girl",
        "Spawn",
        "Fortune",
        "Revolver",
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
        "Witch",
        "Finding",
        "Viper",
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

    adjectivesHalloween = [
        "Scary",
        "Terrifying",
        "Spooky",
        "Eerie",
        "Horrendous",
        "Spinechilling",
        "Bloodcurdling",
        "Chilling",
        "Horrid",
        "Horrific",
        "Horrifying",
        "Dire",
        "Dreadful",
        "Fearsome",
        "Ghastly",
        "Disturbing",
        "Unnerving",
        "Creepy",
        "Nightmarish",
        "Gruesome",
        "Grotesque",
        "Hideous",
        "Petrifying",
        "Undead",
        "Vile",
        "Evil"
    ];
    nounsHalloween = [
        "Skeleton",
        "Ghost",
        "Vampire",
        "Ghoul",
        "Werewolf",
        "Zombie",
        "Phantom",
        "Monster",
        "Lich",
        "Bulette",
        "Beholder",
        "Hag",
        "Witch",
        "MindFlayer",
        "Devil",
        "Alien",
        "Abomination",
        "Construct",
        "Wendigo",
        "Wight",
        "Goblin",
        "Crone",
        "Spectre",
        "Banshee",
        "Wraith",
        "Arachnid",
        "Monstrosity"
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

    const rando = 't.sotn.io/?';
    const adventureUrl = 'a.t.sotn.io/?';
    const casualUrl = 'c.t.sotn.io/?';
    const speedrunUrl = 's.t.sotn.io/?';
    const ogUrl = 'og.t.sotn.io/?';
    const gogUrl = 'sotn.io/?tp:guarded-og,,'
    const glitchUrl = 'g.t.sotn.io/?';
    const scavengerUrl = 'sc.t.sotn.io/?';
    const handUrl = 'eh.t.sotn.io/?';
    const batUrl = 'sotn.io/?tp:bat-master,,';
    const bingo = 'testrunnersrl.github.io/?seed=';
    const bingoSuffix = '&game=sotn&type=';
    const bingospeedrunUrluffix = '&game=sotnr&type=';
    let glitchSeed = false;
    let site = '';
    let suffix = '';

    switch (preset) {
        case "og":
            site += ogUrl;
            break;
        case "guarded-og":
            site += gogUrl;
            break;
        case "speedrun":
            site += speedrunUrl;
            break;
        case "casual":
            site += casualUrl;
            break;
        case "adventure":
            site += adventureUrl;
            break;
        case "glitch":
            site += glitchUrl;
            glitchSeed = true;
            break;
        case "scavenger":
            site += scavengerUrl;
            break;
        case "bat-master":
            site += batUrl;
            break;
        case "empty-hand":
            site += handUrl;
            break;
        default:
            site += rando;
    }

    let seed = 'https://' + site + adjective + noun + number + suffix;

    return seed;
};