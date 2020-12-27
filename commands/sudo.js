module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      // msg.reply("I've been `sudo`'d");
      if(msg.member.roles.has('762019329771962420')) {
        msg.channel.send(msg.member + " invoked me and has the admin role.");
      }      
    },
};
