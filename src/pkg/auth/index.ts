import { Hono } from 'hono'
import { SignIn, SignUp, Update } from './handler/index.ts'
import { authValidationMiddleware, jwtMiddleware } from '@/middleware/index.ts'

const app = new Hono()

app.post('/signup', authValidationMiddleware, SignUp)
app.post('/signin', authValidationMiddleware, SignIn)
app.post('/update', jwtMiddleware, Update)

export default app
