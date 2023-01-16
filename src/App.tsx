import { ThemeProvider } from 'styled-components'
import Bubbles from './Bubbles'
import { theme } from './config/theme'
import { GlobalStyles } from './global/styles'

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Bubbles />
    </ThemeProvider>
  )
}

export default App
