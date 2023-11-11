import React, { useState } from 'react'
import styles from '@/styles/table.module.scss'
const TAIWAN_DISTRICTS = {
  台北市: [
    '大安區',
    '大同區',
    '士林區',
    '文山區',
    '中正區',
    '中山區',
    '內湖區',
    '北投區',
    '松山區',
    '南港區',
    '信義區',
    '萬華區',
    '臺大公館校區',
  ],
  新北市: ['板橋區', '新莊區', '中和區', '永和區', '土城區'],
  桃園市: [],
  新竹科學園區: [],
  // ... 其他縣市的行政區
}

function CitySelector() {
  const [selectedCity, setSelectedCity] = useState('')
  const [districts, setDistricts] = useState([])
  const [checkedState, setCheckedState] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const handleCityChange = (event) => {
    const city = event.target.value
    setSelectedCity(city)
    const districts = TAIWAN_DISTRICTS[city] || []
    setDistricts(districts)
    setCheckedState(
      districts.reduce((state, district) => {
        state[district] = false
        return state
      }, {})
    )
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleCheckboxChange = (event) => {
    const district = event.target.name
    setCheckedState((prevState) => ({
      ...prevState,
      [district]: !prevState[district],
    }))
  }

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked
    setCheckedState(
      districts.reduce((state, district) => {
        state[district] = isChecked
        return state
      }, {})
    )
  }

  return (
    <div>
      {/* <label htmlFor="city-select">縣市：</label> */}
      <select id="city-select" onChange={handleCityChange} value={selectedCity}>
        <option value="">請選擇縣市</option>
        {Object.keys(TAIWAN_DISTRICTS).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* <label htmlFor="search-input">搜尋：</label> */}
      <input
        type="text"
        id="search-input"
        placeholder="請輸入站點完整名稱或關鍵字"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {selectedCity && ( // 這裡添加條件判斷
        <div>
          <input
            type="checkbox"
            id="select-all-checkbox"
            onChange={handleSelectAll}
            checked={
              districts.length > 0 &&
              districts.every((district) => checkedState[district])
            }
          />
          <label htmlFor="select-all-checkbox">全部勾選</label>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <div className={`${styles.checkboxgrid}`}>
          {districts
            .filter((district) => district.includes(searchTerm))
            .map((district) => (
              <div key={district} className={`${styles.checkboxitem}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${district}`}
                  name={district}
                  checked={checkedState[district]}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`checkbox-${district}`}>{district}</label>
              </div>
            ))}
        </div>
        <div className="me-5">
          <img alt="pic" src="./Frame.png" />
        </div>
      </div>
    </div>
  )
}

export default CitySelector
