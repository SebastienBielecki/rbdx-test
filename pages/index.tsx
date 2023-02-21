import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import clientPromise from "../lib/mongodb"
import { InferGetServerSidePropsType } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: any) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}


export default function Home({isConnected,}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const mongoAtlasConnnection = "mongodb+srv://sebastien:G4A4pTGVh7FJbYVj@rubidexcluster.jvvffjh.mongodb.net/test"

  return (
    <>
      <Head>
        <title>Rubidex</title>
        <meta name="description" content="Rubidex Console" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hello rubidex</h1>
        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
        
      </main>
    </>
  )
}
