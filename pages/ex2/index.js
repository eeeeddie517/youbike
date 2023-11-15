import React, { useState } from 'react'

export default function Ex2() {
  const initialPrizes = [
    { id: 1, quantity: 1, probability: 0.001 },
    { id: 2, quantity: 1, probability: 0.023 },
    { id: 3, quantity: 2, probability: 0.13 },
    { id: 4, quantity: 5, probability: 0.18 },
    { id: 5, quantity: 11, probability: 0.25 },
  ]

  const [prizes, setPrizes] = useState(initialPrizes)
  const [drawnPrizes, setDrawnPrizes] = useState([])
  const [finished, setFinished] = useState(false)

  function getRandomPrize(prizes) {
    const totalProbability = prizes
      .map((prize) => (prize.quantity > 0 ? prize.probability : 0))
      .reduce((acc, value) => acc + value, 0)

    let random = Math.random() * totalProbability

    for (let prize of prizes) {
      if (prize.quantity > 0) {
        if (random < prize.probability) {
          return prize.id
        }
        random -= prize.probability
      }
    }

    return null
  }

  const drawPrize = () => {
    if (finished) {
      alert('所有獎品已抽完！')
      return
    }

    const prizeId = getRandomPrize(prizes)

    if (prizeId !== null) {
      setPrizes((prizes) =>
        prizes.map((prize) =>
          prize.id === prizeId
            ? { ...prize, quantity: prize.quantity - 1 }
            : prize
        )
      )

      setDrawnPrizes((drawnPrizes) => [...drawnPrizes, prizeId])
    } else {
      setFinished(true)
      alert('所有獎品已抽完！')
    }
  }

  const resetGame = () => {
    setPrizes([...initialPrizes])
    setDrawnPrizes([])
    setFinished(false)
  }
  return (
    <div className="container">
      <div className="mt-5">
        <p>
          第 2 題. 抽抽樂總共有五種獎項, 1,2 獎各只有一個, 3 獎有 2 個，4 獎有 5
          個，5 獎有 11 個，請寫出一個程式可以「隨機」的取得「不重複」的禮物，
          且： 1 獎中獎機率為 0.1% 2 獎中獎機率為 2.3% 3 獎中獎機率為 13% 4
          獎中獎機率為 18% 5 獎中獎機率為 25%
        </p>
        <h1>抽抽樂</h1>
        <button onClick={drawPrize} className="me-2">
          抽獎
        </button>
        <button onClick={resetGame}>重置</button>
        <div>已抽取的獎品: {drawnPrizes.join(', ')}</div>
        <div>
          剩餘獎品:{' '}
          {prizes
            .map((prize) => `${prize.id} `.repeat(prize.quantity))
            .join('')}
        </div>
      </div>
    </div>
  )
}
