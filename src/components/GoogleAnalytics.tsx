import { useEffect } from 'react'

export const GoogleAnalytics = () => {
  useEffect(() => {
    const GA_TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
    
    if (!GA_TRACKING_ID) {
      console.warn('Google Analytics tracking ID not found in environment variables')
      return
    }

    // Add the Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script1)

    // Add the configuration script
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}');
    `
    document.head.appendChild(script2)

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  return null
}