import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { slide as Menu } from 'react-burger-menu'
import styles from './navbar.module.css'
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light border-bottom">
          <div className="container">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div className="navbar-brand">
                <Image
                  alt="ubike logo"
                  src="./bike.png"
                  width={95}
                  height={95}
                  className="me-5"
                />
              </div>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/instructions" style={{ textDecoration: 'none' }}>
                    <div className="nav-link text-secondary fs-5 fw-bold me-4">
                      使用說明
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/rate" style={{ textDecoration: 'none' }}>
                    <div className="nav-link text-secondary fs-5 fw-bold me-4">
                      收費方式
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/stations-list"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="nav-link text-secondary fs-5 fw-bold me-4">
                      站點資訊
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/news" style={{ textDecoration: 'none' }}>
                    <div className="nav-link text-secondary fs-5 fw-bold me-4">
                      最新消息
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/activity" style={{ textDecoration: 'none' }}>
                    <div className="nav-link text-secondary fs-5 fw-bold">
                      活動專區
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-light bg-primary rounded-5 py-2 px-4 d-none d-md-block">
              登入
            </div>
            <button onClick={toggleMenu} className="d-block d-md-none">
              <i className="fas fa-bars">=</i>
              {/* 这里使用 Font Awesome 图标，也可以用其他方式实现 */}
            </button>
          </div>
        </nav>
        <Menu
          right
          isOpen={menuOpen}
          onStateChange={handleStateChange}
          customBurgerIcon={false} /* 禁用默认图标 */
          styles={{
            bmMenuWrap: {
              position: 'fixed',
              height: '100%',
              width: '100%',
            },
            bmMenu: {
              background: '#b5cc22',
              overflow: 'auto',
              height: '100%', // 可能不需要设置 width: '100%' 因为 bmMenuWrap 已经是 100%
            },
          }}
          className={styles.bmMenu}
        >
          <Link href="/instructions" style={{ textDecoration: 'none' }}>
            <div className={`menu-item text-light fs-4 fw-bold ms-4 my-4 `}>
              使用說明
            </div>
          </Link>
          <Link href="/rate" style={{ textDecoration: 'none' }}>
            <div className={`menu-item text-light fs-4 fw-bold ms-4 my-4`}>
              收費方式
            </div>
          </Link>
          <Link href="/stations-list" style={{ textDecoration: 'none' }}>
            <div className={`menu-item text-light fs-4 fw-bold ms-4 my-4`}>
              站點資訊
            </div>
          </Link>
          <Link href="/news" style={{ textDecoration: 'none' }}>
            <div className={`menu-item text-light fs-4 fw-bold ms-4 my-4`}>
              最新消息
            </div>
          </Link>
          <Link href="/activity" style={{ textDecoration: 'none' }}>
            <div className={`menu-item text-light fs-4 fw-bold ms-4 my-4`}>
              活動專區
            </div>
          </Link>
          <div
            className={`text-primary bg-light rounded-5 py-2 px-4 text-center fw-bold fs-5 w-25 ${styles.bmLoginButton}`}
          >
            登入
          </div>
        </Menu>
      </div>
    </>
  )
}
