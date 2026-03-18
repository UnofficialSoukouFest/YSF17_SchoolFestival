import { TimetableDisplay } from './timetableElements/timetable-display.jsx'
import { PickupSlide } from './pickupSlide/pickup-slide.jsx'
import './timetableElements/timetable-action.css'
import './timetableElements/timetable-common.css'
import { Titlebar } from '@/app/component/title-bar-supplier.jsx'

export const metadata = {
  title: 'タイムテーブル - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの非公式のタイムテーブルのページです。',
}

export default function Program() {
  const now = new Date()
  const openingTime = new Date('2025-09-06T10:00+09:00')
  const closingTime_day1 = new Date('2025-09-06T10:00+15:00')
  const openingTime_day2 = new Date('2025-09-07T10:00+09:00')
  const closingTime = new Date('2025-09-07T15:00+09:00')
  const state = now < openingTime ? 'unopen' : (now < closingTime ? 'opened' : 'closed')
  let pickup_text
  if (state == 'opened') {
    pickup_text = closingTime_day1 <= now && now <= openingTime_day2 ? '各団体で次に行われるイベントをランダムに表示します！' : '9月7日(day2)に行われるイベントをランダムに表示します！'
  }
  else {
    if (now.getMonth() == 8 && now.getDate() == 6) {
      pickup_text = '9月6日(day1)に行われるイベントをランダムに表示します！'
    }
    else {
      pickup_text = state == 'unopen' ? '蒼煌祭で行われる予定のイベントをランダムに表示します！' : '第17回蒼煌祭で行われたイベントをランダムに表示します！'
    }
  }

  return (
    <div>
      <Titlebar pagename="時間割" />
      <div>
        <h2>ピックアップ</h2>
        <p>{pickup_text}</p>
        <PickupSlide />
      </div>
      <div>
        <h2>タイムテーブル</h2>
        <TimetableDisplay />
      </div>
    </div>
  )
}
