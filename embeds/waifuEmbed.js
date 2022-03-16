const { MessageEmbed } = require("discord.js");

const waifuEmbed = (response) => new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Una waifu salvaje ha aparecido!')
                .setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cae14e96-9996-43d7-9f8a-531037c13191/d89d9ti-a202aa31-d060-4c87-baed-2c81f5506666.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhZTE0ZTk2LTk5OTYtNDNkNy05ZjhhLTUzMTAzN2MxMzE5MVwvZDg5ZDl0aS1hMjAyYWEzMS1kMDYwLTRjODctYmFlZC0yYzgxZjU1MDY2NjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1eIUAazPzboeb7AF_AJW7RPWJG_ZiaMcHjaWqIOifTA')
                .setImage(response.data.url)
                .setTimestamp()
                .setFooter({text: 'WAIFU.PICS', iconURL:'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cae14e96-9996-43d7-9f8a-531037c13191/d89d9ti-a202aa31-d060-4c87-baed-2c81f5506666.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhZTE0ZTk2LTk5OTYtNDNkNy05ZjhhLTUzMTAzN2MxMzE5MVwvZDg5ZDl0aS1hMjAyYWEzMS1kMDYwLTRjODctYmFlZC0yYzgxZjU1MDY2NjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1eIUAazPzboeb7AF_AJW7RPWJG_ZiaMcHjaWqIOifTA'});

module.exports = waifuEmbed;