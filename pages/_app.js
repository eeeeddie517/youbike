import { useEffect } from 'react'

import '@/styles/globals.scss'
// import '@/styles/product.scss'
// import '@/styles/cart.scss'
import '@/styles/loader.scss'

import { CartProvider } from '@/hooks/use-cart'
import { AuthProviderJWT } from '@/hooks/use-auth-jwt'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'

import DefaultLayout from '@/components/layout/default-layout'
// 自訂用載入動畫元件
import { NikeLoader } from '@/hooks/use-loader/components'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  // const getLayout =
  //   Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    // <AuthProviderJWT>
    //   <LoaderProvider close={5} CustomLoader={NikeLoader}>
    <Component />
    // </LoaderProvider>
    // </AuthProviderJWT>
  )
}
