const express = require('express')
const app = express()
const PORT = 3000

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

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})