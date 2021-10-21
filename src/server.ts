import 'dotenv/config'
import { app } from './app'

const port = process.env.APP_PORT

const server = app.listen(port, () => console.log('server running...'))
