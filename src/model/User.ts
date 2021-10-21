import { prisma } from '../database'

interface FindArgs {
    github_id: number;
}

interface UserData {
    name: string;
    login: string;
    github_id: number;
    avatar_url: string;
}

class User {
    static async find({ github_id }: FindArgs) {
        const user = await prisma.user.findFirst({
            where: { github_id }
        })

        return user
    }

    static async create({ name, login, github_id, avatar_url }: UserData) {
        const user = await prisma.user.create({
            data: {
                name,
                login,
                github_id,
                avatar_url
            }
        })

        return user
    }

    declare id: string;
    declare name: string;
    declare login: string;
    declare github_id: number;
    declare avatar_url: string;
}

export { User }
