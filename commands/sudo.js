const sudoTimeout = 1000 * 60 * 5; // 5 minutes
// const sudoTimeout = 1000 * 10; // 10 seconds
const wheelGID = '792816454407553075';
const suGID = '782265818015858749';

function removeSudo(msgObj) {
  msgObj.member.roles.remove(suGID);
  msgObj.channel.send(msgObj.member + " has lost admin access.");
}

module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      // msg.reply("I've been `sudo`'d"); 
      const memberDisplayName = msg.member.displayName + " (" + msg.member.id + ")";
      if(msg.member.roles.cache.has(wheelGID)) {
        msg.member.roles.add(suGID);
        setTimeout(removeSudo, sudoTimeout, msg);
        msg.channel.send(memberDisplayName + " now has admin access for " + (sudoTimeout/(1000*60)) + " minutes.");
      }
    },
};
