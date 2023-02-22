import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutRubidex from '@/components/layout-rubidex'
//import clientPromise from '@/lib/mongodb'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <LayoutRubidex>
      <Component {...pageProps} />
    </LayoutRubidex>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
  // try {
  //   await clientPromise
  //   // `await clientPromise` will use the default database passed in the MONGODB_URI
  //   // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
  //   //
  //   // `const client = await clientPromise`
  //   // `const db = client.db("myDatabase")`
  //   //
  //   // Then you can execute queries against your database like so:
  //   // db.find({}) or any of the MongoDB Node Driver commands

  //   return {
  //     props: { isConnected: true },
  //   }
  // } catch (e) {
  //   console.error(e)
  //   return {
  //     props: { isConnected: false },
  //   }
  // }
}
