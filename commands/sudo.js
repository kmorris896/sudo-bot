module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      // msg.reply("I've been `sudo`'d");
      msg.channel.send(msg.member + " invoked me and has the following roles: " + JSON.stringify(msg.member.roles));
    },
};
