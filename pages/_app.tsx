import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutRubidex from '@/components/layout-rubidex'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <LayoutRubidex>
      <div className='page-container'>
        <Component {...pageProps} />
      </div>
    </LayoutRubidex>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
}
