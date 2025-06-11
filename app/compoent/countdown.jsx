"use client";
import { useState } from "react";

export function Countdown(){
  const now = new Date();
  const openingTime = new Date("2025-09-06T10:00+09:00");
  const closingTime = new Date("2025-09-07T15:00+09:00")
  const gap = (openingTime.getTime() - now.getTime()) / 1000;
  const [timeInfo,setTimeInfo] = useState({
      times:[
        Math.floor(gap/(60*60*24)),
        Math.floor(gap/(60*60) % 24),
        Math.floor(gap/(60) % 60),
        Math.floor(gap % 60)],
      state:"unopen"
    });

  const change_text = ()=>{
    const times = [
      Math.floor(gap/(60*60*24)),
      Math.floor(gap/(60*60) % 24),
      Math.floor(gap/(60) % 60),
      Math.floor(gap % 60)];
    const state = now < openingTime ? "unopen" :
    (now < closingTime ? "opened" : "closed");
    setTimeInfo({"times":times, "state":state});
  }
  
  setTimeout(change_text, 1000);
  let content;
  if(timeInfo.state == "unopen"){
    content = 
      <div id="countdown_display">
        <span>{timeInfo.times[0]}</span>日　
        <span>{timeInfo.times[1]}</span>時間　
        <span>{timeInfo.times[2]}</span>分　
        <span>{timeInfo.times[3]}</span>秒
      </div>;
  }
  else if(timeInfo.state == "opened"){
    content = <div id="countdown_display"><span>開催中です！</span></div>;
  }
  else{
    content = 
    <div id="countdown_display">
      <span>第17回蒼煌祭は終了しました</span>
      <p>多くの方々のご来場ありがとうございました！</p>
    </div>;
  }

  return(content);
}