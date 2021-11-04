import { Request, Response } from 'express'
import { FetchThreeLastMessagesService } from './fetchThreeLastMessagesService'

class FetchThreeLastMessagesController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const service = new FetchThreeLastMessagesService()

        const messages = await service.execute()

        return res.json(messages)
    }
}

export { FetchThreeLastMessagesController }
