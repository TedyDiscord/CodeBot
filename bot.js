const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const TOKEN = "NDA5NTA1ODkwMDE4Nzg3MzI5.Dk0fJQ.E_HShjENSvkvaP7E2RceHG_JRyk";
const PREFIX = "#";



function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

function play(connection, message) {
    var server= servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();

    server.dispatcher.on("end", function() {

        if (server.queue[0]) play(connection, message);
        else connection.disconnect();

    });
}

var bot = new Discord.Client();
var servers = {};

bot.on('ready', function() {
    console.log("Ready");
});

bot.on("guildMemberAdd", function*(member) {
    member.guild.channels.find("name", "dev").sendMessage(member.toString() + "Welcome to a new world");
    member.addRole(member.guild.roles.find("name", "MemeBOOOOOOY"));
    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: [DEVELOPER]
        }).then(function(role){
            member.addRole(role);
        });
    });

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "FeedBack":
            var FeedBack = new Discord.RichEmbed()
            .setTitle("FEEDBACK")
            .addField("E-mail", "doigameri00@gmail.com")
            .addField("Discord", "Majeamajijel#1614")
            .setFooter("I will wait your help :)")
         message.channel.sendEmbed(FeedBack);
            break;
            case "Help":
         var Help = new Discord.RichEmbed()
         .setAuthor("HELP")
         .addField("#FeedBack", "Send me original what can i should add in this bot", true)
         .addField("#Version", "Bot version", true)
         .addField("#Info", "Info about bot")
         .setFooter("This is a BETA version")
         .setColor(0x0FF0000)
         
     message.channel.sendEmbed(Help);
     break;
        case "Version":
            message.channel.sendMessage("Version 0.1 (BETA)");
            break;
        case "Info":
            var Info = new Discord.RichEmbed()
                .setDescription("Hello i'm CodeBot and i'm glad for know this server")
                .setFooter("Type #Help for more informations")
                .addField("BETA", "This is a beta version")
                .setAuthor("Author:Tedy")
                .setColor(0x000FF00)
                
            message.channel.sendEmbed(Info);
            break;
            case "Ban":
            message.channel.sendMessage(message.author.toString() + "Banned IDK the name")
            break;
            case "RemoveRole":
            message.channel.sendMessage("You succesful removed the role!")
            message.member.removeRole(message.guild.roles.find("name", "MemeBOOOOOOY"));
            break;
            case "DeleteRole":
            message.channel.sendMessage("You succesful deleted the role!")
            message.guild.roles.find("name", "MemeBOOOOOOY").delete();
            break;
        default:
            message.channel.sendMessage("Invalid command")
            break;
            case "Play":
            if (!args[1]) {
                message.channel.sendMessage("Please put a link")
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Go on an voie channel")
                return;
        }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];
            server.queue.push(args[1]);

    var server = servers[message.guild.id];
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message)
            });
            break;
            case "Skip":

            var server = server[message.guild.id];

        if (server.dispatcher) server.end();
            break;
            case "Stop":
            var server = server[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
    }
});

bot.login(TOKEN);
