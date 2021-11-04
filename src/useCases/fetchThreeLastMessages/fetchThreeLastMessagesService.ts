import { Message } from '../../model/Message'

class FetchThreeLastMessagesService {
    async execute() {
        const lastThreeMessages = await Message.getLastThreeMessages()

        return lastThreeMessages
    }
}

export { FetchThreeLastMessagesService }
