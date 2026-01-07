import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Константа для ключа токена в AsyncStorage
const TOKEN_KEY = 'userToken';

// Базовый URL вашего сервера
const BASE_URL = 'http://127.0.0.1:3000';

/**
 * Универсальная функция для выполнения HTTP-запросов с автоматической обработкой токена и данных.
 *
 * @param {string} method - HTTP метод (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} url - Эндпоинт (относительно BASE_URL).
 * @param {object} [data={}] - Объект с данными для отправки (payload).
 * @returns {Promise<object>} Результат ответа сервера.
 */
export const request = async <T>(method: string, url: string, data: any = {}): Promise<T> => {

    // 1. Создание экземпляра Axios с базовыми настройками
    const client: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 15000, // 15 секунд таймаут
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 2. Автоматическое добавление токена (Authorization Header)
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // 3. Определение, куда передавать данные в зависимости от метода
    const config: any = {
        method: method.toUpperCase(), // Используем toUpperCase() для консистентности
        url,
        // Для GET и DELETE данные передаются через params
        ...(method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE'
                ? { params: data }
                : { data } // Для POST, PUT, PATCH данные передаются через data
        ),
    };

    try {
        // 4. Выполнение запроса
        const response = await client(config);
        return response.data as T; // Возвращаем только тело ответа, типизированное как T
    } catch (error: any) {
        // Обработка ошибок (например, 401, 404, ошибки сети)
        if (error.response) {
            // Сервер ответил статусом вне диапазона 2xx
            console.error(`API Error [${error.response.status}]:`, error.response.data);

            // Если статус 401, можно добавить логику очистки токена
            if (error.response.status === 401) {
                await AsyncStorage.removeItem(TOKEN_KEY);
            }

            // Перебрасываем ошибку дальше с полезной нагрузкой
            throw error.response.data || { message: 'Произошла ошибка на сервере' };
        } else if (error.request) {
            // Запрос был сделан, но ответ не получен (например, таймаут или нет сети)
            console.error('Network Error:', error.message);
            throw { message: 'Нет соединения с сервером или таймаут' };
        } else {
            // Что-то случилось при настройке запроса
            console.error('Request Setup Error:', error.message);
            throw { message: 'Ошибка конфигурации запроса' };
        }
    }
};