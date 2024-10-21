import { useState } from "react"
import { ButtonLoginSign, FormContainer, LoginSignContainer } from "./styles"
import logo3 from '../../assets/logo-nova/logo 3.png'
import Sign from "./Sign"
import Login from "./Login"
import { useDispatch } from "react-redux"
import { checkLoginUser, checkSignUser } from "../../store/reducers/loginSign"

const LoginSign = () => {
    const [isLoginScreen, setIsLoginScreen] = useState(false)
    const dispatch = useDispatch()


    const handleChangeLogin = () => {
        dispatch(checkSignUser({signUserExist: false}))
        setIsLoginScreen(!isLoginScreen)
    }

    const handleChangeSign = () => {
        dispatch(checkLoginUser({loginUserExist: false, passWordCorrect: false}))
        setIsLoginScreen(!isLoginScreen)
    }

    return (
        <LoginSignContainer>
            <div className="container">
                <FormContainer className={`started ${isLoginScreen ? 'change' : ''}`}>
                    <div className="logo-container logo-left">
                        <img className="logo3" srcSet={logo3} alt="" />
                        <ButtonLoginSign onClick={handleChangeSign}>Cadastrar</ButtonLoginSign>
                    </div>
                    <Sign />
                    <Login />
                    <div className="logo-container logo-right">
                        <img className="logo3" srcSet={logo3} alt="" />
                        <ButtonLoginSign onClick={handleChangeLogin}>LOGIN</ButtonLoginSign>
                    </div>
                    <div className="text-mobile">
                        <p>
                            {isLoginScreen ? 'Ainda não tem cadastro?' : 'Já tem cadastro?'}
                        </p>
                        <ButtonLoginSign onClick={() => setIsLoginScreen(!isLoginScreen)}>
                            {isLoginScreen ? 'Cadastro': 'Login'}
                        </ButtonLoginSign>
                    </div>
                </FormContainer>
            </div>
        </LoginSignContainer>
    )
}

export default LoginSign
