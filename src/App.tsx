import { BrowserRouter } from 'react-router-dom'
import Footer from './containers/Footer'
import Header from './containers/Header'
import GlobalStyle from './globalStyles'
import Rotas from './routes'

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Rotas />
            <Footer />
        </BrowserRouter>
    )
}

export default App
