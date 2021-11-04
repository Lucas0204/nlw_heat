import { User } from '../../model/User'

class UserProfileService {
    async execute(user_id: string) {
        const user = await User.get(user_id)

        return user
    }
}

export { UserProfileService }
