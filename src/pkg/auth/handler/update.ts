import { newErrorResponse, newSuccessResponse } from '@/response/response.ts'
import { type Context } from 'hono'
import { users } from '@/database/client.ts'
import { User } from '@/pkg/auth/User.ts'

export const Update = async (c: Context) => {
    const { email } = c.get('payload')
    const user = await c.req.json()

    const updated = await users.updateOne(
        { email: email },
        { $set: user },
    )

    if (updated.modifiedCount === 0) {
        return newErrorResponse(c, 'User not updated', 500)
    }

    return newSuccessResponse(c, {})
}
