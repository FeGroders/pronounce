import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: black;};
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#EFEFEF',
    grey: '#EFEFEF',
  },
  fonts: {
    primary: '"Roboto", sans-serif',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
