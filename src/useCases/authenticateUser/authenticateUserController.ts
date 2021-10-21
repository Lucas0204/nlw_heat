import { Request, Response } from 'express'
import { AuthenticateUserService } from './authenticateUserService'

class AuthenticateUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { code } = req.body

        const authenticateUserService = new AuthenticateUserService(code)

        try {
            const user = await authenticateUserService.execute()
            return res.json(user)
        } catch(err) {
            return res.json({ error: err.message })
        }
    }
}

export { AuthenticateUserController }
