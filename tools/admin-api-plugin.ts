import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

const root = process.cwd()
const paths = {
  content: resolve(root, 'src/data/content.json'),
  team: resolve(root, 'src/data/team.json'),
  blog: resolve(root, 'src/data/blog.json'),
  uploadsDir: resolve(root, 'public/uploads'),
}

function readJson(path: string) {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function writeJson(path: string, data: unknown) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolvePromise(data))
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        const url = req.url.split('?')[0]

        try {
          if (url === '/api/content' && req.method === 'GET') {
            return sendJson(res, 200, readJson(paths.content))
          }
          if (url === '/api/content' && req.method === 'PUT') {
            writeJson(paths.content, JSON.parse(await readBody(req)))
            return sendJson(res, 200, { ok: true })
          }
          if (url === '/api/team' && req.method === 'GET') {
            return sendJson(res, 200, readJson(paths.team))
          }
          if (url === '/api/team' && req.method === 'PUT') {
            writeJson(paths.team, JSON.parse(await readBody(req)))
            return sendJson(res, 200, { ok: true })
          }
          if (url === '/api/blog' && req.method === 'GET') {
            return sendJson(res, 200, readJson(paths.blog))
          }
          if (url === '/api/blog' && req.method === 'PUT') {
            writeJson(paths.blog, JSON.parse(await readBody(req)))
            return sendJson(res, 200, { ok: true })
          }
          if (url === '/api/upload' && req.method === 'POST') {
            const { filename, dataUrl } = JSON.parse(await readBody(req)) as {
              filename?: string
              dataUrl?: string
            }
            if (!filename || !dataUrl) return sendJson(res, 400, { error: 'filename and dataUrl required' })
            const match = /^data:(.+);base64,(.*)$/.exec(dataUrl)
            if (!match) return sendJson(res, 400, { error: 'invalid data URL' })
            const buffer = Buffer.from(match[2], 'base64')
            if (!existsSync(paths.uploadsDir)) mkdirSync(paths.uploadsDir, { recursive: true })
            const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`
            writeFileSync(resolve(paths.uploadsDir, safeName), buffer)
            return sendJson(res, 200, { url: `/uploads/${safeName}` })
          }
          return sendJson(res, 404, { error: 'not found' })
        } catch (err) {
          return sendJson(res, 500, { error: err instanceof Error ? err.message : 'unknown error' })
        }
      })
    },
  }
}
