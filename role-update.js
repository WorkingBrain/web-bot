async function role_update(interaction) {
    const selected = interaction.data.values;
    console.log(selected);
  
    let options = [];
  
    await interaction.message.components[0].components[0].options.forEach(
      (element) => options.push(element.value)
    );

    const response = await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bot ${process.env.token}`,
        }
    })

    const { roles } = await response.json() 
    
    await options.forEach(role => {
        if(roles.includes(role)) {
            roles.splice(roles.indexOf(role), 1)
        }
    })

    await selected.forEach(role => roles.push(role))

    await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            roles: roles
        })
    })

}

module.exports = { role_update };  
