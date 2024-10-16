import { useState } from "react"
import { ButtonLoginSign, FormContainer, LoginSignContainer } from "./styles"
import { handleBlur, handleFocus } from "../../utils/contactFunctions"

const LoginSign = () => {
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [nameEmpty, setNameEmpty] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    const [turn, setTurn] = useState(false)
    return (
        <LoginSignContainer>
            <div className="container">
                <button onClick={() => setTurn(!turn)} className="virar" type="button">Virar</button>
                <FormContainer className={`sign ${turn ? 'sign--is-turn' : ''}`}>
                    <div className="sign">
                        <p>Cadastro</p>
                    </div>
                    <form className="form">
                        <div className="form__text-field">
                            <input
                                className="input name"
                                onFocus={(e) => handleFocus(e, setNameEmpty)}
                                onBlur={(e) => handleBlur(e, setNameEmpty)}
                                type="text" id="name" />
                            <label className={nameEmpty ? 'active' : ''}htmlFor="name">
                            <i className="fa-solid fa-user" />
                            <span>Nome</span>
                            </label>
                        </div>
                        <div className="form__text-field">
                            <input
                                className="input email"
                                onFocus={(e) => handleFocus(e, setEmailEmpty)}
                                onBlur={(e) => handleBlur(e, setEmailEmpty)}
                                type="email" id="email" />
                            <label className={emailEmpty ? 'active' : ''}htmlFor="email">
                            <i className="fa-solid fa-envelope" />
                            <span>Email</span>
                            </label>
                        </div>
                        <div className="form__text-field">
                            <input
                                className="input password"
                                onFocus={(e) => handleFocus(e, setPasswordEmpty)}
                                onBlur={(e) => handleBlur(e, setPasswordEmpty)}
                                type="password" id="password" />
                            <label className={passwordEmpty ? 'active' : ''}htmlFor="password">
                            <i className="fa-solid fa-lock" />
                            <span>Senha</span>
                            </label>
                        </div>
                        <ButtonLoginSign type="button">Cadastrar</ButtonLoginSign>
                    </form>
                </FormContainer>
            </div>
        </LoginSignContainer>
    )
}

export default LoginSign
