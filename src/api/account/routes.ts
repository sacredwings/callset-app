import {request} from "../apiClient"

export async function getAccount () {
    return await request ('GET', '/api/account/get')
}