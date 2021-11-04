import { Request, Response } from 'express'
import { FetchMessagesService } from './fetchMessagesService'

class FetchMessagesController {
    static async handle(req: Request, res: Response): Promise<Response> {
        let take: any = req.query.take

        if (take) {
            take = parseInt(take.toString())
        } else {
            take = 3
        }

        const fetchMessagesService = new FetchMessagesService()
        const messages = await fetchMessagesService.execute({ take })

        return res.json(messages)
    }
}

export { FetchMessagesController }
