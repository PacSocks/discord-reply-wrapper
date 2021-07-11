const {Structures} = require("discord.js);

// loads discord-reply, this wraps that...
require("discord-reply");

var mention;

class PatchedMessage extends Structures.get("Message") {

  constructor() {
    super(...arguments);
  }
  
  reply(...args) {
    try{
      var option = args[1].allowed_mentions.repliedUser;
    } catch() {}
    if(args[0]===false||option===false){
      args.shift();
      return lineReplyNoMention(...args);
    }else{
      if(mention===false&&(args[0]!==true||option!==true))return lineReplyNoMention(...args);
      return lineReply(...args);
    }
  }

}

Structures.extend("Message", () => PatchedMessage);

module.exports = function(bool){
  if(!typeof bool === "boolean")throw new TypeError(`Expected boolean but got ${typeof bool} instead`);
  mention = bool;
}
