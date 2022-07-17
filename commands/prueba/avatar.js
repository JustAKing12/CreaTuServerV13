const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Devuelve tu avatar o el de un usuario.')
        .addUserOption(option => option.setName('usuario').setDescription('Usuario al que le verás su avatar.')),
    async run(interaction){
        const user = interaction.options.getUser('usuario')
        if (user){
            const embed = new MessageEmbed()
            .setColor(config.defaultColor)
            .setDescription(`El avatar de ${user.username} es:`)
            .setImage(user.displayAvatarURL({ dynamic: true}))
            return interaction.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setColor(config.defaultColor)
            .setDescription(`Tu avatar es:`)
            .setImage(interaction.user.displayAvatarURL({ dynamic: true}))
            return interaction.reply({embeds: [embed]})
        }
    }
}
