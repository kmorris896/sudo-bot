const winston = require('winston');

// Winston Logger Declarations
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({format: winston.format.combine(winston.format.colorize(), winston.format.simple())})
  ]
});

const sudoTimeout = 1000 * 60 * (process.env.SUDO_TIMEOUT || 5); // Default: 5 minutes
logger.info("sudoTimeout: " + sudoTimeout + " (" + (sudoTimeout/(1000*60)) + " minutes).");

const config = {
  "704057794571272362": {
    "sudoersGID": "792816454407553075",
    "suGID": "782265818015858749"
  },
  "752074304224755752": {
    "sudoersGID": "792877181311254528",
    "suGID": "792881943888134154"
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
        logger.info(memberDisplayName + " invoked admin access.");
        const sudoersGID = config[msg.guild.id].sudoersGID;
        const suGID = config[msg.guild.id].suGID;

        logger.debug("Checking " + memberDisplayName + " for roleID " + sudoersGID);
        if(msg.member.roles.cache.has(sudoersGID)) {
          logger.debug(memberDisplayName + " has sudoersGID.  Attempting to add admin role " + suGID);

          // Try granting admin role
          
          msg.member.roles.add(suGID)
          .then(value => {
            setTimeout(removeSudo, sudoTimeout, msg); 
            msg.channel.send(memberDisplayName + " now has admin access for " + (sudoTimeout/(1000*60)) + " minutes.");
          })
          .catch(err => {
            msg.reply("Unable to add admin access.  Please see bot log for details.");
            logger.error("Unable to add admin roleID to " + memberDisplayName);
            logger.error(err);
          });
        }
      }
    },
};
