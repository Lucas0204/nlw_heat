import { prisma } from '../database'
import { User } from './User';

interface NewMessageData {
    message: string;
    user_id: string;
}

class Message {
    static async create({ message, user_id }: NewMessageData) {
        const newMessage = await prisma.message.create({
            data: {
                message,
                user_id
            }, include: {
                user: true
            }
        })

        return newMessage
    }

    declare id: string;
    declare message: string;
    declare created_at: Date;
    declare user: User;
    declare user_id: string;
}

export { Message }