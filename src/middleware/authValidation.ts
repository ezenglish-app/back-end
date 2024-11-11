import type { Context } from 'hono'
import { z } from 'zod'
import { newErrorResponse } from '@/response/response.ts'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const authValidationMiddleware = async (
    c: Context,
    next: () => Promise<void>,
) => {
    const parseResult = schema.safeParse(await c.req.json())
    if (!parseResult.success) {
        return newErrorResponse(c, parseResult.error.errors[0].message, 400)
    }

    c.set('user', parseResult.data)
    return next()
}
