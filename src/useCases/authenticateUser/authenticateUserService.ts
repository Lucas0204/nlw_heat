import 'dotenv/config'
import axios, { AxiosResponse } from "axios"
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

interface AuthResponse {
    token: string;
    user: User;
}

class AuthenticateUserService {

    async execute(code: string): Promise<AuthResponse> {
        const { data } = await this.getAccessToken(code)
        const { access_token } = data 

        const { data: githubUser } = await this.getGitHubUser(access_token)

        let user = await User.getUserByGithubId(githubUser.id)

        if (!user) {
            user = await this.createUser(githubUser)
        }

        const token = this.generateToken(user)

        return { token, user }
    }

    async getAccessToken(code: string) {
        const url = 'https://github.com/login/oauth/access_token'

        const response = await axios.post<AccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                'Accept': 'application/json'
            }
        })

        return response
    }

    async getGitHubUser(accessToken: string): Promise<AxiosResponse<UserData>> {
        const response = await axios.get<UserData>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })

        return response
    }

    async createUser({ name, login, avatar_url, id }: UserData): Promise<User> {
        const user = await User.create({
            name,
            login,
            avatar_url,
            github_id: id
        })

        return user
    }

    generateToken({ name, avatar_url, id }: User): string {
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
