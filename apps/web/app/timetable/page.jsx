import { TimetableDisplay } from "./timetableElements/timetableDisplay";
import { PickupSlide } from "./pickupSlide/pickupSlide";

export const metadata = {
  title: "蒼煌祭17th非公式ページ｜タイムテーブル",
  description: "蒼煌祭17thの非公式のタイムテーブルのページです。",
};

export default function Program() {
  const now = new Date();
  const openingTime = new Date("2025-09-06T10:00+09:00");
  const closingTime_day1 = new Date("2025-09-06T10:00+15:00");
  const openingTime_day2 = new Date("2025-09-07T10:00+09:00");
  const closingTime = new Date("2025-09-07T15:00+09:00");
  const state = now < openingTime ? "unopen" : now < closingTime ? "opened" : "closed";
  let pickup_text;
  if (state == "opened") {
    if (closingTime_day1 <= now && now <= openingTime_day2) {
      pickup_text = "各団体で次に行われるイベントをランダムに表示します！";
    }
    else {
      pickup_text = "9月7日(day2)に行われるイベントをランダムに表示します！";
    }
  }
  else {
    if (now.getMonth() == 8 && now.getDate() == 6) {
      pickup_text = "9月6日(day1)に行われるイベントをランダムに表示します！";
    }
    else {
      if (state == "unopen") {
        pickup_text = "蒼煌祭で行われる予定のイベントをランダムに表示します！";
      }
      else {
        pickup_text = "第17回蒼煌祭で行われたイベントをランダムに表示します！";
      }
    }
  }

  return (
    <div>
      <h1>時間割</h1>
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
  );
}
