"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
/* eslint-disable no-unsafe-optional-chaining */
const common_tags_1 = require("common-tags");
const discord_js_1 = require("discord.js");
const emojis_json_1 = __importDefault(require("../../config/json/emojis.json"));
const LoggerUtils_1 = require("../modules/LoggerUtils");
class DiscordLogger {
    constructor(channel, events, client) {
        this.channel = channel;
        this.events = events;
        this.client = client;
        this.init();
    }
    init() {
        if (this.events.length === 0)
            throw new Error('No events provided.');
        if (!this.channel)
            throw new Error('No channel provided.');
        const channel = this.client.channels.cache.get(this.channel);
        this.client.once(discord_js_1.Events.ClientReady, () => {
            (0, LoggerUtils_1.logWithLabel)('multihub', [
                `Discord Logger has been initialized with the following events:`,
                chalk_1.default.grey(console.table(this.events.map((event) => ({ event, status: 'Enabled' })))),
            ].join('\n'));
        });
        for (const event of this.events) {
            switch (event) {
                case 'AutoModerationActionExecution':
                    {
                        this.client.on(discord_js_1.Events.AutoModerationActionExecution, async (action) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'AutoModeration Action - Log System',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setFields({
                                name: 'AutoModeration Action - Information',
                                value: (0, common_tags_1.stripIndent) `
         > **Type Rule:** ${action.ruleTriggerType}
         > **Rule ID:** ${action.ruleId}
         > **User:** ${action.user?.tag} (${action.user?.id})
         > **User ID:** ${action.userId}
         `,
                                inline: false,
                            }, {
                                name: 'AutoModeration Action - Message',
                                value: (0, common_tags_1.stripIndent) `
         > **Message:** ${action.matchedContent}
         > **Channel:** ${action.channel?.name} (${action.channel?.id})
         > **Link:** [Click here](https://discord.com/channels/${action.guild.id}/${action.channel?.id}/${action.messageId})
         `,
                                inline: false,
                            }, {
                                name: 'AutoModeration Action - Guild',
                                value: (0, common_tags_1.stripIndent) `
            > **Guild:** ${action.guild.name} (${action.guild.id})
            > **Owner:** ${(0, discord_js_1.userMention)(action.guild.ownerId)} (${action.guild.ownerId})
            `,
                                inline: false,
                            }, {
                                name: 'AutoModeration Action - Date',
                                value: (0, common_tags_1.stripIndent) `
            > **Date:** ${new Date().toLocaleString()}
            > **Timezone:** ${Intl.DateTimeFormat().resolvedOptions().timeZone}
            > **Timestamp:** ${Date.now()}
            > **Action ID:** ${action.alertSystemMessageId}
            `,
                                inline: false,
                            }, {
                                name: 'AutoModeration Action - Content',
                                value: (0, common_tags_1.stripIndent) `
            > **Content:**
            ${(0, discord_js_1.codeBlock)('js', action.content)}
            `,
                                inline: false,
                            });
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'MessageUpdate':
                    {
                        this.client.on(discord_js_1.Events.MessageUpdate, async (oldMessage, newMessage) => {
                            if (!oldMessage.guild || !newMessage.guild || !oldMessage.channel || !newMessage.channel)
                                return;
                            if (oldMessage.author?.bot || newMessage.author?.bot)
                                return;
                            if (oldMessage.content === newMessage.content)
                                return;
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Message Update - Logs Systems',
                                iconURL: newMessage.author?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setFooter({
                                text: `Author: ${newMessage.author?.tag} | Id: ${newMessage.author?.id}`,
                                iconURL: newMessage.author?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Author - Information',
                                value: (0, common_tags_1.stripIndent) `
               > **Username:** ${newMessage.author?.username}
               > **Tag:** ${newMessage.author?.tag}
               > **Id:** ${newMessage.author?.id}
               > **Joined At:** ${newMessage.author?.createdAt.toLocaleString()}
            `,
                                inline: true,
                            }, {
                                name: 'Message - Information',
                                value: (0, common_tags_1.stripIndent) `
               > **Channel:** ${newMessage.channel}
               > **Message Link:** [Click Here](${newMessage.url})
               > **Date:** ${newMessage.createdAt.toLocaleString()}
               > **Event:** messageUpdate
            `,
                                inline: true,
                            }, {
                                name: 'Content - Original',
                                value: `\`\`\`\n${oldMessage.content ? oldMessage.content.replace(/`/g, "'") : 'UNKNOWN CONTENT'}\n\`\`\``,
                                inline: false,
                            }, {
                                name: 'Content - New',
                                value: `\`\`\`\n${newMessage.content ? newMessage.content.replace(/`/g, "'") : 'UNKNOWN CONTENT'}\n\`\`\``,
                                inline: false,
                            }, {
                                name: 'Attachments - URL(s)',
                                value: `>>> ${[...newMessage.attachments?.values()].map((x) => x.proxyURL).join('\n\n')
                                    ? [...newMessage.attachments?.values()].map((x) => x.proxyURL).join('\n\n')
                                    : `${emojis_json_1.default.error} No Attachments`}`,
                                inline: false,
                            });
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'AutoModerationRuleCreate':
                    {
                        this.client.on(discord_js_1.Events.AutoModerationRuleCreate, async (rule) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'AutoModeration Create - Log System',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setFields({
                                name: 'AutoModeration Rule - Information',
                                value: (0, common_tags_1.stripIndent) `
               > **Name:** ${rule.name}
               > **ID:** ${rule.id}
               > **Type Rule:** ${rule.eventType}
               > **Action:** ${rule.actions.join(', ')}
               > **Enabled:** ${rule.enabled ? emojis_json_1.default.correct : emojis_json_1.default.error}
               __**Channels and Roles Exceptions**__\n
               > **Channels:** ${rule.exemptChannels.map((channel) => `<#${channel}>`).join(', ') || 'None'}
               > **Roles:** ${rule.exemptRoles.map((role) => `<@&${role}>`).join(', ') || 'None'}
            `,
                                inline: false,
                            }, {
                                name: 'Author - Information',
                                value: (0, common_tags_1.stripIndent) `
               > **Name:** ${rule.guild.members.cache.get(rule.creatorId)?.user.username}
               > **ID:** ${rule.creatorId}
               > **Permissions:** ${rule.guild.members.cache.get(rule.creatorId)?.permissions.toArray().join(', ') || 'None'}
               > **Roles:** ${rule.guild.members.cache
                                    .get(rule.creatorId)
                                    ?.roles.cache.map((role) => `<@&${role.id}>`)
                                    .join(', ') || 'None'}
            `,
                                inline: false,
                            });
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildMemberRemove':
                    {
                        this.client.on(discord_js_1.Events.GuildMemberRemove, async (member) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Member Leave - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setFooter({
                                text: `Events - Member Leave | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setThumbnail(member.user.displayAvatarURL({ forceStatic: true }))
                                .setTimestamp()
                                .addFields({
                                name: 'Member - Information',
                                value: (0, common_tags_1.stripIndent) `
               > **Username:** ${member.user.username}
               > **ID:** ${member.id}
               > **Joined At:** <t:${Math.floor(member.joinedTimestamp ? member.joinedTimestamp / 1000 : Date.now() / 1000)}:R>
               > **Created At:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
               > **Left At:** <t:${Math.floor(Date.now() / 1000)}:R>
               > **Time Spent:** ${Math.floor((Date.now() - (member.joinedTimestamp ? member.joinedTimestamp : Date.now())) / 1000 / 60 / 60 / 24)} days
               > **Avatar:** [Click Here](${member.user.displayAvatarURL({ forceStatic: true, extension: 'png' })})
               > **Administrator:** ${member.permissions.has('Administrator') ? emojis_json_1.default.correct : emojis_json_1.default.error}
            `,
                                inline: false,
                            });
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildMemberAdd':
                    {
                        this.client.on(discord_js_1.Events.GuildMemberAdd, async (member) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: `Member Joined | ${member.user.tag}`,
                                iconURL: member.user.displayAvatarURL({ forceStatic: true }) || undefined,
                            })
                                .addFields({
                                name: 'Guild Join - Info',
                                value: (0, common_tags_1.stripIndent) `
                    > **Members:** ${member.guild.memberCount}
                    > **Added By:** ${member.user.bot ? 'Bot' : 'User'}
                    > **Owner:** ${member.guild.ownerId === member.user.id ? 'Yes' : 'No'}
                    > **Inviter:** ${member.guild.ownerId === member.user.id ? 'N/A' : 'Unknown'}
                    > **Date Join:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>
                `,
                                inline: true,
                            }, {
                                name: 'Member - Info',
                                value: (0, common_tags_1.stripIndent) `
                    > **Created At:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
                    > **Joined At:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>
                    > **ID:** ${member.user.id}
                    > **Tag:** ${member.user.tag}
                    > **Roles:** ${member.roles.cache.size} roles
                `,
                            })
                                .setThumbnail(member.user.displayAvatarURL({ forceStatic: true }))
                                .setFooter({
                                text: `ID: ${member.user.id}`,
                                iconURL: member.user.displayAvatarURL({ forceStatic: true }) || undefined,
                            })
                                .setColor('Random')
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'ChannelDelete':
                    {
                        this.client.on(discord_js_1.Events.ChannelDelete, async (_channel) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Channel Delete - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Channel - Information',
                                value: (0, common_tags_1.stripIndent) `
                  > **Name:** ${_channel.name}
                  > **Type:** ${_channel.type}
                  > **ID:** ${_channel.id}
               `,
                                inline: true,
                            }, {
                                name: 'Channel - Permissions',
                                value: (0, common_tags_1.stripIndent) `
                  > **Viewable:** ${_channel.viewable ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Manageable:** ${_channel.manageable ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Permissions Locked:** ${_channel.permissionsLocked ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **NSFW:** ${_channel.nsfw ? emojis_json_1.default.correct : emojis_json_1.default.error}
               `,
                            })
                                .setFooter({
                                text: `Events - Channel Delete | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'ChannelCreate':
                    {
                        this.client.on(discord_js_1.Events.ChannelCreate, async (_channel) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Channel Create - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Channel - Information',
                                value: (0, common_tags_1.stripIndent) `
                  > **Name:** ${_channel.name}
                  > **Type:** ${_channel.type}
                  > **ID:** ${_channel.id}
                  > **Created At:** <t:${Math.floor(_channel.createdTimestamp / 1000)}:R>
               `,
                                inline: true,
                            }, {
                                name: 'Channel - Permissions',
                                value: (0, common_tags_1.stripIndent) `
                  > **Viewable:** ${_channel.viewable ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Manageable:** ${_channel.manageable ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Permissions Locked:** ${_channel.permissionsLocked ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **NSFW:** ${_channel.nsfw ? emojis_json_1.default.correct : emojis_json_1.default.error}
               `,
                            })
                                .setFooter({
                                text: `Events - Channel Create | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildEmojiCreate':
                    {
                        this.client.on(discord_js_1.Events.GuildEmojiCreate, async (emoji) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Emoji Create - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Emoji - Information',
                                value: (0, common_tags_1.stripIndent) `
                  > **Name:** ${emoji.name}
                  > **ID:** ${emoji.id}
                  > **Created At:** <t:${Math.floor(emoji.createdTimestamp / 1000)}:R>
                  > **Identifier:** ${emoji.identifier}
               `,
                                inline: true,
                            }, {
                                name: 'Emoji - Permissions',
                                value: (0, common_tags_1.stripIndent) `
                  > **Animated:** ${emoji.animated ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Managed:** ${emoji.managed ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Requires Colons:** ${emoji.requiresColons ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **URL:** [Click Here](${emoji.imageURL({ extension: 'png' })})
               `,
                            })
                                .setFooter({
                                text: `Events - Emoji Create | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildRoleCreate':
                    {
                        this.client.on(discord_js_1.Events.GuildRoleCreate, async (role) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Role Create - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Role - Information',
                                value: (0, common_tags_1.stripIndent) `
                  > **Name:** ${role.name}
                  > **ID:** ${role.id}
                  > **Created At:** <t:${Math.floor(role.createdTimestamp / 1000)}:R>
                  > **Position:** ${role.position} / ${role.guild.roles.cache.size}
               `,
                                inline: true,
                            }, {
                                name: 'Role - Permissions',
                                value: (0, common_tags_1.stripIndent) `
                  > **Managed:** ${role.managed ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Mentionable:** ${role.mentionable ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Hoisted:** ${role.hoist ? emojis_json_1.default.correct : emojis_json_1.default.error}
                  > **Hex Color:** ${role.hexColor}
               `,
                            })
                                .setFooter({
                                text: `Event - roleCreate | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildRoleDelete':
                    {
                        this.client.on(discord_js_1.Events.GuildRoleDelete, async (role) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Role Delete - Log Systems',
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'Role - Information',
                                value: (0, common_tags_1.stripIndent) `
                  > **Name:** ${role.name}
                  > **ID:** ${role.id}
                  > **Created At:** <t:${Math.floor(role.createdTimestamp / 1000)}:R>
               `,
                                inline: true,
                            }, {
                                name: 'Member - Executable',
                                value: (0, common_tags_1.stripIndent) `
                  > **Members:** ${role.members.size}
                  > **Position:** ${role.position}
                  > **Color:** ${role.hexColor}
               `,
                            })
                                .setFooter({
                                text: `Event roleDelete | Asistent Logs`,
                                iconURL: this.client.user?.displayAvatarURL({ forceStatic: true }),
                            })
                                .setTimestamp();
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
                case 'GuildRoleUpdate':
                    {
                        this.client.on(discord_js_1.Events.GuildRoleUpdate, async (oldRole, newRole) => {
                            if (newRole.color !== oldRole.color) {
                                const embed = new discord_js_1.EmbedBuilder()
                                    .setAuthor({
                                    name: 'Role Update - Log System',
                                    iconURL: newRole.guild.iconURL(),
                                })
                                    .setDescription(`${emojis_json_1.default.correct} The color of the role **${newRole.name}** has been updated`)
                                    .setFields({
                                    name: '**__Information About The Role__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Role ID:** ${(0, discord_js_1.roleMention)(newRole.id)} ${newRole.id}
                    > **Role New Color:** ${newRole.hexColor}
                    > **Role Old Color:** ${oldRole.hexColor}
                    `,
                                    inline: false,
                                }, {
                                    name: '**__Information About The Guild__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Guild Name:** ${newRole.guild.name}
                    > **Guild ID:** ${newRole.guild.id}
                    > **Guild Owner:** ${(0, discord_js_1.userMention)(newRole.guild.ownerId)}
                    `,
                                    inline: false,
                                })
                                    .setFooter({
                                    text: `Event Role Update - Asistent Logs`,
                                    iconURL: newRole.guild.iconURL(),
                                });
                                channel.send({ embeds: [embed] }).catch(() => { });
                            }
                            if (newRole.permissions.bitfield > oldRole.permissions.bitfield) {
                                const embed = new discord_js_1.EmbedBuilder()
                                    .setAuthor({
                                    name: 'Role Update - Log System',
                                    iconURL: newRole.guild.iconURL(),
                                })
                                    .setDescription(`${emojis_json_1.default.correct} The role **${newRole.name}** has been removed permissions`)
                                    .setFields({
                                    name: '**__Information About The Role__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Role ID:** ${(0, discord_js_1.roleMention)(newRole.id)} ${newRole.id}
                    > **Role Position:** ${newRole.position}
                    `,
                                    inline: false,
                                }, {
                                    name: '**__Information About The Guild__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Guild Name:** ${newRole.guild.name}
                    > **Guild ID:** ${newRole.guild.id}
                    `,
                                    inline: false,
                                }, {
                                    name: '**__Permissions Removed__**',
                                    value: newRole.permissions
                                        .toArray()
                                        .map((perm, index) => `> \`No.${index + 1}\` - ${perm}`)
                                        .join('\n'),
                                    inline: false,
                                })
                                    .setFooter({
                                    text: `Event Role Update - Asistent Logs`,
                                    iconURL: newRole.guild.iconURL(),
                                });
                                channel.send({ embeds: [embed] }).catch(() => { });
                            }
                            if (newRole.permissions.bitfield < oldRole.permissions.bitfield) {
                                const embed = new discord_js_1.EmbedBuilder()
                                    .setAuthor({
                                    name: 'Role Update - Log System',
                                    iconURL: newRole.guild.iconURL(),
                                })
                                    .setDescription(`${emojis_json_1.default.error} The role **${newRole.name}** has been added permissions`)
                                    .setFields({
                                    name: '**__Information About The Role__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Role ID:** ${(0, discord_js_1.roleMention)(newRole.id)} ${newRole.id}
                    > **Role Position:** ${newRole.position}
                    `,
                                    inline: false,
                                }, {
                                    name: '**__Information About The Guild__**',
                                    value: (0, common_tags_1.stripIndent) `
                    > **Guild Name:** ${newRole.guild.name}
                    > **Guild ID:** ${newRole.guild.id}
                    `,
                                    inline: false,
                                }, {
                                    name: '**__Permissions Added__**',
                                    value: oldRole.permissions
                                        .toArray()
                                        .map((perm, index) => `> \`No.${index + 1}\` - ${perm}`)
                                        .join('\n'),
                                    inline: false,
                                })
                                    .setFooter({
                                    text: `Event Role Update - Asistent Logs`,
                                    iconURL: newRole.guild.iconURL(),
                                });
                                channel.send({ embeds: [embed] }).catch(() => { });
                            }
                        });
                    }
                    break;
                case 'InviteCreate':
                    {
                        this.client.on(discord_js_1.Events.InviteCreate, async (invite) => {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setAuthor({
                                name: 'Invite Create - Manager Logs',
                                iconURL: invite.guild?.iconURL({ forceStatic: true }),
                            })
                                .addFields({
                                name: 'General - Information',
                                value: (0, common_tags_1.stripIndent) `
					      > **Creator:** ${invite.inviter?.tag} (\`${invite.inviter?.id}\`)
					      > **Channel:** ${invite.channel?.toString()} (\`${invite.channel?.id}\`)
					      > **Code:** ${invite.code}
				        `,
                                inline: true,
                            }, {
                                name: 'Invite - Information',
                                value: (0, common_tags_1.stripIndent) `
					      > **URL:** [Click Here](${invite.url})
					      > **Created At:** ${typeof invite.createdAt === 'number'
                                    ? `<t:${Math.floor(Number(invite.createdAt) / 1000)}:R>`
                                    : 'Unknown'}
					      > **Expires At:** ${typeof invite.expiresAt === 'number'
                                    ? `<t:${Math.floor(Number(invite.expiresAt) / 1000)}:R>`
                                    : 'Unknown'}
                `,
                            });
                            channel.send({ embeds: [embed] }).catch(() => { });
                        });
                    }
                    break;
            }
        }
    }
}
exports.DiscordLogger = DiscordLogger;
//# sourceMappingURL=DiscordLogger.js.map