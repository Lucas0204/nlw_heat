import { Request, Response } from 'express'
import { AuthenticateUserService } from './authenticateUserService'

class AuthenticateUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { code } = req.body

        const authenticateUserService = new AuthenticateUserService()

        const user = await authenticateUserService.execute(code)

        return res.send(user)
    }
}

export { AuthenticateUserController }
