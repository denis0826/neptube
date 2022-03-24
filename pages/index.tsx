import type { NextPage } from 'next'
import Head from 'next/head'
import { Converter } from '../components/Converter'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>NEPTUNE MUTUAL</title>
        <meta name="description" content="Crypto Converter" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <div>
          <img
            className="mx-auto h-16 w-auto"
            src="/logo.png"
            alt="logo"
            height="64"
            width="64"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            NEPTUNE MUTUAL
          </h2>
        </div>
        <Converter />
      </main>
    </div>
  )
}

export default Home
