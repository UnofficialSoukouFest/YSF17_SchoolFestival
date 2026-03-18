import fs from 'node:fs'
import matter from 'gray-matter'
import FeatureCard from '@/app/feature/feature-card'
import style from './page.module.css'
import { Titlebar } from '@/app/component/title-bar-supplier.jsx'

export const metadata = {
  title: '特集一覧 - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの非公式の特集の一覧のページです。',
}

export default async function Features() {
  const directoryFiles = await fs.promises.readdir('posts')
  const featureData = []
  for (const directoryFile of directoryFiles) {
    const content = await fs.promises.readFile(`posts/${directoryFile}`, { encoding: 'utf8' })
    let meta = matter(content)
    meta.data.link = `/feature/${directoryFile.replace(/\.md$/, '')}`
    featureData.push(meta.data)
  }
  return (
    <div>
      <div>
        <Titlebar pagename="特集" />
      </div>
      <div className={style.featureView}>
        {featureData.map(data => (
          <FeatureCard data={data} key={data.title} />
        ))}
      </div>
    </div>
  )
}
