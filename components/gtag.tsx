import Script from 'next/script'
import { GaEvent } from '../types'

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageView = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

// GAイベントを発火させるevent関数を定義
export const event = ({ action, category, label, value = '' }: GaEvent) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : '',
    value,
  })
}

// _app.tsx で読み込む
export const GoogleAnalytics = () => (
  <>
    {existsGaId && (
      <>
        <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag_inline_script" 
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </>
    )}
  </>
)

