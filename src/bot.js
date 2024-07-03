const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Card } = require("welcomify");
const fs = require("fs");
const config = require("./config");
const chalk = require("chalk");
const greeting = require("./database/greeting");

const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.on("guildMemberAdd", async member => {
    const welcomecard = new Card()
    .setTitle("Welcome")
    .setName(member.user.username)
    .setAvatar(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setMessage(config.greetings.welcomemessage)
    .setBackground(config.client.greetimage)
    .setColor();
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                content: config.greetings.welcomemessage,
                files: [{
                attachment: await welcomecard.build(),
                name: `${member.id}.png`}]
            });
        }
    });
});

client.on('guildMemberRemove', async member => {
    const goodbyecard = new Card()
    .setTitle("Goodbye")
    .setName(member.user.username)
    .setAvatar(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setMessage("Beban Server | Coding Lounge")
    .setBackground(config.client.greetimage)
    .setColor("723391");
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                content: `Goodbye ${member.user.tag}, We hope you visit us back!`,
                files: [{
                attachment: await goodbyecard.build(),
                name: `${member.id}bye.png`}]
            });
        }
    });
});



client.handleEvents();
client.handleCommands();
client.login(config.client.token);


client.on("error", (err) => {
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${err}`))
})

process.on("unhandledRejection", (reason, promise) => {
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${reason}`))
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${promise}`))
})

process.on("uncaughtException", (err, origin) => {
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${err}`))
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${origin}`))
})

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${err}`))
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${origin}`))
})

process.on("warning", (warn) => {
    console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.redBright(`${warn}`))
})
