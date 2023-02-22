import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { InferGetServerSidePropsType } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
}


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <meta name="description" content="Rubidex Console" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Hello rubidex</h1>
      </main>
    </>
  )
}
