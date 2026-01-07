import { Stack, Tabs, Redirect } from 'expo-router'
import StoreProvider from '../redux/StoreProvider'
import { useAppSelector } from '../redux/hooks'

export default function RootLayout() {
    return (
        <StoreProvider>
            < AuthGate />

            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(call)/ModalScreen" options={{ headerShown: false, presentation: 'modal' }} />
            </Stack>
        </StoreProvider>
    )
}

function AuthGate() {
    const accountAuth = useAppSelector(state => state.account.auth);

    // Если есть токен, идем в основное приложение
    if (accountAuth) {
        // Перенаправляем на корневую страницу группы (tabs)
        return <Redirect href="/(tabs)" />;
    }

    // Если нет токена, идем в группу авторизации (auth)
    // Примечание: (auth) должен содержать хотя бы один экран, например, (auth)/login
    return <Redirect href="/(auth)/LoginScreen" />;
}