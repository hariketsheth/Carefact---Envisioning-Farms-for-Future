import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface WeatherHistoryData {
    time: number;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    cloudCover: number;
    visibility: number;
    ozone: number;
}

interface WeatherHistoryResponse {
    error?: AmbeeError;
    status: string;
    data: WeatherHistoryData;
}

export const getWeatherHistory = async (
    lat: number,
    lng: number,
    from: string,
    to: string,
): Promise<WeatherHistoryResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/weather/history/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10), from: from, to: to },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            status: 'failed',
        } as WeatherHistoryResponse;
    }
};
