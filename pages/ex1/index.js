import React, { useState } from 'react'

export default function Ex1() {
  const [N, setN] = useState(0)
  const [sum, setSum] = useState(0)

  const calculateSum = (N) => {
    let total = 0
    const numberN = Number(N)
    let test = Math.floor((numberN - 1) / 2)
    let test2 = Math.floor(numberN / 2)

    if (numberN % 2 === 0) {
      total = 1 + numberN - test
    } else {
      total = 1 - test2
    }
    setSum(total)
  }

  return (
    <div className="container">
      <div className=" mt-5">
        <p>
          第 1 題. 寫一個函式計算下列公式之總和： 1+2-3+4-5+6-.....+ 或 - N ， N
          = 面試現場提供（N 一定是正整數）
        </p>
        <label className="me-2 mb-2">
          輸入N:
          <input
            type="number"
            value={N}
            onChange={(e) => setN(e.target.value)}
          />
        </label>
        <button onClick={() => calculateSum(N)}>計算總和</button>
        <p>總和: {sum}</p>
      </div>
    </div>
  )
}
