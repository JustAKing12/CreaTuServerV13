const cheerio = require('cheerio');
const request = require('request');
const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spell')
        .setDescription('Devuelve la configuración del Spell mencionado.')
        .addStringOption(option =>
            option.setName('spell')
                .setDescription('Spell del cual quieras obtener su configuración.')
                .setRequired(true)),
    async run(interaction){
        const spell = interaction.getStringOption('spell').replace(" ", "-");
        if (spell) {
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true}));
            request(spell, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    embed.setTitle(`Configuración del Spell ${spell}`);
                    let $ = cheerio.load(body);
                    $('tr', 'table').each(function () {
                        let spellConfig = $(this).text().split('\n').slice(1, 5);
                        embed.addField(name=`${spellConfig[0]} (${spellConfig[3]})`, value=spellConfig[1], inline=true);
                    });
                    return interaction.reply({embeds: [embed]});
                } else {
                    embed.setTitle("¡Error!");
                    embed.setDescription("No se ha encontrado el Spell mencionado.");
                    return interaction.reply({embeds: [embed]});
                }
            });
        } else {
            return interaction.reply("No existe un spell con ese nombre...");
        }
    }
}
