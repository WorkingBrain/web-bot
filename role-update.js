async function role_update(interaction) {
  const selected = interaction.data.values;
  console.log(selected);

  let options = [];

  await interaction.message.components[0].components[0].options.forEach(
    (element) => options.push(element.value)
  );

  const notselected = options.filter((option) => !selected.includes(option));
  console.log(notselected);

  if (notselected.length !== 0) {
    notselected.forEach(async (role) => {
      const timeout = setTimeout(async () => {
        await fetch(
          `https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${role}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bot ${process.env.token}`,
            },
          }
        );
        clearTimeout(timeout);
      }, 2000);
    });
  }

  if (selected.length !== 0) {
    selected.forEach(async (role) => {
      const timer = setTimeout(async () => {
        await fetch(
          `https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${role}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bot ${process.env.token}`,
            },
          }
        );
        clearTimeout(timer);
      }, 2000);
    });
  }

  return "ok";
}

module.exports = { role_update };
