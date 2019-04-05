//checks how many players are still in game
module.exports = {
  name: `current`,
  description: `Gives the information on how many players are still playing.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if a game is already running
    if(game.length != 0){
      //for each players in game
      game.forEach(g => {
        //if the person triggering the command is a player
        if(message.author == g.player){
          message.author.send(`So you want to cheat and know how many players are still in game? **HOW DARE YOU?!**`);
          return;
        }
        //else if the person triggering the command isn't a current player
        message.author.send(`Please don't tell anyone, but there are currently ${game.length} players in game.`);
      });
      message.delete(250);
    }
    //checks if a game isn't running
    if(game.length == 0){
      var ng = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`There are currently no game running.`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(ng);
      message.delete(250);
    }
  },
};