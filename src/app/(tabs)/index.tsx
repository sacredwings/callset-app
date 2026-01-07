import { router } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TabOneScreen() {
    const startCall = () => {
        // Переход на корневой путь стека /(call)
        router.push('/modal');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One 1</Text>

            <Button title="Позвонить" onPress={startCall} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
