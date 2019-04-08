//updates the prefix of the bot
module.exports = {
  name: `newprefix`,
  description: `Allows moderators to change the prefix of the bot.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if the user is a moderator
    if(message.member.hasPermission(`KICK_MEMBERS`) === true){
      //takes as new prefix what comes after newprefix
      var arg = message.content.split(/ +/);
      var prefixfile = JSON.parse(fs.readFileSync(`./prefix.json`));
      prefixfile = {
        prefix: arg[1].toLowerCase()
      };
      fs.writeFile(`./prefix.json`, JSON.stringify(prefixfile), err => {
        if(err) console.log(err);
      });
      var npr = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`The prefix has been set to: ${prefixfile.prefix}`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(npr);
      message.delete(250);
    }
    else{
      var perm = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`You don't have the permission to reset the game. (required: kick members)`)
        .setFooter(`Game developed by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(perm);
      message.delete(250);
    }
  },
};
