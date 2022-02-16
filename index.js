import { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { cyanBright } from 'colorette'

const prisma = new PrismaClient()
const app = fastify()

const port = process.env.PORT ?? 3003

app.get('/profiles', async (req) => {
  const { pageSize = 50, direction = 'next', cursor = '' } = req.query
  let profiles = []
  const params = {
    orderBy: {
      id: 'asc',
    },
  }

  params.take = direction === 'next' ? pageSize : -pageSize

  if (cursor) {
    params.skip = 1
    params.cursor = { id: cursor }
  }

  try {
    profiles = await prisma.profiles.findMany(params)
  } catch (error) {
    return { error: error.message }
  }
  return profiles
})

app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(cyanBright(`🚀 server running on port ${port}`))
})