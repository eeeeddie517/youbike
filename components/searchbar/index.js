import React from 'react'
import Select from 'react-select'
import styles from '@/components/cityselect/cityselect.module.scss'
export default function CitySelect() {
  const options = [
    { value: '新北市', label: '新北市' },
    { value: '台北市', label: '台北市' },
    { value: '桃園市', label: '桃園市' },
    { value: '新竹科學園區', label: '新竹科學園區' },
  ]
  return (
    <>
      <div>
        <Select
          options={options}
          className={`${styles.select}`}
          isMulti
          isSearchable
          placeholder="搜尋站點"
        />
      </div>
    </>
  )
}
