module.exports = {
    name: 'sudo',
    description: 'sudo!',
    execute(msg, args) {
      msg.reply("I've been `sudo`'d");
      // msg.channel.send('bar');
    },
};
