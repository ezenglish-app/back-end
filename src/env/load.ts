import { load } from '@std/dotenv'

const ENV_KEYS = {
	SECRET: 'SECRET',
	MONGODB_URI: 'MONGODB_URI',
	DATABASE: 'DATABASE',
	USERS_COLLECTION: 'USERS_COLLECTION',
}

export type Env = { [K in keyof typeof ENV_KEYS]: string }

const ENV_FILE = Deno.env.get('DENO_ENV') === 'test'
	? '../.env.test'
	: '../.env'

await load({ envPath: ENV_FILE })

function assertEnvVariables(): Env {
	type EnvKey = keyof typeof ENV_KEYS
	const missingEnvVariables = (Object.keys(ENV_KEYS) as EnvKey[])
		.filter((key) => !Deno.env.get(ENV_KEYS[key]))

	if (missingEnvVariables.length > 0) {
		console.error('Missing environment variables:', missingEnvVariables)
		Deno.exit(1)
	}

	return (Object.keys(ENV_KEYS) as EnvKey[]).reduce((acc, key) => {
		acc[key] = Deno.env.get(ENV_KEYS[key])!
		return acc
	}, {} as Env)
}

export const env: Env = assertEnvVariables()
