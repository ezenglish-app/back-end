import { Hono } from 'hono'
import { jwtMiddleware } from '@/middleware/index.ts'
import { Get } from '@/pkg/vocabulary/handler/get.ts'

const app = new Hono()

app.get('/', jwtMiddleware, Get)

export default app
