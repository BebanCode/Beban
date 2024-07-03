const chalk = require("chalk");
const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const serper = client.guilds.cache.size
        const member = client.users.cache.size
        console.log(chalk.white(chalk.bold('BEBAN SISTEM')), chalk.red('+'), chalk.cyan(`Berhasil login sebagai ${client.user.username}`))

        setInterval(async function () {
            const status = [`Melayani ${member} member`];
            const statuses = status[Math.floor(Math.random() * status.length)]
            client.user.setActivity(statuses, { type: ActivityType.Custom })
            client.user.setPresence({ status: 'idle' })
        }, 10000)
    }
}