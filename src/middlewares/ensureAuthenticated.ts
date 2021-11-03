import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
    sub: string;
}

export const ensureAuthenticated = 
    (req: Request, res: Response, next: NextFunction) => {
        const authToken = req.headers.authorization

        if (!authToken) {
            return res.status(401).json({
                error: 'Invalid token!'
            })
        }

        const token = authToken.split(' ')[1]

        try {
            const { sub } = verify(token, process.env.JWT_SECRET) as TokenPayload
            req.user_id = sub

            return next()
        } catch(err) {
            return res.status(400).json({
                error: err.message
            })
        }
    }
