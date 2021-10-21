import express, { Request, Response, NextFunction } from 'express'
import 'express-async-error'
import { routes } from './routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.json({
            error: err.message
        })
    }

    return res.status(500).json({
        error: 'Internal server error!'
    })
})

export { app }
