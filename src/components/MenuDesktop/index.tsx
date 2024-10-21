import { useState } from 'react'
import { MenuDesktopContainer } from './styles'
import { handleRedDown } from '../../utils'
import { useDispatch } from 'react-redux'
import { open } from '../../store/reducers/cart'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

type RedDown = {
    hero: boolean
    publicLb: boolean
    purchase: boolean
    contactUs: boolean
    cart: boolean
    user: boolean
}

const MenuDesktop = () => {
    // const { loginSuccess } = useSelector((state: RootReducer) => state.loginSigin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginSuccess = localStorage.getItem('loginSuccess')

    const [redDown, setRedDown] = useState<RedDown>({
        hero: false,
        publicLb: false,
        purchase: false,
        contactUs: false,
        cart: false,
        user: false
    })

    const handleClickCart = (elementName: string) => {
        handleRedDown(elementName, setRedDown, navigate, Boolean(loginSuccess))
        if (elementName === 'cart') {
            dispatch(open())
        }
    }

    return (
        <MenuDesktopContainer className="container">
            <ul className="nav__list">
                <li className="nav__list__item__desk">
                    <HashLink onClick={() => handleClickCart('hero')} className={`nav__list__item__desk__link ${redDown.hero ? 'nav__list__item__desk__link--is-down' : ''}`} to="/#hero">home</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink onClick={() => handleClickCart('publicLb')} className={`nav__list__item__desk__link ${redDown.publicLb ? 'nav__list__item__desk__link--is-down' : ''}`} to="/#public-lb">biblioteca virtual</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink onClick={() => handleClickCart('purchase')} className={`nav__list__item__desk__link ${redDown.purchase ? 'nav__list__item__desk__link--is-down' : ''}`} to="/#purchase">lojinha</HashLink>
                </li>
                <li className="nav__list__item__desk">
                    <HashLink onClick={() => handleClickCart('contactUs')} className={`nav__list__item__desk__link ${redDown.contactUs ? 'nav__list__item__desk__link--is-down' : ''}`} to="/#contact-us">fale conosco</HashLink>
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
