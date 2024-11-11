import { verify } from 'hono/jwt'
import { type Context } from 'hono'
import { newErrorResponse } from '@/response/response.ts'
import { env } from '@/env/load.ts'

export const jwtMiddleware = async (c: Context, next: () => Promise<void>) => {
	const token = c.req.header('Authorization')?.split(' ')[1]

	if (!token) {
		return newErrorResponse(c, 'Unauthorized', 401)
	}

	try {
		const payload = await verify(token, env.SECRET)
		c.set('payload', payload)
		return next()
	} catch {
		return newErrorResponse(c, 'Unauthorized', 401)
	}
}
