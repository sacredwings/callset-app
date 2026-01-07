import AsyncStorage from '@react-native-async-storage/async-storage'

// Сохранение данных
export const set = async (key: string, value:string) => {
    try {
        if (!key) throw new Error("AsyncStorage set Error: Key не может быть пустым")

        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error("Ошибка записи", e)
    }
}

// Получение данных
export const get = async (key:string) => {
    try {
        if (!key) throw new Error("AsyncStorage set Error: Key не может быть пустым")

        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.error("Ошибка чтения", e)
    }
}