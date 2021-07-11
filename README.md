# Discord Reply Wrapper

## About
This package wraps [discord-reply](https://npmjs.com/package/discord-reply) and replaces [`Message.reply`](https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=reply) with inline replies rather than prepending a mention.

This is meant to make it easy to change your current code and have to do little changes when inline `.reply` is implemented in discord.js@13.0.0.

This also supports adding a boolean as the first parameter to set the mention option instead of writing
```js
message.reply("I am not mentioning you!", {
  allowedMentions: {
    repliedUser: false
  }
});
```
although still being supported.
**Using both may result in unexpected behaviour.**

```diff
@@ DISCLAIMER @@

– Using the latter is NOT fully reccommended as the official Discord.JS library

- does NOT have built-in support for that.

- Although support may change as discord.js@13.0.0 is not fully developed, 

- there is NO guarantee that this feature will be in the library! 

+ You can just use this library forever, maybe? Maybe not?
```


## Usage & Examples
```js
/*
 * Important: require() this module before
 * creating your client.
 */
const setReplyMentionDefault = require("discord-reply-wrapper"); // Only save this if you want to change the default.
const Discord = require("discord.js"),
  {Client} = Discord;

const client = new Client();

client.on("message", (message) => {
  // With mention
  message.reply("I am mentioning you!");

  // Without mention
  message.reply("I am not mentioning you!", false);

  // Using embeds
  message.reply({
    embed: {
      title: "This is a title"
    }
  }, false);

  // Using the custom default (original default is true).
  setMentionDefault(false);
  message.reply("I am not mentioning you!");
  setMentionDefault(true); // You can also edit the default again and again...
  message.reply("Hey! I am mentioning you again.")
});

client.login("TOKEN");
```

## Documentation

`.reply([content])`
> Replies to the message inline

| PARAMETER | TYPE | OPTIONAL | DEFAULT | DESCRIPTION |
|---|---|---|---|---|
| mention | Boolean (`true` or `false`) | Yes | `true` or<br>the set default | The option to (not) mention |
| content | [StringResolvable](https://discord.js.org/#/docs/main/stable/typedef/StringResolvable) or [APIMessage](https://discord.js.org/#/docs/main/stable/class/APIMessage) | Yes | `""` | The content for the message |
| options | [MessageOptions](https://discord.js.org/#/docs/main/stable/typedef/MessageOptions) or [MessageAdditions](https://discord.js.org/#/docs/main/stable/typedef/MessageAdditions) | Yes | `{}` | The options to provide |

## More Information
The Discord API takes a `replied_user` field, which is currently implemented as `repliedUser` in [discord.js's GitHub repository](https://github.com/discordjs/discord.js/blob/master/src/structures/APIMessage.js#L173) in their [MessageMentionOptions](https://discord.js.org/#/docs/main/stable/typedef/MessageMentionOptions).
The option to use a boolean as the first parameter to set the mention is not official, it is only for your convenience.

Default value for `repliedUser` is `true`
