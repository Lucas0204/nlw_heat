import { Message } from '../../model/Message'
import { io } from '../../server'

class CreateMessageService {
    async execute(message: string, user_id: string): Promise<Message> {

        try {
            const newMessage = await Message.create({ message, user_id })

            io.emit('new_message', newMessage)

            return newMessage
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

export { CreateMessageService }
