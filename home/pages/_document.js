import Document from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    render () {
        return (
            <Html>
              <Head>
                {/* Heebo */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/> 
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400&display=swap" rel="stylesheet"/>
                {/* Oswald */}
                <link rel="preconnect" href="https://fonts.googleapis.com" /> 
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
              </Head>
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
        )
    }
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App { ...props } />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                    { initialProps.styles }
            { sheet.getStyleElement() }
            </>
        ),
        }
    } finally {
    sheet.seal()
}
  }
}