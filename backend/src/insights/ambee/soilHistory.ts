import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface SoilHistoryData {
    _id: string;
    scantime: string;
    soil_temperature: number;
    soil_moisture: number;
}

interface SoilHistoryResponse {
    error?: AmbeeError;
    message: string;
    data: SoilHistoryData[];
}

export const getSoilHistory = async (
    lat: number,
    lng: number,
    from: string,
    to: string,
): Promise<SoilHistoryResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/soil/history/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10), from: from, to: to },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as SoilHistoryResponse;
    }
};
