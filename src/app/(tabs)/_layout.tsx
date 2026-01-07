import {Link, Stack, Tabs} from 'expo-router'
import { Text } from 'react-native';
import {useEffect, useState} from "react";
import {initializeSocket, connectSocket} from "../../services/socketService";

export default function TabLayout() {
    useEffect(() => {
        (async () => {
            await initializeSocket({
                tid: '68f8e4d1133e4e85603ea95b',
                tkey: '8e67e9baaaf516d1778b806bec700347'
            })

            await connectSocket()
        })()
    }, [])

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Главная",
                    tabBarIcon: () => <Text>🏠</Text>
                }}
            />
            <Tabs.Screen
                name="one"
                options={{
                    title: "Пользователи",
                    tabBarIcon: () => <Text>🏠</Text>
                }}
            />
        </Tabs>
    )
}

