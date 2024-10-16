import { useState } from 'react'
import { MenuDesktopContainer } from './styles'
import { handleRedDown } from '../../utils'
import { useDispatch } from 'react-redux'
import { open } from '../../store/reducers/cart'
import { useNavigate } from 'react-router-dom'

type RedDown = {
    hero: boolean
    publicLb: boolean
    purchase: boolean
    contactUs: boolean
    cart: boolean
    user: boolean
}

const MenuDesktop = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [redDown, setRedDown] = useState<RedDown>({
        hero: false,
        publicLb: false,
        purchase: false,
        contactUs: false,
        cart: false,
        user: false
    })

    const handleClickCart = (elementName: string) => {
        handleRedDown(elementName, setRedDown, navigate)
        if (elementName === 'cart') {
            dispatch(open())
        }
    }

    return (
        <MenuDesktopContainer className="container">
            <ul className="nav__list">
                <li className="nav__list__item__desk">
                    <a onClick={() => handleClickCart('hero')} className={`nav__list__item__desk__link ${redDown.hero ? 'nav__list__item__desk__link--is-down' : ''}`} href="#hero">home</a>
                </li>
                <li className="nav__list__item__desk">
                    <a onClick={() => handleClickCart('publicLb')} className={`nav__list__item__desk__link ${redDown.publicLb ? 'nav__list__item__desk__link--is-down' : ''}`} href="#public-lb">biblioteca virtual</a>
                </li>
                <li className="nav__list__item__desk">
                    <a onClick={() => handleClickCart('purchase')} className={`nav__list__item__desk__link ${redDown.purchase ? 'nav__list__item__desk__link--is-down' : ''}`} href="#purchase">lojinha</a>
                </li>
                <li className="nav__list__item__desk">
                    <a onClick={() => handleClickCart('contactUs')} className={`nav__list__item__desk__link ${redDown.contactUs ? 'nav__list__item__desk__link--is-down' : ''}`} href="#contact-us">fale conosco</a>
                </li>
                <li className="nav__list__item__desk">
                    <div onClick={() => handleClickCart('cart')} className={`nav__list__item__desk__link ${redDown.cart ? 'nav__list__item__desk__link--is-down' : ''}`}><i className="fa-solid fa-cart-shopping" /></div>

                </li>
                <li className="nav__list__item__desk">
                    <div onClick={() => handleClickCart('user')} className={`nav__list__item__desk__link ${redDown.user ? 'nav__list__item__desk__link--is-down' : ''}`}><i className="fa-solid fa-user" /></div>

                </li>
            </ul>
        </MenuDesktopContainer>
    )
}

export default MenuDesktop
