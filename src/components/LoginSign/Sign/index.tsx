import {
    handleBlur,
    handleFocus,
    numberAndCaracterScape
} from '../../../utils/contactFunctions'
import { handleValidEmail } from '../../../utils/validationLoginSign'
import { ButtonLoginSign } from '../styles'
import { useFormeState } from '../useFormState'
import { handleSign } from '../formsFetch'
import { EmailUserExist } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../../store'
import { useSignUserMutation } from '../../../services/api'

const Sign = () => {
    const { signUserExist, msg } = useSelector(
        (state: RootReducer) => state.loginSigin
    )
    const [makeSign] = useSignUserMutation()
    const dispatch = useDispatch()

    const {
        emailEmpty,
        email,
        isEmailValid,
        name,
        nameEmpty,
        passwordEmpty,
        password,
        setEmailEmpty,
        setEmail,
        setIsEmailValid,
        setName,
        setNameEmpty,
        setPasswordEmpty,
        setPassword,
        emailBorderError,
        setEmailBorderError
    } = useFormeState()

    const data = {
        name,
        email,
        password
    }

    return (
        <>
            <EmailUserExist className={signUserExist ? 'user-exist' : ''}>
                {msg} já existe
            </EmailUserExist>
            <div className="sign login-sign">
                <div className="login-sign__title">
                    <p>Cadastro</p>
                </div>
                <form
                    className="form"
                    onSubmit={(e) =>
                        handleSign(
                            e,
                            isEmailValid,
                            password,
                            data,
                            dispatch,
                            name,
                            makeSign
                        )
                    }
                >
                    <div className="form__text-field">
                        <input
                            className="input name"
                            onFocus={(e) => handleFocus(e, setNameEmpty)}
                            onBlur={(e) => handleBlur(e, setNameEmpty)}
                            onChange={(e) =>
                                numberAndCaracterScape(e.target.value, setName)
                            }
                            value={name}
                            type="text"
                            id="name"
                        />
                        <label
                            className={nameEmpty ? 'active' : ''}
                            htmlFor="name"
                        >
                            <i className="fa-solid fa-user" />
                            <span>Nome</span>
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className={`input email ${emailBorderError ? '' : 'sign-email-error'}`}
                            onFocus={(e) => handleFocus(e, setEmailEmpty)}
                            onBlur={(e) => handleBlur(e, setEmailEmpty)}
                            onChange={(e) =>
                                handleValidEmail(
                                    e.target.value,
                                    setEmail,
                                    setIsEmailValid,
                                    setEmailBorderError
                                )
                            }
                            type="email"
                            id="email-sign"
                            value={email}
                        />
                        <label
                            className={emailEmpty ? 'active' : ''}
                            htmlFor="email-sign"
                        >
                            <i className="fa-solid fa-envelope" />
                            <span>Email</span>
                        </label>
                    </div>
                    <div className="form__text-field">
                        <input
                            className="input password"
                            onFocus={(e) => handleFocus(e, setPasswordEmpty)}
                            onBlur={(e) => handleBlur(e, setPasswordEmpty)}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password-sign"
                            value={password}
                        />
                        <label
                            className={passwordEmpty ? 'active' : ''}
                            htmlFor="password-sign"
                        >
                            <i className="fa-solid fa-lock" />
                            <span>Senha</span>
                        </label>
                    </div>
                    <ButtonLoginSign type="submit">Cadastrar</ButtonLoginSign>
                </form>
            </div>
        </>
    )
}

export default Sign
