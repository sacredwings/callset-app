import { interfaceAuthLogin, interfaceAuthReg } from "./types"
import {request} from "../apiClient"

export async function setLogin ({
    login,
    password,
}: interfaceAuthLogin){

    let data = {
        login,
        password,
    }
    return await request ('POST', '/api/auth/login', data)
}

export async function setRegistration ({
    login,
    password,
}: interfaceAuthReg){

    let data = {
        login,
        password,
    }
    return await request ('POST', '/api/auth/register', data)
}