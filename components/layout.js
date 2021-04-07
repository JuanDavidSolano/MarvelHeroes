import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const charName = 'Juan Solano';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Heroes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src='/favicon.ico'
              height={144}
              width={144}
              alt={'Marvel Logo'}
            />
            <h1 className={utilStyles.heading2Xl}>Marvel Characters</h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <a>
                <Image
                  priority
                  src='/favicon.ico'
                  height={108}
                  width={108}
                  alt='Marvel Logo'
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href='/'>
                <a className={utilStyles.colorInherit}>{charName}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main >{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer>
        <a
          href='https://github.com/JuanDavidSolano/MarvelHeroes'
          target='_blank'
          rel='noopener noreferrer'
        >
          See the code on{' '}
          <img src='/github.svg' alt='Github Logo' className='logo' />
        </a>
      </footer>
    </div>
  );
}
