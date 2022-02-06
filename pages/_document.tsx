import Document, { Html, Head, Main, NextScript } from 'next/document'

export const GA_TRACKING_ID = "G-0LYNEJ7HFT";

class MyDocument extends Document {

  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" data-theme="dark">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              'page_path': window.location.pathname,
              'anonymize_ip': true
            });`}} />
        </Head>

        <body className={`fadeIn bg-vulcan-500 text-whisper-500`}>
          <Main />
          
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument