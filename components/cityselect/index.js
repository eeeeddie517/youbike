import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styles from './cityselect.module.scss'
export default function CitySelect({ onCitySelect }) {
  const options1 = [
    { value: '新北市', label: '新北市' },
    { value: '台北市', label: '台北市' },
    { value: '桃園市', label: '桃園市' },
    { value: '新竹科學園區', label: '新竹科學園區' },
  ]
  const [selectedCity, setSelectedCity] = useState(null)
  const [stationOptions, setStationOptions] = useState([])
  const [selectedStation, setSelectedStation] = useState(null) // 選擇的站點
  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   fetch(
  //     'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const options = data.map((station) => ({
  //         value: station.sno,
  //         label: station.sna.replace('YouBike2.0_', ''),
  //       }))
  //       setStationOptions(options)
  //     })
  //     .catch((error) =>
  //       console.error('Error fetching YouBike stations:', error)
  //     )
  //     .finally(() => setIsMounted(true))
  // }, [])

  const handleCityChange = (selectedOption) => {
    const city = selectedOption ? selectedOption.value : null
    setSelectedCity(city)
    onCitySelect(city)

    if (city === '台北市') {
      fetchStationData()
    } else {
      setStationOptions([])
      setSelectedStation(null)
    }
  }

  const fetchStationData = () => {
    fetch(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((station) => ({
          value: station.sno,
          label: station.sna.replace('YouBike2.0_', ''),
        }))
        setStationOptions(options)
      })
      .catch((error) =>
        console.error('Error fetching YouBike stations:', error)
      )
  }
  const handleStationChange = (selectedOption) => {
    // 當站點改變時，更新 selectedStation 狀態
    setSelectedStation(selectedOption)
  }
  return (
    <>
      <div className={`${styles.select}`}>
        <div className={`${styles.citywidth} me-4`}>
          {/* {isMounted && ( */}
          <Select
            options={options1}
            isClearable
            isSearchable
            placeholder="選擇縣市"
            onChange={handleCityChange}
            instanceId="city-select-instance"
          />
          {/* )} */}
        </div>
        <div className={`${styles.areawidth}`}>
          <Select
            options={stationOptions}
            value={selectedStation}
            onChange={handleStationChange}
            isClearable
            isSearchable
            placeholder="搜尋站點"
            instanceId="city-select-instance"
          />
        </div>
      </div>
    </>
  )
}
