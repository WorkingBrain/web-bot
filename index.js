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

app.post('/interactions', verifyKeyMiddleware(process.env.public_key), (req, res) => {
	const interaction = req.body
	console.log(interaction)

	if(interaction.type === 3) {
		if (interaction.data.custom_id === `verify`) {
			res.send({
				type: 5,
				data: {
					content: "Clicked"
				}
			})
		}
	}
})

app.listen("3000", () => console.log(`listening on port 3000`))
