import { useState } from 'react'
import styles from '@/styles/stations-list.module.scss'
import ReactPaginate from 'react-paginate'
import NavBar from '@/components/navbar'
import CitySelect from '@/components/cityselect'
import Image from 'next/image'
export default function Home() {
  const [bikeData, setBikeData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [checkedAreas, setCheckedAreas] = useState({})
  const [selectAll, setSelectAll] = useState(true) // 全選

  // 添加分頁狀態
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  const handleCitySelect = (city) => {
    if (city === '台北市') {
      fetchBikeData()
    } else {
      setBikeData([])
      setFilteredData([])
      setPageCount(0)
      setCheckedAreas({})
    }
  }

  const fetchBikeData = () => {
    fetch(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setBikeData(data)
        setFilteredData(data.slice(0, itemsPerPage)) // 初始化顯示第一頁
        setPageCount(Math.ceil(data.length / itemsPerPage))

        const areas = {}
        data.forEach((item) => {
          areas[item.sarea] = true
        })
        setCheckedAreas(areas)
        setSelectAll(true)
      })
  }

  // 處理分頁頁碼變化
  const handlePageClick = (event) => {
    const newPage = event.selected
    const newPageItems = bikeData.slice(
      newPage * itemsPerPage,
      (newPage + 1) * itemsPerPage
    )
    setCurrentPage(newPage)
    setFilteredData(newPageItems)
  }

  const updateDataAndPagination = (data) => {
    setFilteredData(data.slice(0, itemsPerPage)) // 只顯示新數據的第一頁
    setPageCount(Math.ceil(data.length / itemsPerPage))
    setCurrentPage(0) // 重置回第一頁
  }

  const handleCheckboxChange = (sarea) => {
    const updatedCheckedAreas = {
      ...checkedAreas,
      [sarea]: !checkedAreas[sarea],
    }
    setCheckedAreas(updatedCheckedAreas)

    // 更新selectAll狀態
    const areAllChecked = Object.values(updatedCheckedAreas).every((v) => v)
    setSelectAll(areAllChecked)

    const activeAreas = Object.keys(updatedCheckedAreas).filter(
      (area) => updatedCheckedAreas[area]
    )

    const newData =
      activeAreas.length > 0
        ? bikeData.filter((item) => activeAreas.includes(item.sarea))
        : []

    updateDataAndPagination(newData)
  }

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const newCheckedAreas = Object.fromEntries(
      Object.keys(checkedAreas).map((area) => [area, newSelectAll])
    )
    setCheckedAreas(newCheckedAreas)

    updateDataAndPagination(newSelectAll ? bikeData : [])
  }

  return (
    <>
      <div className="">
        <NavBar />
      </div>
      <div className="container">
        <h3 className="text-primary fw-bold my-4">站點信息</h3>
        <CitySelect onCitySelect={handleCitySelect} />
        <label className="my-3 ms-4 ms-md-1">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
            className={`${styles.tst}`}
          />
          全部勾選
        </label>
        <div className="d-md-flex justify-content-md-between">
          <div>
            <div className={`${styles.checkboxContainer} ms-4 ms-md-0 mb-md-3`}>
              {Object.keys(checkedAreas).map((area) => (
                <label key={area}>
                  <input
                    type="checkbox"
                    checked={checkedAreas[area]}
                    onChange={() => handleCheckboxChange(area)}
                    className={`${styles.tst} ms-md-1 `}
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>
          <div className="me-3 d-none d-md-block">
            <Image
              alt="bike logo"
              src="./Frame2.png"
              width={500}
              height={171}
              priority
            />
          </div>
        </div>

        <table className={`${styles.tablerounded} ${styles.tableFixed}`}>
          <thead>
            <tr>
              <th>縣市</th>
              <th>區域</th>
              <th>站點名稱</th>
              <th className="d-none d-md-table-cell">可借車輛</th>
              <th className="d-none d-md-table-cell">可還空位</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              const stationName = item.sna.substring('YouBike2.0_'.length)
              return (
                <tr key={item.sno}>
                  <td>台北市</td>
                  <td>{item.sarea}</td>
                  <td>{stationName}</td>
                  <td className="text-primary fw-bold d-none d-md-table-cell">
                    {item.sbi}
                  </td>
                  <td className="text-primary fw-bold d-none d-md-table-cell">
                    {item.bemp}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* 桌機版分頁 */}
        {pageCount > 0 && (
          <div className="mt-5 d-none d-md-block">
            <ReactPaginate
              previousLabel={'前一頁'}
              nextLabel={'後一頁'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              breakClassName={styles.breakme}
            />
          </div>
        )}

        {/* 手機版分頁 */}
        {pageCount > 0 && (
          <div className="mt-5 d-block d-md-none">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              breakClassName={styles.breakme}
            />
          </div>
        )}
      </div>
    </>
  )
}
