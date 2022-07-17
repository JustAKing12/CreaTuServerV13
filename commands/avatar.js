const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Devuelve el avatar de un usuario o tu avatar.')
        .addUserOption(option => option.setName('usuario').setDescription('Usuario seleccionado para ver el avatar.')),
    async run(interaction){
        const user = interaction.options.getUser('usuario')
        if (user) return interaction.reply(`Usuario seleccionado ${user.username} avatar: ${user.displayAvatarURL({ dynamic: true })}`)
        return interaction.reply(`Tu avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`)
    }
}