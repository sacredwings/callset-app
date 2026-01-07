import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function IncomingCallScreen() {
    // Эта функция закрывает модальное окно и возвращает пользователя туда, откуда он пришел
    const handleDismiss = () => {
        router.back();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Входящий звонок!</Text>

            <Button title="Ответить" onPress={() => console.log('Отвечаем')} />

            <Button title="Сбросить" onPress={handleDismiss} />
        </View>
    );
}