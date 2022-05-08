const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();

client.on('ready', () => console.log('Connected to Discord API servers.'))

client.login(process.env.TOKEN);

module.exports = async discordID => {
    const user = client.users.cache.get(discordID) || client.users.fetch(discordID);
    return new Promise(resolve => resolve(user));
}