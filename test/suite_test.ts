import { db } from '@/database/client.ts'
import {
    signInCorrectCredentials,
    signInUserWithoutEmail,
    signInUserWithoutPassword,
    signInWrongCredentials,
    signUpCorrectUser,
    signUpUserWithoutEmail,
    signUpUserWithoutPassword,
    updateInvalidToken,
    updateMissingToken,
    updateValidToken,
} from './authUsesCases.ts'
import {
    getInvalidToken,
    getValidToken,
    getWithoutToken,
} from './vocabularyUsesCases.ts'

export type Utils = {
    token: string
}

Deno.test('tests', async (t) => {
    const utils: Utils = {
        token: '',
    }

    const collections = await db.listCollections().toArray()
    for (const collection of collections) {
        await db.collection(collection.name).drop()
    }

    await t.step(
        'POST /signup should return error when email is missing',
        async () => await signUpUserWithoutEmail(),
    )

    await t.step(
        'POST /signup should return error when password is missing',
        async () => await signUpUserWithoutPassword(),
    )

    await t.step(
        'POST /signup should return 200 when create an user',
        async () => await signUpCorrectUser(),
    )

    await t.step(
        'POST /signin should return error when email is missing',
        async () => await signInUserWithoutEmail(),
    )

    await t.step(
        'POST /signin should return error when password is missing',
        async () => await signInUserWithoutPassword(),
    )

    await t.step(
        'POST /signin should return error when credentials are wrong',
        async () => await signInWrongCredentials(),
    )

    await t.step(
        'POST /signin should return 200 when credentials are right',
        async () => await signInCorrectCredentials(utils),
    )

    await t.step(
        'POST /update should return error when token is missing',
        async () => await updateMissingToken(),
    )

    await t.step(
        'POST /update should return error when token is invalid',
        async () => await updateInvalidToken(),
    )

    await t.step(
        'POST /update should return 200 when update user',
        async () => await updateValidToken(utils.token),
    )

    await t.step(
        'GET /vocabulary should return error when token is missing',
        async () => await getWithoutToken(),
    )

    await t.step(
        'GET /vocabulary should return error when token is invalid',
        async () => await getInvalidToken(),
    )

    await t.step(
        'GET /vocabulary should return 200 when token is valid',
        async () => await getValidToken(utils.token),
    )
})
