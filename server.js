const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000
let id;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    const randomInt = getRndNumber()
    res.redirect(randomInt)
})

app.get('/:id',(req,res)=>{
    id = req.params.id;
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    if(id){
        socket.on(id, (msg) => {
            console.log('messsage send')
            socket.broadcast.emit(id, msg)
        })
    }else{
        console.log('no msg')
    }
})

//generate random number
function getRndNumber(min=1000, max=99999) {
    const rnd = Math.floor(Math.random() * (max - min + 1) ) + min;
    return rnd;
}
