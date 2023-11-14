import { useEffect } from 'react'

import '@/styles/globals.scss'
// import '@/styles/product.scss'
// import '@/styles/cart.scss'
import '@/styles/loader.scss'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  // const getLayout =
  //   Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return <Component />
}
