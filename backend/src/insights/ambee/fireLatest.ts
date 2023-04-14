import axios from 'axios';
import { AMBEE_API_KEY } from 'src/configuration';
import { AmbeeError } from '.';

interface FireLatestData {
    lat: number;
    lon: number;
    confidence: string;
    frp: number;
    daynight: 'D' | 'N';
    detection_time: string;
    distance: number;
}

interface FireLatestResponse {
    error?: AmbeeError;
    message: string;
    data: FireLatestData[];
}

export const getFireLatest = async (lat: number, lng: number): Promise<FireLatestResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/latest/fire',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as FireLatestResponse;
    }
};
