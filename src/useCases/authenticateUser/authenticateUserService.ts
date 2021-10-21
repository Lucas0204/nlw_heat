import 'dotenv/config'
import axios from "axios"
import { User } from '../../model/User'
import { sign } from 'jsonwebtoken'

interface AccessTokenResponse {
    access_token: string;
}

interface UserData {
    id: number;
    name: string;
    login: string;
    avatar_url: string;
}

class AuthenticateUserService {
    public code: string;
    constructor(code: string) {
        this.code = code
    }

    async execute(): Promise<string> {
        const { data } = await this.getAccessToken()
        const { access_token } = data 

        const { data: userData } = await this.getGitHubUser(access_token)

        let user = await User.find({ github_id: userData.id })

        if (!user) {
            user = await this.createUser(userData)
        }

        const token = this.generateToken(user)

        return token
    }

    async getAccessToken() {
        const url = 'https://github.com/login/oauth/access_token'

        const response = await axios.post<AccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: this.code
            },
            headers: {
                'Accept': 'application/json'
            }
        })

        return response
    }

    async getGitHubUser(accessToken: string) {
        const response = await axios.get<UserData>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        return response
    }

    async createUser({ name, login, avatar_url, id }: UserData) {
        const user = await User.create({
            name,
            login,
            avatar_url,
            github_id: id
        })

        return user
    }

    generateToken({ name, avatar_url, id }: User) {
        const token = sign(
            {
                user: {
                    name,
                    avatar_url,
                    id
                }
            }, 
            process.env.JWT_SECRET,
            {
                subject: id,
                expiresIn: '1d'
            }
        )

        return token
    }
}

export { AuthenticateUserService }
