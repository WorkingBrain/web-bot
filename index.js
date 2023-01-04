const express = require('express')
const fetch = require('node-fetch')
const { verifyKeyMiddleware } = require('discord-interactions')

const app = express()

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.get('/message', async (req, res) => {
	const response = await fetch('https://discord.com/api/channels/1036555705366360117/messages', {
		method: "POST",
		headers: {
			"Authorization": `Bot ${process.env.token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"content": null,
			"embeds": [
				{
					"description": "Click On the Button below to Gain Access To the Server",
					"color": 3092790
				}
			],
			"components": [
				{
					"type": 1,
					"components": [
						{
							"type": 2,
							"label": "Verify",
							"style": 1,
							"custom_id": "verify",
							"emoji": {
								"id": null,
								"name": "🔐"
							}
						}
					]
				}
			]
		})
	})
	res.send('Sent the message')
})

app.get('/message', async (req, res) => {
	const response = await fetch('https://discord.com/api/channels/1036555705366360117/messages', {
		method: "POST",
		headers: {
			"Authorization": `Bot ${process.env.token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"content": null,
			"embeds": [
				{
					"description": "Click On the Button below to Gain Access To the Server",
					"color": 3092790
				}
			],
			"components": [
				{
					"type": 1,
					"components": [
						{
							"type": 6,
							"label": "Verify",
							"style": 1,
							"custom_id": "verify",
							"emoji": {
								"id": null,
								"name": "🔐"
							}
						}
					]
				}
			]
		})
	})
	res.send('Sent the message')
})

app.post('/interactions', verifyKeyMiddleware(process.env.public_key), async (req, res) => {
	const interaction = req.body
	console.log(interaction)

	if(interaction.type === 3) {

		await fetch(`https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`, {
				method: "POST",
				headers: {
					"Authorization": `Bot ${process.env.token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					type: 5,
					data: {
						flags: 64
					}
				})
			})

		if (interaction.data.custom_id === `verify`) {

			await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/1060205348574724196`, {
				method: "PUT",
				headers: {
					"Authorization": `Bot ${process.env.token}`
				}
			})

			await fetch(`https://discord.com/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
				method: "PATCH",
				headers: {
					"Authorization": `Bot ${process.env.token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					content: "You Can Now Access the Server Channels."
				})
			})
			
		} else if (interaction.data.custom_id === `age`) {
			var role

			if(interaction.data.value[0] === `adult`) {
				role = 1060280489895788645
			} else role = 1060280539732525159

			await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${role}`, {
				method: "PUT",
				headers: {
					"Authorization": `Bot ${process.env.token}`
				}
			})
		}
		res.sendStatus(200)
	}
})

app.listen("3000", () => console.log(`listening on port 3000`))
