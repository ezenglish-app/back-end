import app from './api.ts'

Deno.serve({ port: 4321 }, app.fetch)
