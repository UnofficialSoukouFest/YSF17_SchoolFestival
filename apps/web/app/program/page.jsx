import { ProgramsView } from '@/app/program/programs.jsx'
import { Titlebar } from '@/app/compoent/title-bar-supplier.jsx'

export const metadata = {
  title: '企画 - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの企画についての非公式のページです。',
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function Program() {
  return (
    <div>
      <Titlebar pagename="企画一覧/検索" />
      <ProgramsView />
    </div>
  )
}
