import axios from 'axios';

const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/';

export const requestOpenWeatherMap = async (endpoint, params = {}) => {
    try {
        // Включение API ключа в параметры запроса
        const apiKey = 'ВАШ_API_КЛЮЧ'; // Замените на ваш реальный API ключ
        const apiParams = {
            ...params,
            appid: apiKey, // Добавление API ключа к параметрам запроса
        };

        const res = await axios({
            url: `${BASE_API_URL}${endpoint}`,
            method: 'GET',
            params: apiParams,
        });

        return res.data;
    } catch (error) {
        console.error("Ошибка при запросе к OpenWeatherMap:", error);
        throw error;
    }
};

