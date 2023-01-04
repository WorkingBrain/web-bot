const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.get('/message', async (req, res) => {
	const response = await fetch('https://discord.com/api/channels/1036555705366360117/messages', {
		method: "POST",
		headers: {
			"Authorization": `${process.env.token}`,
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
	console.log(response)
	res.sendStatus(200)
})

app.get('/interactions', (req, res) => {
	res.sendStatus(200)
})

app.listen("3000", () => console.log(`listening on port 3000`))
