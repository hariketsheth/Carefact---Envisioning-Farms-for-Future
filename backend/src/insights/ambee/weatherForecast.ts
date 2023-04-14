import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface WeatherForecastData {
    lat: number;
    lng: number;
    forecast: WeatherForecast[];
}

interface WeatherForecast {
    time: number;
    precipIntensity: number;
    precipProbability: number;
    precipType: string;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    cloudCover: number;
    uvIndex: number;
    visibility: number;
    ozone: number;
}

interface WeatherForecastResponse {
    error?: AmbeeError;
    message: string;
    data: WeatherForecastData;
}

export const getWeatherForecast = async (
    lat: number,
    lng: number,
    filter: string = 'daily',
): Promise<WeatherForecastResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/weather/forecast/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10), filter },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as WeatherForecastResponse;
    }
};
