import { Message } from '../../model/Message'

interface HowManyMessages {
    take: number;
}

class FetchMessagesService {
    async execute({ take }: HowManyMessages) {
        const messages = await Message.getMessages({ take })

        return messages
    }
}

export { FetchMessagesService }
