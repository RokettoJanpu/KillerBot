//players enter the game
module.exports = {
  name: `enter`,
  description: `Adds players to the players array if the game isn't running.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if a game isn't running
    if(game.length == 0){
      //adds new players to the players array
      //prevents from players who already entered to enter again
      if(players.length > 0){
        players.forEach(p => {
          if(p != message.author){
            players.push(message.author);
            message.channel.send(`${message.author} entered killer: the game!`)
              .then(sentMessage => {
                sentMessage.delete(2500);
            });
          }
          else{
            message.channel.send(`${message.author} you already entered the game.`)
              .then(sentMessage => {
                sentMessage.delete(2500);
            });
          } 
        });
      }
      //if there aren't any players
      else if(players.length == 0){
        players.push(message.author);
        message.channel.send(`${message.author} entered killer: the game!`)
          .then(sentMessage => {
            sentMessage.delete(2500);
        });
      }
      var np = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`Current number of registered players: ${players.length}/3 (minimum)`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(np);
      message.delete(250);
    }
    //checks if a game is already running
    else if(game.length != 0){
      var gr = new Discord.RichEmbed()
        .setColor(0xCC0006)
        .setDescription(`A game is already running.\nPlease wait until a winner is announced to start a new game.`)
        .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
      message.channel.send(gr);
      message.delete(250);
    }
  },
};