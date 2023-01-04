const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.get('/message', async (req, res) => {
	await fetch('https://discord.com/api/v9/channels/1036555705366360117', {
		method: "POST",
		headers: {
			"Authorization": "MTA2MDE0NDI2MTIyMTMzMDk1NA.Gg5e_K.zMahicbscxNJ2xBsH3hZj8cZGzo716CDNLioLo",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"content": "hi",
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
								"id": "null",
								"name": "✅"
							}
						}
					]
				}
			]
		})
	})
	res.sendStatus(200)
})

app.get('/interactions', (req, res) => {
	res.sendStatus(200)
})

app.listen("3000", () => console.log(`listening on port 3000`))
