import Link from 'next/link'
import fs from 'node:fs'
import matter from 'gray-matter'
import HomeArticleBox from './home-article-box.jsx'
import { MdArrowForwardIos } from 'react-icons/md'
import styles from './home-article-display.module.css'

export default async function HomeArticleDisplay() {
  const directoryFiles = await fs.promises.readdir('posts')
  const featureData = []
  for (const directoryFile of directoryFiles) {
    const content = await fs.promises.readFile(`posts/${directoryFile}`, { encoding: 'utf8' })
    let meta = matter(content)
    meta.data.link = `/feature/${directoryFile.replace(/\.md$/, '')}`
    featureData.push(meta.data)
  }
  const display_articlesIndex = [0, 1, 0]
  const articles = display_articlesIndex.map(x => <HomeArticleBox data={featureData[x]} key={featureData[x].title} />)

  return (
    <div className={styles.displayBox}>
      <div>
        {articles}
      </div>
      <Link className={styles.viewMore} href="/feature" style={{ color: 'gray' }}>
        {`もっと見る(全${articles.length}件)`}
        <MdArrowForwardIos />
      </Link>
    </div>
  )
}
