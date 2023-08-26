const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./public'))

app.set('views', './views')
app.set('view engine', 'pug')

app.get("/", async (req, res) => {
    const api_response = await fetch("https://gdscdev.vercel.app/api");
    const result = await api_response.json()
    if (!result.status) {
        res.status(503).send('could not fetch event details')
    }
    res.render('index', { conferenceList: result.content.data })
})

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;