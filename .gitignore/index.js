const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "/";    

Client.on("ready", () => {
    console.log("bot opérationnel");

});
//ping
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "ping"){
    message.channel.send("pong!");

    }

    if(message.content == prefix + "stat"){
        message.channel.send("**" + message.author.username + "**  ton identifiant : `" + message.author.id + "` a posté un message");
    }
//Bienvenue
    if(message.content == prefix + "bvn"){
    if(message.author.bot) return;

    if(message.channel.type == "dm") return;
        message.channel.send(" **`Bienvenue a toi sur le serveur🎁🎉`** " );
    }
});

 /*******************************************
    ************ SYSTEME DE BAN *****************
    *******************************************/
   Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    if(message.member.hasPermission("Ban_Menbers")){
     if(message.content.startsWith(prefix + "ban")){
          let mention = message.mentions.members.first();

          if(mention == undefined){
              message.reply("Mention non ou mal faite")
          }
          else {
              if(mention.bannable){
                 mention.ban();
                 message.channel.send(mention.displayName + " ✅ à été banni avec succès");
              }
              else {
                  message.reply("❌ Impossible de banir cette personne")
              }


          }
          

          }
       }   
     
});

   /*******************************************
    ************ Systeme de Kick **************
    *******************************************/
   Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    if(message.member.hasPermission("Kick_Menbers")){
     if(message.content.startsWith(prefix + "kick")){
          let mention = message.mentions.members.first();

          if(mention == undefined){
              message.reply("Mention non ou mal faite")
          }
          else {
              if(mention.kickable){
                 mention.kick();
                 message.channel.send(mention.displayName + " ✅ à été Kick avec succès");
              }
              else {
                  message.reply("❌ Impossible de Kick cette personne")
              }


          }
          

          }
       }   
     
});

    /*******************************************
    ************ SYSTEME DE TICKETS ************
    *******************************************/
   Client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return
    if (reaction.emoji.name == "✅") {
        reaction.message.channel.send('Tu as réagi : ✅');
        reaction.message.guild.channels.create(`ticket de ${user.username}`, {
            type: 'text',
                id: reaction.message.guild.id,
                deny: ['SEND_MESSAGES'],
                allow: ['ADD_REACTIONS']
        }).then(channel_ticket => {
            channel_ticket.send("Channel crée !")
        })
    }
})


Client.login("process.env.TOKEN");
