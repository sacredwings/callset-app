import { interfaceUserGet, interfaceUserGetById } from "./types"
import {request} from "../apiClient"

export async function getUsers ({
    q=null,

    offset=0,
    count=20
}: interfaceUserGet){

    let data = {
        q,

        offset,
        count
    }
    return await request ('GET', '/api/users/get', data)
}

export async function getUsersById ({
    ids
}: interfaceUserGetById) {

    let data = {
        ids
    }
    return await request ('GET', '/api/users/getById', data)
}