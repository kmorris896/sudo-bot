# Sudoers Bot

The [principle of least-privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
states that people should have the least amount of privileges needed to
do their work.  I absolutely hate the fact that Discord makes this
down-right impossible as server owners have all rights at all times,
which can lead to mistakes.  (e.g. accidently moving a channel into a
different category.)

This bot does one thing and does it super well: It grants the invoking
user a role that has full admin rights to a Discord server for a set
amount of time, after which time the role is removed.

This bot is currently set up for two servers (my test server and my real
server) but I am thinking of extending it into a full public bot.  This
bot is also small enough that it can be run in Heruko with the included
[`Procfile`](https://devcenter.heroku.com/articles/procfile).

If you would like to deploy this into your own server, you must [create
your own Discord bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
and [invite it to your own server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).

## Discord Bot Token

You may declare your token as an environment variable or within a `.env` 
file at the root of this directory.  The variable name is `TOKEN` for
either option.

If you deploy using Heroku, you should declare this in your Config Vars
section within your project's settings.

## Roles

You will need to roles: "sudoers" and "su", or for those who are not 
familiar with Linux, an "approved admins" group and then a "admin" 
group.

The "sudoers" role is best described as a non-permissive role which
has people who are permitted to become admins.  In a Discord context,
this may be moderators or specific people you trust.

The "su" role is the actual administrator role that members in your
"sudoers" role will assume to perform actions on your server.

Role rank is very important here.  The highest role your sudoers will
determine their ability to administrate other users.  For example, if
your su role is lower in rank than your normal member role, then it
won't be able to perform any actions.  This may be useful in it's own
way as it gives the ability to make channel changes without giving the
ability to administer the rest of the server.

The rank of the bot's role does not matter.

## Inviting the Bot

The bot I am using is not public and you must fork this repository and
edit the config before deploying it.  When inviting your version of the
bot, it only requires the "Manage Roles" permission.  It is recommended
that you set up the bot to have the appropriate read/write permissions 
in one channel that your sudoers will have access to.

## Best Practices

The best way to set this up is to have the bot only be visible in one
channel.  While the bot has been written to ensure membership into the
sudoers role, having explicit access to a channel provides a quasi
two-factor authentication: one set by the server admin and one set by
the role.


