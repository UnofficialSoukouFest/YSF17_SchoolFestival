import fs from 'node:fs'
import matter from 'gray-matter'
import { MarkdownAsync } from 'react-markdown'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'
import remarkFrontmatter from 'remark-frontmatter'
import { TitleBarWithBack } from '@/app/component/title-bar'

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params
  const path = slug + '.md'
  const content = await fs.promises.readFile(`posts/${path}`, { encoding: 'utf8' })

  // fetch data
  const { data } = matter(content)
  const pageTitle = data.title || '無題'
  return {
    title: `${pageTitle} - 蒼煌祭17th非公式ページ`,
    description: `蒼煌祭17thの非公式の特集「${pageTitle}」のページです。`,
  }
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const directoryFiles = await fs.promises.readdir('posts')
  let posts = []
  for (const path of directoryFiles) {
    const slug = path.replace(/\.md$/, '')
    posts.push({ slug })
  }
  return posts
}

/**
 *
 * @param {Promise<{ slug: string }>} params
 * @returns {Promise<React.ReactNode>}
 * @constructor
 */
export default async function Post({ params }) {
  const { slug } = await params
  const path = slug + '.md'
  const content = await fs.promises.readFile(`posts/${path}`, { encoding: 'utf8' })
  const { data } = matter(content)
  const pageTitle = data.title || '無題'
  return (
    <>
      <TitleBarWithBack backpage="/feature" pagename={pageTitle} />
      <MarkdownAsync
        remarkPlugins={[[remarkFrontmatter, { type: 'yaml', marker: '-' }], remarkGfm, remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough, remarkDirective, remarkDirectiveRehype]}
      >
        {content}
      </MarkdownAsync>
    </>
  )
}
