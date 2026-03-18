import Image from 'next/image'
import styles from './bottom-sheet-program.module.css'
import { solveBasePath } from '@/app/lib'

export default function BottomSheetProgram({ program }) {
  if (!program) return (
    <></>
  )
  const imagePath = solveBasePath(program.options.imagePath ?? 'example.png')
  return (
    <div className={styles['btstp']}>
      <Image
        alt={program.name + 'のPR画像'}
        height={240}
        width={240}
        src={imagePath}
      />
      <p>{program.prText}</p>
    </div>
  )
}
