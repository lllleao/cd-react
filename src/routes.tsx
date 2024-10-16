import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Books from "./pages/Books"
import LoginOrSign from "./pages/LoginOrSign"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store-books/:id" element={<Books />} />
            <Route path="/user" element={<LoginOrSign />} />
        </Routes>
    )
}

export default Rotas
