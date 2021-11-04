import { Router } from 'express'
import { AuthenticateUserController } from './useCases/authenticateUser/authenticateUserController'
import { CreateMessageController } from './useCases/createMessage/createMessageController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { FetchThreeLastMessagesController } from './useCases/fetchThreeLastMessages/fetchThreeLastMessagesController'
import { FetchMessagesController } from './useCases/fetchMessages/fetchMessagesController'

const routes = Router()

routes.get('/github', (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
})

routes.get('/signin/callback', (req, res) => {
    const { code } = req.query
    res.send(code)
})

routes.post('/authenticate', AuthenticateUserController.handle)

routes.post('/message', ensureAuthenticated, CreateMessageController.handle)

routes.get('/messages/last3', FetchThreeLastMessagesController.handle)

routes.get('/messages', FetchMessagesController.handle)

export { routes }
