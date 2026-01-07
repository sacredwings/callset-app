import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { setLogin } from '../../api/auth/routes'
// Импорт хуков Redux, если они используются. Если нет, их можно убрать.
 import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { setAuth } from '../../redux/slices/accountSlice'

export default function LoginPage() {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });

    const dispatch = useAppDispatch()

    const handleLoginChange = (value: string) => {
        setForm(prevState => ({ ...prevState, login: value }));
    };

    const handlePasswordChange = (value: string) => {
        setForm(prevState => ({ ...prevState, password: value }));
    };

    // Функция, которая будет вызываться при нажатии кнопки "Войти"
    const handleSubmit = async () => {
        // Здесь происходит логика отправки данных

        // 1. Простая валидация (можно усложнить)
        if (!form.login || !form.password) {
            Alert.alert("Ошибка", "Пожалуйста, заполните оба поля.");
            return;
        }

        // 2. Выполнение отправки (например, в Redux или на сервер)
        console.log("Данные формы для отправки:", form);
        let result = await setLogin(form)
        console.log("Результат:", result);

        // Пример использования Redux, если бы он был настроен:
        dispatch(setAuth(result));

        // 3. Сообщение об успехе (для примера)
        Alert.alert("Успех", `Попытка входа с логином: ${form.login}`);

        // 4. Очистка формы после успешной отправки (опционально)
        // setForm({ login: '', password: '' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>

            <TextInput
                style={styles.input}
                onChangeText={handleLoginChange}
                value={form.login}
                placeholder="Логин"
                keyboardType="email-address" // Подсказка для клавиатуры
            />
            <TextInput
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={form.password}
                placeholder="Пароль"
                secureTextEntry={true} // Скрытие вводимого текста
            />

            {/* Кнопка с привязкой к функции handleSubmit */}
            <Button
                title="Войти"
                onPress={handleSubmit}
                // Можно добавить стили или кастомную обертку, если нужен более сложный дизайн кнопки
            />
        </View>
    )
}

// Простые стили для лучшего отображения
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});