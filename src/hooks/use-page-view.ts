import { useEffect } from 'react'
import { useRouter } from "next/router";

import { existsGaId, pageView } from '../components/gtag'

// all lowercase and may include underscores (_) or dashes. and hyphen https://google.github.io/styleguide/jsguide.html#file-name
export default function usePageView() {
  const router = useRouter()

  useEffect(() => {
    if (!existsGaId) {
      return
    }

    const handleRouteChange = (path: string) => {
        pageView(path)
    }
    // routeChangeComplete event should be fired when a route changed completely. https://nextjs.org/docs/api-reference/next/router
    router.events.on('routeChangeComplete', handleRouteChange)

    // useEffect: React will run it when it is time to clean up https://reactjs.org/docs/hooks-effect.html
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
