const sudoTimeout = 1000 * 60 * 5; // 5 minutes
// const sudoTimeout = 1000 * 10; // 10 seconds
const sudoersGID = '792816454407553075';
const suGID = '782265818015858749';

const config = {
  "704057794571272362": {
    "sudoersGID": "792816454407553075",
    "suGID": "782265818015858749"
  },
  "752074304224755752": {
    "sudoersGID": "792877181311254528",
    "suGID": "752090254021885993"
  }
}


function removeSudo(msg) {
  const memberDisplayName = msg.member.displayName + " (" + msg.member.id + ")";

  if(config.hasOwnProperty(msg.guild.id)) {
    const suGID = config[msg.guild.id].suGID;

    msg.member.roles.remove(suGID);
    logger.info(memberDisplayName + " admin access revoked.");
    msg.channel.send(memberDisplayName + " has lost admin access.");
  } else {
    msg.channel.send("Unable to remove sudo access from " + memberDisplayName)
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
          logger.info(memberDisplayName + " invoked admin access.");
          msg.channel.send(memberDisplayName + " now has admin access for " + (sudoTimeout/(1000*60)) + " minutes.");
        }
      }
    },
};
