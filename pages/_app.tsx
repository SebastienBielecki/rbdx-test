import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutRubidex from '@/components/layout-rubidex'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <LayoutRubidex>
    <Component {...pageProps} />
  </LayoutRubidex>
  )
}
