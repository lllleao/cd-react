import MenuDesktop from '../../components/MenuDesktop'
import MenuMob from '../../components/MenuMob'
import ProductsListCart from '../../components/ProductsListCart'
import { HeaderContainer } from './styles'

const Header = () => {
    return (
        <HeaderContainer>
            <MenuDesktop />
            <MenuMob />
            <ProductsListCart />
        </HeaderContainer>
    )
}

export default Header
