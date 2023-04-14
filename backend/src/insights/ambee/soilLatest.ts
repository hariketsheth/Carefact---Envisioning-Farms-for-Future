import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface SoilLatestData {
    _id: string;
    scantime: string;
    soil_temperature: number;
    soil_moisture: number;
}

interface SoilLatestResponse {
    error?: AmbeeError;
    message: string;
    data: SoilLatestData[];
}

export const getSoilLatest = async (lat: number, lng: number): Promise<SoilLatestResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/soil/latest/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as SoilLatestResponse;
    }
};
