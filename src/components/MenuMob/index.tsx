import { useState } from 'react'
import { MenuBobContainer } from './styles'

const MenuMob = () => {
    const [menuClicked, setMenuClicked] = useState(false)
    return (
        <MenuBobContainer>
            <div
                className={`hamburguer-wrapper ${menuClicked ? 'hamburguer-wrapper__is-active-menu' : ''}`}
                onClick={() => setMenuClicked(!menuClicked)}
            >
                <span className="hamburguer-wrapper__item"></span>
                <span className="hamburguer-wrapper__item"></span>
                <span className="hamburguer-wrapper__item"></span>
            </div>
            <ul
                className={`menu-mob ${menuClicked ? 'menu-mob__is-active-menu' : ''}`}
            >
                <li>
                    <a href="#hero" className="menu-mob__item">
                        home
                    </a>
                </li>
                <li>
                    <a href="#public-lb" className="menu-mob__item">
                        biblioteca virtual
                    </a>
                </li>
                <li>
                    <a className="menu-mob__item" href="#purchase">
                        lojinha
                    </a>
                </li>
                <li>
                    <a className="menu-mob__item" href="#contact-us">
                        fale conosco
                    </a>
                </li>
            </ul>
        </MenuBobContainer>
    )
}

export default MenuMob
