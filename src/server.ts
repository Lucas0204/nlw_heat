import 'dotenv/config'
import { app } from './app'
import { Server } from 'socket.io'

const port = process.env.APP_PORT

const server = app.listen(port, () => console.log('server running...'))

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`)
})

export { server, io }
