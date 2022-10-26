class Player extends Model {}

Player.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    stream: Sequelize.TEXT
}, { sequelize, modelName: 'player' });
Player.Categories = Player.hasMany(Elo);
Player.Races = Player.hasMany(Race);


class Race extends Model {}

Race.init({
    seed: Sequelize.TEXT
}, { sequelize, modelName: 'race' });
Race.Results = Race.hasMany(Result);
Race.Category = Race.hasOne(Category);


class Result extends Model {}

Result.init({
    time: Sequelize.INTEGER
}, { sequelize, modelName: 'result' });
Result.Player = Elo.hasOne(Player);



class Category extends Model {}

Category.init({
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    LeaderboardId: {
        type: Sequelize.INTEGER,
        unique: true
    },
    ranked: Sequelize.BOOLEAN
}, { sequelize, modelName: 'category' });
Category.Elos = Category.hasMany(Elo);


class Elo extends Model {}

Elo.init({
    points: Sequelize.INTEGER
}, { sequelize, modelName: 'elo' });
Elo.Player = Elo.hasOne(Player);
Elo.Category = Elo.hasOne(Category);