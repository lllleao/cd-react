import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Books from "./pages/Books"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store-books/:id" element={<Books />} />
        </Routes>
    )
}

export default Rotas
