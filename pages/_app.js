import { Box, Container } from '@mui/system'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Component {...pageProps}/>
        </Box>
      </Container>
    </div>
  )
}
