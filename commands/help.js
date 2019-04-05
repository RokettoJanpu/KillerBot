//Gives the help guide of the bot
module.exports = {
  name: `help`,
  description: `Sends the bot's help guide.`,
  execute(Discord, fs, message, players, cheer, game, weapons, weaponslist){
    var help = new Discord.RichEmbed()
      .setColor(0xCC0006)
      .setTitle(`Help guide`)
      .addField(`Welcome to Killer: the game!`,`The exciting game where you become the hitman of one of your friends!\nThe game is simple: once you start, everyone receives a target and a word as a weapon, the goal is to make your target say this word. If they do, you shoot them and they're dead. You'll then receive your new target and weapon to keep going. The winner is the last player standing! Everyone is someone's target, and every hitman are monitoring the server 24/7! Therefore, you can be killed at any time of the day and night, watch your words!`)
      .addField(`Prefix`,`**Default prefix**: k!\n**Prefix reminder**: tag me!\nEvery command should start with the prefix.`)
      .addField(`Game commands`,`**enter**: makes you join the game\n**start**: starts the game (3 players minimum are required)\n**current**: tells you how many players are still playing if you're not in game`)
      .addField(`Mods commands`,`**reset**: resets the current game\n**newprefix**: changes my prefix\n**resetprefix**: resets my prefix to k!\nRequired permission: kick members`)
      .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
    message.channel.send(help);
    message.delete(250);
  },
};