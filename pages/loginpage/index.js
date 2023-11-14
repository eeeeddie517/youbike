import React, { useState } from 'react'
import styles from '@/styles/login.module.css'
import NavBar from '@/components/navbar'
export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ username: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault() // 防止表單提交後的頁面重新載入
    let hasError = false

    //清除error
    setError({ username: '', password: '' })

    // 檢查username跟password是否已輸入
    if (username === '') {
      setError((prevState) => ({
        ...prevState,
        username: 'Please enter username',
      }))
      hasError = true
    }
    if (password === '') {
      setError((prevState) => ({
        ...prevState,
        password: 'Please enter password',
      }))
      hasError = true
    }

    if (!hasError) {
      console.log('Username : ', username, ', Password : ', password)
    }
  }

  return (
    <>
      <NavBar />
      <div className="container mt-2">
        <div className={`${styles.loginContainer}`}>
          <form onSubmit={handleSubmit}>
            <div className={`${styles.formField}`}>
              <label htmlFor="username" className="label">
                Username
              </label>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {error.username && (
                <div className={`${styles.error}`}>{error.username}</div>
              )}
            </div>
            <div className={`${styles.formField}`}>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error.password && (
                <div className={`${styles.error}`}>{error.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="text-light bg-primary rounded-5 py-2 px-4 border-0 mt-3 fw-bold"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
