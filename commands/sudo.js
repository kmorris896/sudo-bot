module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      // msg.reply("I've been `sudo`'d");
      if(msg.member.roles.has('792816454407553075')) {
        msg.channel.send(msg.member + " invoked me and has the wheel role.");
        msg.member.roles.add('782265818015858749');
        msg.channel.send(msg.member + " now has admin access for 10 minutes.")
      }      
    },
};
