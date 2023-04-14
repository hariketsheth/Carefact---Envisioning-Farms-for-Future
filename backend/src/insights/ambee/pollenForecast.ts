import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface PollenCount {
    grass_pollen: number;
    tree_pollen: number;
    weed_pollen: number;
}

interface PollenRisk {
    grass_pollen: string;
    tree_pollen: string;
    weed_pollen: string;
}

interface PollenForecastData {
    time: number;
    lat: number;
    lng: number;
    Count: PollenCount;
    Risk: PollenRisk;
}

interface PollenForecastResponse {
    error?: AmbeeError;
    message: string;
    data: PollenForecastData[];
}

export const getPollenForecast = async (lat: number, lng: number): Promise<PollenForecastResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/forecast/pollen/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as PollenForecastResponse;
    }
};
