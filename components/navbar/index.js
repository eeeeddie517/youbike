import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { slide as Menu } from 'react-burger-menu'
import styles from './navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const router = useRouter() // 使用 useRouter Hook 獲取當前路由信息

  // 這個函數會檢查鏈接的路徑是否與當前路徑相匹配
  const isActive = (path) => {
    return router.pathname === path
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
                  <Link
                    href="/instructions"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      isActive('/instructions') ? styles.active : ''
                    } fs-5 fw-bold me-4 text-secondary`}
                  >
                    使用說明
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/rate"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      isActive('/rate') ? styles.active : ''
                    } fs-5 fw-bold me-4 text-secondary`}
                  >
                    收費方式
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/stations-list"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      isActive('/stations-list') ? styles.active : ''
                    } fs-5 fw-bold me-4 text-secondary`}
                  >
                    站點資訊
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/news"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      isActive('/news') ? styles.active : ''
                    } fs-5 fw-bold me-4 text-secondary`}
                  >
                    最新消息
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/activity"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      isActive('/activity') ? styles.active : ''
                    } fs-5 fw-bold me-4 text-secondary`}
                  >
                    活動專區
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/loginpage" style={{ textDecoration: 'none' }}>
              <button className="text-light bg-primary rounded-5 py-2 px-4 d-none d-md-block border-0">
                登入
              </button>
            </Link>
            <button className={`d-block d-md-none ${styles.menubutton}`}>
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                onClick={toggleMenu}
              />
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
              height: '100%',
            },
          }}
          className={styles.bmMenu}
        >
          <Link
            href="/instructions"
            style={{ textDecoration: 'none' }}
            className={`${
              isActive('/instructions') ? styles.activemobile : ''
            } fs-4 fw-bold ms-4 my-4  text-light`}
          >
            使用說明
          </Link>
          <Link
            href="/rate"
            style={{ textDecoration: 'none' }}
            className={`${
              isActive('/rate') ? styles.activemobile : ''
            } fs-4 fw-bold ms-4 my-4  text-light`}
          >
            收費方式
          </Link>
          <Link
            href="/stations-list"
            style={{ textDecoration: 'none' }}
            className={`${
              isActive('/stations-list') ? styles.activemobile : ''
            } fs-4 fw-bold ms-4 my-4  text-light`}
          >
            站點資訊
          </Link>
          <Link
            href="/news"
            style={{ textDecoration: 'none' }}
            className={`${
              isActive('/news') ? styles.activemobile : ''
            } fs-4 fw-bold ms-4 my-4  text-light`}
          >
            最新消息
          </Link>
          <Link
            href="/activity"
            style={{ textDecoration: 'none' }}
            className={`${
              isActive('/activity') ? styles.activemobile : ''
            } fs-4 fw-bold ms-4 my-4  text-light`}
          >
            活動專區
          </Link>
          <Link href="/loginpage" style={{ textDecoration: 'none' }}>
            <button
              className={`text-primary bg-light rounded-5 py-2 px-4 text-center fw-bold fs-5 w-25 ${styles.bmLoginButton} border-0`}
            >
              登入
            </button>
          </Link>
        </Menu>
      </div>
    </>
  )
}
