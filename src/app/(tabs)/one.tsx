import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function OnePage() {
    return (
        <View >
            <Text>Главная Вкладка</Text>

            {/* Демонстрация навигации внутрь стека, определенного в home/_layout.tsx */}
            <Link href="/(tabs)/home/details" asChild>
                <Button title="Открыть Детали (Stack View)" />
            </Link>

            <View style={{ marginVertical: 15 }}>
                <Button title="Выйти" color="red" />
            </View>
        </View>
    );
}

// Добавим второй экран, который будет частью стека home
// (Для этого нужен файл home/details.tsx и home/_layout.tsx)