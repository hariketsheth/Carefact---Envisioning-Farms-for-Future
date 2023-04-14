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

interface PollenLatestData {
    Count: PollenCount;
    Risk: PollenRisk;
}

interface PollenLatestResponse {
    error?: AmbeeError;
    message: string;
    data: PollenLatestData[];
}

export const getPollenLatest = async (lat: number, lng: number): Promise<PollenLatestResponse> => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.ambeedata.com/latest/pollen/by-lat-lng',
            params: { lat: lat.toString(10), lng: lng.toString(10) },
            headers: { 'x-api-key': AMBEE_API_KEY, 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            error,
            message: 'failed',
        } as PollenLatestResponse;
    }
};
