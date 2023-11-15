import Image from 'next/image'

export default function Ex4() {
  return (
    <>
      <div className="container">
        <p className="mt-5">
          第 4 題.請根據下方示意圖，假設您要起一個專案，請規劃下方聊天室的
          component 會有幾個，然後元件的上下層關係...etc
          舉例來說，我們會將人物的頭像視為一個 component。
        </p>
        <Image src="./ex4.png" alt="ex4" width={321} height={583} />
        <ul>
          <li>ChatApp - 最上層的父組件，包含整個ChatApp的State和處理邏輯</li>
          <li>Header - 畫面中顯示訊號、時間及電量</li>
          <li>NavBar - 畫面中點擊之後能展開各種功能的menu</li>
          <li>Camera - 畫面中的相機功能</li>
          <li>Avatar - 人物頭像</li>
          <li>MessageText - 顯示用戶訊息的組件</li>
          <li>MessageContent - 用戶輸入訊息的組件</li>
          <li>SendButton - 發送訊息的按鈕</li>
          <li>Media - 點擊加號之後可以選擇要傳送相片或是影片</li>
        </ul>
      </div>
    </>
  )
}
