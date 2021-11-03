import { Message } from '../../model/Message'

class CreateMessageService {
    async execute(message: string, user_id: string): Promise<Message> {
        const newMessage = await Message.create({ message, user_id })

        return newMessage
    }
}

export { CreateMessageService }
