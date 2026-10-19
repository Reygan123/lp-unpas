import fs from 'fs'
import path from 'path'

const env = process.env.VITE_APP_ENV || 'development'
const isProd = env === 'production'

const content = isProd
  ? `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Host: https://teknik.unpas.ac.id
Sitemap: https://teknik.unpas.ac.id/sitemap.xml
`
  : `# Non-production environment - block all crawlers
User-agent: *
Allow: /

Sitemap: https://teknik.unpas.ac.id/sitemap.xml
`

fs.writeFileSync(path.resolve('public/robots.txt'), content)
console.log(`robots.txt generated for env: ${env}`)