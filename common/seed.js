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
        "Distorted",
        "Curious",
        "Pregnant",
        "Useful",
        "Decent",
        "Enhanced",
        "Asleep",
        "Cultural",
        "Indistinguishable",
        "Exciting",
        "Healthy",
        "Logical",
        "Popular",
        "Overdriven",
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
        "Predictable",
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
        "SCP",
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

    let adjectivesHalloween = [
        "Scary",
        "Terrifying",
        "Spooky",
        "Eerie",
        "Horrendous",
        "Abyssal",
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
        "Evil",
        "Unsettling",
        "Incorporeal",
        "Ephemeral",
        "Haunting",
        "Frightening",
        "Graven",
        "Abhorrent",
        "Surreal",
        "Insidious",
        "Sordid",
        "Malicious",
        "Unspeakable",
        "Defiled",
        "Unscrupulous",
        "Sinister",
        "Malevolent",
        "Haunted",
        "Gory",
        "Decapitated",
        "Disemboweled",
        "Deceased",
        "Fanged",
        "Paranormal"
    ];
    let nounsHalloween = [
        "Skeleton",
        "Ghost",
        "SCP",
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
        "Demon",
        "Fiend",
        "Alien",
        "Lich",
        "Gargoyle",
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
        "Monstrosity",
        "Yokai",
        "Spirit",
        "Wretch",
        "Fiend",
        "Oni",
        "Kitsune",
        "Chupacabra",
        "Basilisk",
        "Horror",
        "Nightmare",
        "Cockatrice",
        "Kraken",
        "Djinn",
        "Ogre",
        "Gorgon",
        "Warlock",
        "Ooze",
        "Shedim",
        "Asura",
        "Daeva",
        "Gallas",
    ];

    let adjective = adjectivesHalloween[Math.floor(Math.random() * Math.floor(adjectivesHalloween.length - 1))];
    let noun = nounsHalloween[Math.floor(Math.random() * Math.floor(nounsHalloween.length - 1))];
    let number = Math.floor(Math.random() * Math.floor(102));
    if (number > 75) {
        number = 'BehindYou';
    }
    /*
    if (number == 100) {
        number = 420;
    }
    if (number == 101) {
        number = 702;
    }
    if (number == 69) {
        number = '69Nice';
    }
    */

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
    const nimbleUrl = 'sotn.io/?tp:nimble,,';
    const lycanthropeUrl = 'sotn.io/?tp:lycanthrope,,';
    const expeditionUrl = 'sotn.io/?tp:expedition,,';
    const warlockUrl = 'sotn.io/?tp:warlock,,';

    const bingo = 'testrunnersrl.github.io/?seed=';
    const bingoSuffix = '&game=sotn&type=';
    const bingospeedrunUrluffix = '&game=sotnr&type=';
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
            break;
        case "scavenger":
            site += scavengerUrl;
            break;
        case "bat-master":
            site += batUrl;
            break;
        case "nimble":
            site += nimbleUrl;
            break;
        case "lycanthrope":
            site += lycanthropeUrl;
            break;
        case "expedition":
            site += expeditionUrl;
            break;
        case "warlock":
            site += warlockUrl;
            break;
        case "empty-hand":
            site += handUrl;
            break;
        default:
            site += rando;
    }

    let seedName = adjective + noun + number + suffix;
    let seedLink = 'https://' + site + seedName;

    let seed = {
        name: seedName,
        link: seedLink
    };

    return seed;
};