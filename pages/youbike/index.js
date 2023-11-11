import React, { useState } from 'react'
import YouBikeSearch from '@/components/youbikesearch'
import styles from '@/styles/table.module.scss'
import data from '@/data/bike/bikedata.json'

export default function YouBike() {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const pageNumbers = []
  const totalRecords = data.length
  const totalPage = Math.ceil(totalRecords / recordsPerPage)

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

  const maxPagingButtons = 6
  const [maxPageNumber, setMaxPageNumber] = useState(maxPagingButtons)
  const [minPageNumber, setMinPageNumber] = useState(1)

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      const updatedPage = Math.max(prev - 1, 1)
      // 更新分頁條件必須在這裡執行，使用更新後的頁碼
      if ((updatedPage - 1) % maxPagingButtons === 0 && updatedPage < prev) {
        setMaxPageNumber((currentMax) =>
          Math.max(currentMax - maxPagingButtons, maxPagingButtons)
        )
        setMinPageNumber((currentMin) =>
          Math.max(currentMin - maxPagingButtons, 1)
        )
      }
      return updatedPage
    })
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const updatedPage = Math.min(prev + 1, totalPage)
      // 同理，更新分頁條件
      if (updatedPage >= maxPageNumber) {
        setMaxPageNumber((currentMax) =>
          Math.min(currentMax + maxPagingButtons, totalPage)
        )
        setMinPageNumber((currentMin) =>
          Math.min(
            currentMin + maxPagingButtons,
            totalPage - maxPagingButtons + 1
          )
        )
      }
      return updatedPage
    })
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const lastPageNum = pageNumbers[pageNumbers.length - 1] // 這個應該是等於 totalPage
  const handleLastPage = () => {
    setCurrentPage(totalPage)
    const maxPageLimit =
      totalPage < maxPagingButtons ? totalPage : maxPagingButtons
    setMaxPageNumber(totalPage)
    setMinPageNumber(totalPage - maxPageLimit + 1)
  }

  return (
    <>
      <div className="row mt-5 mx-5">
        <nav className="navbar navbar-expand-lg bg-body-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img alt="youbike logo" src="./logo_180x180 1.png" />
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary fw-bold"
                    aria-current="page"
                    href="#"
                  >
                    使用說明
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary fw-bold" href="#">
                    收費方式
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary fw-bold" href="#">
                    站點資訊
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary fw-bold" href="#">
                    最新消息
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-secondary fw-bold" href="#">
                    活動專區
                  </a>
                </li>
              </ul>
              <div className="ms-auto">登入</div>
            </div>
          </div>
        </nav>
        <hr />
      </div>
      <div className="container">
        <div className="fs-3 fw-bold text-primary">站點資訊</div>
        <div>
          <YouBikeSearch />
        </div>

        <div className="mt-5 text-center">
          {/* <table className={`table table-striped`}>
            <thead>
              <tr>
                <th scope="col" className="bg-primary ">
                  縣市
                </th>
                <th scope="col" className="bg-primary">
                  區域
                </th>
                <th scope="col" className="bg-primary">
                  站點名稱
                </th>
                <th scope="col" className="bg-primary">
                  可借車輛
                </th>
                <th scope="col" className="bg-primary">
                  可還空位
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>台北市</td>
                <td>松山區</td>
                <td>捷運科技大樓站</td>
                <td>12</td>
                <td>12</td>
              </tr>
              <tr>
                <td>台北市</td>
                <td>松山區</td>
                <td>捷運科技大樓站</td>
                <td>12</td>
                <td>12</td>
              </tr>
            </tbody>
          </table> */}
          <table className={`table table-striped`}>
            <thead>
              <tr>
                <th scope="col" className="bg-primary">
                  縣市
                </th>
                <th scope="col" className="bg-primary">
                  區域
                </th>
                <th scope="col" className="bg-primary">
                  站點名稱
                </th>
                <th scope="col" className="bg-primary">
                  可借車輛
                </th>
                <th scope="col" className="bg-primary">
                  可還車位
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr key={record.sno}>
                  <td>台北市</td>
                  <td>{record.sarea}</td>
                  <td>{record.sna.split('_')[1]}</td>
                  <td>{record.sbi}</td>
                  <td>{record.bemp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <a
                  href="#0"
                  onClick={() => setCurrentPage(1)}
                  className="page-link"
                >
                  第一頁
                </a>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <a
                  href="#0"
                  onClick={() => handlePrevPage()}
                  className="page-link"
                >
                  前一頁
                </a>
              </li>
              {pageNumbers.map((number) => {
                if (number < maxPageNumber + 1 && number >= minPageNumber) {
                  return (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? 'active' : ''
                      }`}
                    >
                      <a
                        onClick={() => paginate(number)}
                        href="#0"
                        className="page-link"
                      >
                        {number}
                      </a>
                    </li>
                  )
                } else {
                  return null
                }
              })}
              <li
                className={`page-item ${
                  currentPage === totalPage ? 'disabled' : ''
                }`}
              >
                <a
                  href="#0"
                  onClick={() => handleNextPage()}
                  className="page-link"
                >
                  下一頁
                </a>
              </li>
              <li
                className={`page-item ${
                  currentPage === totalPage ? 'disabled' : ''
                }`}
              >
                <a href="#0" onClick={handleLastPage} className="page-link">
                  最後一頁
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
