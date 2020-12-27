// const sudoTimeout = 1000 * 60 * 5; // 5 minutes
const sudoTimeout = 1000 * 10; // 10 seconds
const sudoersGID = '792816454407553075';
const suGID = '782265818015858749';

const config = {
  "704057794571272362": {
    "sudoersGID": "792816454407553075",
    "suGID": "782265818015858749"
  },
  "752074304224755752": {
    "sudoersGID": "792816454407553075",
    "suGID": "782265818015858749"
  }
}


function removeSudo(msgObj) {
  if(config.hasOwnProperty(msg.guild.id)) {
    const suGID = config[msg.guild.id].suGID;

    msgObj.member.roles.remove(suGID);
    msgObj.channel.send(msgObj.member + " has lost admin access.");
  }
}

module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      const memberDisplayName = msg.member.displayName + " (" + msg.member.id + ")";

      // Look up the configuration for the server
      if(config.hasOwnProperty(msg.guild.id)) {
        const sudoersGID = config[msg.guild.id].sudoersGID;
        const suGID = config[msg.guild.id].suGID;

        if(msg.member.roles.cache.has(sudoersGID)) {
          msg.member.roles.add(suGID);
          setTimeout(removeSudo, sudoTimeout, msg);
          msg.channel.send(memberDisplayName + " now has admin access for " + (sudoTimeout/(1000*60)) + " minutes.");
        }
      }
    },
};
