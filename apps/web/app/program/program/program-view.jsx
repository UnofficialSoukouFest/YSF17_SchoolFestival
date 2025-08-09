import { ariaType } from '@latimeria/core'
import styles from './program-view.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { solveBasePath } from '@/app/lib/index.js'
import Tags from '@/app/program/program/tags.jsx'
import { useAtomValue } from 'jotai'
import { matchedProgramsAtom } from '@/app/program/program/atoms'

/** @type {string[]} */
const ariaOrder = Object.values(ariaType)

function groupArray(array) {
  const groups = {}
  for (const item of array) {
    if (!groups[item.aria]) {
      groups[item.aria] = []
    }
    groups[item.aria].push(item)
  }
  return Object.entries(groups).map(([aria, item]) => ({ aria, item }))
}

export default function ProgramView() {
  /** @type {import("@latimeria/core").Programs} */
  const programs = useAtomValue(matchedProgramsAtom)
  const programsArray = [...programs.iter()].sort((a, b) => ariaOrder.indexOf(a.aria) - ariaOrder.indexOf(b.aria))
  /** @type {[{aria:string , item:Program[]}]} */
  const ariaGroups = groupArray(programsArray)
  return (
    <div className={styles.list}>
      {ariaGroups.map(({ aria, item }, index) => {
        return (
          <div key={`${aria}-${index}`}>
            <h2 key={`${aria}-${index}`}>{aria || ''}</h2>
            <ol>
              {item.map((program) => {
                return (
                  <li key={program.id}>
                    <Link href={`/program/${program.id}`}>
                      <div className={styles.card}>
                        <div className={styles.cardTitle}>
                          <div className={styles.imageInCard}>
                            <Image src={solveBasePath('/latimeria_logo.png')} alt="仮企画ロゴです" fill={true} />
                          </div>
                          <div className={styles.cardDescription}>
                            <h2>{program.name}</h2>
                            <p className={styles.cardPRText}>{program.prText || ''}</p>
                            <div className={styles.cardTags}>
                              {program.optionalTag === undefined
                                ? ''
                                : program.optionalTag.map(tag => (
                                    <span key={tag} className={styles.cardTag}>
                                      #
                                      {tag}
                                    </span>
                                  ))}
                            </div>
                          </div>
                        </div>
                        <div className={styles.cardPlaceAndType}>
                          <p>
                            {program.aria}
                            @
                            {program.location}
                          </p>
                          <Tags tags={program.programType} />
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        )
      })}
    </div>
  )
}
