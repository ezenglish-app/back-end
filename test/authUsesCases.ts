import app from '../api.ts'
import { assertEquals, assertNotEquals } from '@std/assert'
import { User } from '@/pkg/auth/User.ts'
import type { Response } from '@/pkg/auth/User.ts'
import type { Utils } from './suite_test.ts'

const createTestUser = (overrides?: Partial<User>) => ({
    email: 'test@gmail.com',
    password: '123456',
    ...overrides,
})

const api = 'http://localhost:4321/auth'

export const signUpUserWithoutEmail = async () => {
    const { email, ...userWithoutEmail } = createTestUser()

    const req = new Request(`${api}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithoutEmail),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const signUpUserWithoutPassword = async () => {
    const { password, ...userWithoutPassword } = createTestUser()

    const req = new Request(`${api}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithoutPassword),
    })
    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const signUpCorrectUser = async () => {
    const user = createTestUser()

    const req = new Request(`${api}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const res = await app.request(req)
    const { data } = await res.json()
    const response: Response = data

    assertEquals(res.status, 200)
    assertEquals(response.user?.email, user.email)
    assertNotEquals(response.user?.password, user.password)
    assertNotEquals(response.token, '')
}

export const signInUserWithoutEmail = async () => {
    const { email, ...userWithoutEmail } = createTestUser()

    const req = new Request(`${api}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithoutEmail),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const signInUserWithoutPassword = async () => {
    const { password, ...userWithoutPassword } = createTestUser()

    const req = new Request(`${api}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithoutPassword),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const signInWrongCredentials = async () => {
    const req = new Request(`${api}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'test@gmail.com',
            password: '1234567',
        }),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const signInCorrectCredentials = async (utils: Utils) => {
    const user = createTestUser()

    const req = new Request(`${api}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    const res = await app.request(req)
    const { data } = await res.json()
    const response: Response = data

    assertEquals(res.status, 200)
    assertNotEquals(response.token, '')

    utils.token = response.token!
}

export const updateMissingToken = async () => {
    const user = createTestUser()

    const req = new Request(`${api}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const updateInvalidToken = async () => {
    const user = createTestUser()
    const req = new Request(`${api}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer invalid',
        },
        body: JSON.stringify(user),
    })

    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const updateValidToken = async (token: string) => {
    const req = new Request(`${api}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cards: ['123'] }),
    })

    const res = await app.request(req)

    assertEquals(res.status, 200)
}
