import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event,"_articles").find();
  const sitemap = new SitemapStream({
    hostname: 'https://www.alickx.top'
  })

  for (const doc of docs) {
    sitemap.write({
      url: `/articles/${doc.slug}`,
      changefreq: 'monthly'
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})
