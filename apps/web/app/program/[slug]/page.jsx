import styles from '../slug_page.module.css'
import { TitleBarWithBack } from '@/app/compoent/title-bar.jsx'
import { parseProgramsData, solveBasePath } from '@/app/lib/index.js'
import Tags from '@/app/program/program/tags.jsx'
import ProgramSample from '@/app/program.mock.json'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params

  // fetch data
  const programs = parseProgramsData(ProgramSample)
  const program = [...programs.iter()].find(program => program.id === slug)
  return {
    title: `${program.name} - 蒼煌祭17th非公式ページ`,
    description: `蒼煌祭17thの企画「${program.name}」についての非公式のページです。`,
  }
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const programs = parseProgramsData(ProgramSample)
  return [...programs.iter()].map(program => ({ slug: program.id }))
}

/**
 *
 * @param {Promise<{ slug: string }>} params
 * @returns {Promise<React.ReactNode>}
 * @constructor
 */
export default async function Program({ params }) {
  const { slug } = await params
  const programs = parseProgramsData(ProgramSample)
  const program = [...programs.iter()].find(program => program.id === slug)

  return (
    <>
      <TitleBarWithBack pagename={program.name} />
      <Image
        src={solveBasePath(program.options.imagePath)}
        alt={program.name + ' の画像'}
        width={240}
        height={240}
        className={styles['pr-image']}
      />
      <div className={styles['pr-tags']}>
        <Tags tags={program.programType} />
      </div>
      <div className={styles['pr-content']}>
        <div className={styles['pr-subject']}>
          <h3>{program.name}</h3>
          <h3 style={{ marginLeft: 'auto' }}>
            {program.aria + '階 @' + program.location}
          </h3>
        </div>
        <div className={styles['pr-text']}>{program.prText || ''}</div>
      </div>
      {/* 地図も作りましょう */}
      <div style={{ marginTop: '1em' }}>位置を示す地図</div>
    </>
  )
}
