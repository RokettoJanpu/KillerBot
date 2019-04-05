//resets the prefix of the bot
module.exports = {
  name: `resetprefix`,
  description: `Resets the bot prefix to its original: !k, if the user is a moderator.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if the user is a moderator
    if(message.member.hasPermission(`KICK_MEMBERS`) === true){
      //resets the prefix to: k!
      var prefixfile = JSON.parse(fs.readFileSync(`./prefix.json`));
      prefixfile = {
        prefix: `k!`
      };
      fs.writeFile(`./prefix.json`, JSON.stringify(prefixfile), err => {
        if(err) console.log(err);
      });
      var rpr = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`The prefix has been reset to: ${prefixfile.prefix}`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(rpr);
      message.delete(250);
    }
    else{
      var perm = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`You don't have the permission to reset the game. (required: kick members)`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(perm);
      message.delete(250);
    }
  },
};