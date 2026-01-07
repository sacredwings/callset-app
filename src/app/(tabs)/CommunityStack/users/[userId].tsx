//// @ts-nocheck
import { useLocalSearchParams } from 'expo-router'

import UsersId from "../../../../components/users/Id"
import { accountGet } from "../../../../api/account/routes"
import { usersGetById } from "../../../../api/user/routes"
import React, { useState, useEffect } from 'react';

export default function Page () {
    const [account, setAccount] = useState(null)
    const [user, setUser] = useState(null)

    const { userId } = useLocalSearchParams<{ userId: string }>()

    useEffect(() => {
        (async () => {
            const account = await accountGet ()
            const user = await usersGetById ({
                ids: [userId]
            })
        })()
    }, [userId])

    return <UsersId user={user[0]} account={account}/>
}
