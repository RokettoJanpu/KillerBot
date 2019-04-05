//initiate the game
module.exports = {
  name: `start`,
  description: `Gives each player a different target and weapon.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    //checks if a game isn't running
    if(game.length == 0){
      //checks if there's enough players to start a game | 3 players minimum are required
      if(players.length >= 3){
        var targets = players;
        //for each players
        players.forEach(p => {
          //selects a word a random and removes it from the words list
          var w = weapons.splice(Math.floor(Math.random()*weapons.length),1);
          //selects a target at random that isn't the player and removes it from the targets list
          var t = targets.filter(potentialTargets => potentialTargets != p)
            .splice(Math.floor(Math.random()*targets.length),1);
          //creates an array of objects for each player with their target and weapon
          game.push({player: p, target: t, weapon: w});
          //sends a direct message to the player with their target and weapon
          p.send(`Here's your target: ${t}\nAnd here's your weapon: **${w}**\n*${cheer[Math.floor(Math.random()*cheer.length)]}*`);
        });
        var sg = new Discord.RichEmbed()
          .setColor(0xCC0006)
          .setDescription(`The game has started!\nYou should have received a target and a word as weapon in your DM.\nGood luck and may the best man win!`)
          .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
        message.channel.send(players.join(" "))
          .then(sentMessage => {
            sentMessage.delete(250);
          });
        message.channel.send(sg);
        message.delete(250);
      }
      //if the minimum number of players isn't met
      else if(players.length < 3){
        var mp = new Discord.RichEmbed()
          .setColor(0xCC0006)
          .setDescription(`Not enough players have entered the game to start yet.\nCurrent number of registered players: ${players.length}/3 (minimum)`)
          .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
        message.channel.send(mp);
        message.delete(250);
      }
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