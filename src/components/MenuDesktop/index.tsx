import { MenuDesktopContainer } from './styles'

const MenuDesktop = () => {
    return (
        <MenuDesktopContainer className="container">
            <ul className="nav__list">
                <li className="nav__list__item__desk">
                    <a href="#hero">home</a>
                </li>
                <li className="nav__list__item__desk">
                    <a href="#public-lb">biblioteca virtual</a>
                </li>
                <li className="nav__list__item__desk">
                    <a href="#purchase">lojinha</a>
                </li>
                <li className="nav__list__item__desk">
                    <a href="#contact-us">fale conosco</a>
                </li>
                <li className="nav__list__item__desk">
                <a href="#contact-us"><i className="fa-solid fa-cart-shopping" /></a>
                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
