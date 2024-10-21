import { UnknownAction } from "@reduxjs/toolkit"
import { apiUrl } from ".."
import { DataProp } from "../../components/LoginSign/formsFetch"
import { checkSignUser } from "../../store/reducers/loginSign"
import { Dispatch } from "react"
import { loginFetch } from "./login"

export const signFetch = (data: DataProp, dispatch: Dispatch<UnknownAction>) => {
    fetch(`${apiUrl}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) {
            throw new Error('Cadastro falhou.')
        }
        return res.json()
    }).then(res => {
        dispatch(checkSignUser(res))
        localStorage.setItem('loginSuccess', 'true')
        loginFetch(data, dispatch)
    }).catch(err => {
        dispatch(checkSignUser({msg: data.email, signUserExist: true}))
        console.error(err)
    })
}
