import {
  ChannelType,
  PermissionFlagsBits,
  REST,
  Routes,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

const commands: (
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder
  | SlashCommandSubcommandsOnlyBuilder
)[] = [
  new SlashCommandBuilder()
    .setName("vote")
    .setDescription("uwu??")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageMessages + PermissionFlagsBits.KickMembers
    )
    .addSubcommand((input) => {
      return input
        .setName("create")
        .setDescription("uwu??")
        .addChannelOption((input) =>
          input
            .setName("where")
            .setDescription("uwu??")
            .setRequired(false)
            .addChannelTypes([ChannelType.GuildText])
        );
    }),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

try {
  console.log("Started refreshing application (/) commands.");
  console.log(commands.map((c) => c.toJSON()));
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
    body: commands.map((c) => c.toJSON()),
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
