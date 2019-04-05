const fs = require(`fs`);
const Discord = require(`discord.js`);

const auth = require(`./auth.json`);
const weaponslist = require(`./data/weapons.json`);//list of around 10k words
const cheerlist = require(`./data/cheer.json`);//list of sentences

const KillerBot = new Discord.Client();
KillerBot.login(auth.token);

var players = [];
var newtarget = ``;
var newweapon = ``;
var game = [];

var weapons = weaponslist.words;
const cheer = cheerlist.sentences;

//loops through the commands file and adds each of them to the bot
KillerBot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  KillerBot.commands.set(command.name, command);
}

KillerBot.on('ready', () => {
  KillerBot.user.setActivity(`Tag me!`);
  console.log(`${KillerBot.user.tag} is ready to kill!`);
});

//COMMANDS
KillerBot.on('message', message => {
  prefixfile = JSON.parse(fs.readFileSync(`./prefix.json`));
  prefix = prefixfile.prefix;
  //prefix reminder, if someone tags the bot
  if(message.content.startsWith(KillerBot.user)){
    var pr = new Discord.RichEmbed()
      .setColor(0xCC0006)
      .setDescription(`The current prefix is: ${prefix}\nType ${prefix}help to open the help guide.`)
      .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
    message.channel.send(pr);
    message.delete(250);
  }
  //exits if the message doesn't start with the command prefix
  if(!message.content.startsWith(prefix)) return;
  //gets the command name that is triggered
  var cmd = message.content.split(/ +/);
  cmd = cmd[0].slice(prefix.length).toLowerCase();
  //exits if the command requested doesn't exist
  if(!KillerBot.commands.has(cmd)) return;
  //runs the command
  try{
    KillerBot.commands.get(cmd).execute(Discord, fs, message, players, cheer, game, weapons, weaponslist);
  }catch(error){
    console.error(error);
    message.reply(`Error!`);
  }
});

//GAME
//if the game has started
if(game.length != 0){
  //and a new message is sent
  KillerBot.on('message', message => {
    //divide each words of the message and put it each words in an array
    var text = message.content.split(/ +/);
    console.log(text);
    //look in every objects inside the game array
    game.forEach(game => {
      //for each words
      text.forEach(text => {
        //if the target has mentioned the word that kills them
        if(text.toLowerCase() === game.weapon && message.author === game.target){
          //if there are more than 2 players left we need to reasign the target and weapon to the killer
          if(game.length > 2){
            //the target of the dead player becomes newtarget
            newtarget = game[game.findIndex(killed => killed.player === game.target)].target;
            //the weapon of the dead player becomes newweapon
            newweapon = game[game.findIndex(killed => killed.player === game.target)].weapon;
            /*
            killed = game.filter(killed => killed.player === game.target);
            newtarget = killed.target;
            newweapon = killed.weapon;
            */
          }
          //removes the dead player from the game as well as their target and weapon
          game.splice(game.findIndex(killed => killed.player === game.target),1);
          //sends a direct message to the player that has just been killed
          game.target.send(`My condolences to your close ones, you just got shot by ${game.player}!\nBetter luck next time!`);
          //checks if there's still is more than one player in game
          if(game.length > 1){
            //sends a direct message to the player that killed, giving them new target and new weapon
            game.player.send(`Wow! Nice shot! You just killed ${game.target}!\nYour new target is: ${newtarget}\nAnd your new weapon is: ${newweapon}\nKeep up the good work!`);
            //replaces the remaining player's target and weapon in the array with the new ones
            game.target = newtarget;
            game.weapon = newweapon;
          }
          //checks if there is a winner
          else if(game.length == 1){
            //sends a direct message to the winner and all the players of the game
            game.player.send(`Wow! Nice shot! You just killed ${game.target}!\nWhat's that?! It seems your the last one standing!\nCongrats, you won this game!`);
            var eg = new Discord.RichEmbed()
              .setColor(0xCC0006)
              .setDescription(`Congratulations to ${game.player.username} for eliminating all their opponents!`)
              .setFooter(`Game developped by Emily. Support -> https://discord.gg/g8GxPUE`);
            message.channel.send(players.join(" "))
              .then(sentMessage => {
                sentMessage.delete(250);
              });
            message.channel.send(eg);
            //resets the game
            players.length = 0;
            game.length = 0;
            weapons = weaponslist.words;
          }
        }
      });
    });
  });
}