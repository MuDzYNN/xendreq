const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const FetchUser = require('./discordHandler');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../bot/json.sqlite', (err) => {
    if (err) throw err;
    console.log('Conntected to database');
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/getData', (req, res) => {
    const players = JSON.parse(fs.readFileSync(path.join(__dirname, '../bot/data/players.json')));

    db.serialize(() => {
        db.all('SELECT json FROM json WHERE ID="client"', async (err, result) => {
            if (err) throw err;
            if (!result[0]) return;
            const data = {};

            Object.entries(players).forEach(([key, value]) => {
                if (!data[key]) data[key] = {};
                data[key] = { ...data[key], ...value };
            });

            Object.entries(JSON.parse(result[0].json)).forEach(([key, value]) => {
                if (!data[key]) data[key] = {};
                data[key] = { ...data[key], ...value };
            });

            // Fetch users
            for (discordID in data) {
                const user = await FetchUser(discordID);
                data[discordID].nickname = user.username + '#' + user.discriminator;
                data[discordID].avatar = user.displayAvatarURL({ dynamic: true });
            }

            // Validate data and made 
            const finalData = Object.entries(data).map(([, value]) => {
                if (!value.avatar) value.avatar = '';
                if (!value.nickname) value.nickname = '';
                if (!value.level) value.level = 0;
                if (!value.xp) value.xp = '?';
                if (!value.xpneeded) value.xpneeded = '?';
                if (!value.kasa) value.kasa = 0;
                if (!value.wia) value.wia = 0;
                return value;
            });

            res.json(finalData);
        });
    });
});

app.listen(80, () => console.log('Listening at http://127.0.0.1:80'));
