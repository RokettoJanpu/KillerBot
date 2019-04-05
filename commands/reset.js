//resets the game
module.exports = {
  name: `reset`,
  description: `Resets the current game if the user is a moderator.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if the user is a moderator
    if(message.member.hasPermission(`KICK_MEMBERS`) === true){
      //resets the important variables
      players.length = 0;
      game.length = 0;
      weapons = weaponslist.words;
      var rst = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`The game has succesfully been reset.`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(rst);
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