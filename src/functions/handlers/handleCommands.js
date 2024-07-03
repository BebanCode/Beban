const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../../config');
const puppeteer = require('puppeteer')

module.exports = (client) => {
    if (!client) {
        console.error('Invalid client object provided.');
        return;
    }

    client.handleCommands = async () => {
        client.commands = new Map();
        client.commandArray = [];

        const commandFolders = fs.readdirSync('./src/commands');

        let commandsArray = [];
        let developerArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());

                if (command.developer) {
                    developerArray.push(command.data.toJSON());
                } else {
                    commandsArray.push(command.data.toJSON());
                }

                console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('['), chalk.grey('CMD'), chalk.red(']'), chalk.cyan(`Berhasil memuat ${command.data.name}`));
            }
        }

        const rest = new REST({ version: '9' }).setToken(config.client.token);

        try {
            console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.cyan(`Memulai reload application (/) commands`));

            await rest.put(Routes.applicationCommands(config.client.id), { body: commandsArray });
            await rest.put(Routes.applicationGuildCommands(config.client.id, config.client.guild), { body: developerArray })

            console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.cyan(`Berhasil reload application (/) commands`));
        } catch (error) {
            console.error(error);
        }
    };
};
