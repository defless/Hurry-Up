import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as ga from '../lib/gtag'
import '../theme/styles.css';
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return <Component {...pageProps} />
}

export default MyApp
