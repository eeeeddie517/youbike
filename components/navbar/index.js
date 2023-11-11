import Link from 'next/link'
import Image from 'next/image'
export default function NavBar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light border-bottom mb-4">
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
          </div>
        </nav>
      </div>
    </>
  )
}
