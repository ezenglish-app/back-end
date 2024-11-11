import app from '../api.ts'
import { assertEquals, assertNotEquals } from '@std/assert'

const api = 'http://localhost:4321/vocabulary'

export const getWithoutToken = async () => {
    const req = new Request(`${api}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const getInvalidToken = async () => {
    const req = new Request(`${api}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer invalidToken',
        },
    })
    const res = await app.request(req)

    assertNotEquals(res.status, 200)
}

export const getValidToken = async (token: string) => {
    const req = new Request(`${api}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const res = await app.request(req)
    const { data } = await res.json()

    assertEquals(res.status, 200)
    assertNotEquals(data, [])
}
