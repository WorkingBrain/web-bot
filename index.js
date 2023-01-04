const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.sendStatus(200)
})

app.post('/api', (req, res) => {
	res.sendStatus(200)
})

app.post('/api/interactions', (req, res) => {
	res.sendStatus(200)
})

app.listen("3000", () => console.log(`listening on port 3000`))
