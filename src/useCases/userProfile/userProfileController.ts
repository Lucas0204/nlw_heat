import { Request, Response } from 'express'
import { UserProfileService } from './userProfileService'

class UserProfileController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req
        
        const userProfileService = new UserProfileService()

        const { messages, ...user } = await userProfileService.execute(user_id)

        return res.json({ user, messages })
    }
}

export { UserProfileController }
