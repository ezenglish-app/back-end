import { MongoClient } from 'mongodb'
import { env } from '@/env/load.ts'

const client = new MongoClient(env.MONGODB_URI)

try {
	await client.connect()
	await client.db(env.DATABASE).command({ ping: 1 })
} catch (error) {
	console.error(`Failed to connect to MongoDB: ${error}`)
	Deno.exit(1)
}

export const db = client.db(env.DATABASE)
export const users = db.collection(env.USERS_COLLECTION)