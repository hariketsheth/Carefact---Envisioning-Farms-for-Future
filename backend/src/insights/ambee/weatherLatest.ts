import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface WeatherLatestData {
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
    lat: number;
    lng: number;
}

interface WeatherLatestResponse {
    error?: AmbeeError;
    message: string;
    data: WeatherLatestData;
}

export const getWeatherLatest = async (lat: number, lng: number): Promise<WeatherLatestResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/weather/latest/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as WeatherLatestResponse;
    }
};
