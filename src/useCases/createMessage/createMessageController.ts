import { Request, Response } from 'express'
import { CreateMessageService } from './createMessageService'

class CreateMessageController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { message } = req.body
        const { user_id } = req

        const createMessageService = new CreateMessageService()

        const { user, ...messageInfo } = await createMessageService.execute(message, user_id)

        return res.json({
            messageInfo,
            user
        })
    }
}

export { CreateMessageController }
