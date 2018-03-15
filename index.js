const Discord = require("discord.js");
const TOKEN = "NDIyODU2NDMyMDc4MDI4ODEw.DYmaTA.ahLw-xBPkTJMlMAIreeRMAnqUKc";
const PREFIX = "<"
var fs = require('fs');

var bot = new Discord.Client();



var salute = [
    "Hello man",
    "Hi there",
    "Hey man",
    "Hello there"
]

var responsetocurse = [
    "Fuck off",
    "You suck bitch",
    "Dickhead",
    "Cunt",
    "Fuck you",
    "Pussy",
    "asshole",
    "ass",
    "idiot",
    "stupid",
    "shithead",
    "gay",
    "urmomgay"
]


bot.on("ready", function() {
    console.log("Bot is online.")
    bot.user.setPresence({ status: 'online', game: { name: 'Enzyme is coding me' } });
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "log").sendMessage(member.toString() + " welcome to the server!");
});

function count(string,char) {
 var re = new RegExp(char,"gi");
 return string.match(re).length;
}

bot.on("message", function(message, err) {
    console.log(message.guild.name + ": "+ message.content);

    if (message.content.startsWith("<kick")) {
       // Easy way to get member object though mentions.
       var member= message.mentions.members.first();
       // Kick
       if(message.member.roles.find("name", "Staff")) {
           member.kick().then((member) => {
               // Successmessage
               message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
           }).catch(() => {
                // Failmessage
               message.channel.send("Access Denied");
           });
       }else{
           message.reply("You does not have the rights to kick people!")
       }

   }

   if (message.content.startsWith("<ban")) {
       var member= message.mentions.members.first();
       // Kick
       if(message.member.roles.find("name", "Staff")) {
           member.ban().then((member) => {
               // Successmessage
               message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
           }).catch(() => {
                // Failmessage
               message.channel.send("Access Denied");
           });
       }else{
           message.reply("You does not have the rights to ban people!")
       }
   }

   if (message.content.startsWith("<unban")) {
       var member= message.mentions.members.first();
       // Kick
       if(message.member.roles.find("name", "Staff")) {
           member.unban().then((member) => {
               // Successmessage
               message.channel.send(":wave: " + member.displayName + " has been successfully unbanned :point_right: ");
           }).catch(() => {
                // Failmessage
               message.channel.send("Access Denied");
           });
       }else{
           message.reply("You does not have the rights to unban people!")
       }
   }

   if(message.content.startsWith("<warn")) {
       var memberr = message.mentions.members.first();
       var embed = new Discord.RichEmbed()
           .setDescription(memberr + " has been warned!")
           .setColor(0x00e1ff)
       message.client.channels.get('423539571368919041').sendEmbed(embed);
       message.channel.sendEmbed(embed);
       fs.appendFile("./database.txt", '"' + memberr.toString() + '"' + "\n", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        });
   }

   if(message.content.startsWith("<wlist")) {
       var memberr = message.mentions.members.first();
       var embed = new Discord.RichEmbed()
           .setDescription(memberr + " has been warned!")
           .setColor(0x00e1ff)
           var content;
       // First I want to read the file
        var content = fs.readFileSync('./database.txt', 'utf8');
        console.log(content)
       var str = content;
       console.log(memberr.id)
       if(str == null || str == '') {
           message.reply(memberr + " has 0 warnings.")
       } else {
           message.reply(memberr + " has " + count(str,memberr.id) + " warnings.")
       }

   };

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");





    switch (args[0].toLowerCase()) {
        case "hi":
        case "hello":
        case "hey":
        case "hay":
        case "sup":
        case "sup?":
            message.reply(salute[Math.floor(Math.random()*salute.length)])
            break;

        case "fuck you":
        case "fuck off":
        case "you suck":
        case "cunt":
        case "dick":
        case "eat my ass":
        case "bitch":
            message.reply(responsetocurse[Math.floor(Math.random()*responsetocurse.length)])
            break;

        case "1":
            var embed = new Discord.RichEmbed()
                .setDescription("According to itsdan, Correct answer is: 1")
                .setColor(0x00e1ff)
            message.client.channels.get('423554106477641729').sendEmbed(embed);
            break;
        case "2":
        var embed = new Discord.RichEmbed()
                .setDescription("According to itsdan, Correct answer is: 2")
                .setColor(0x44ff7f)
            message.client.channels.get('423554106477641729').sendEmbed(embed);
            break;
        case ",3":
        var embed = new Discord.RichEmbed()
                .setDescription("According to itsdan, Correct answer is: 3")
                .setColor(0xee6dff)
            message.client.channels.get('423554106477641729').sendEmbed(embed);
            break;
        case "memberme":
            message.member.addRole('423570772557299712')
            message.reply("you have been given the member role!")
    }

});

bot.login(TOKEN)
