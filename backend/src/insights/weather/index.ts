import axios from 'axios';
import { Router, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { WEATHER_API_KEY, USE_API } from 'src/configuration';
import { weatherDateParse } from 'src/utils/parseDate';
import weatherResponse from "src/data/weatherResponse.json"

const router = Router();

const handler = async (req: Request, res: Response) => {

    await check('from')
        .isString()
        .run(req);
    await check('to')
        .isString()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid Parameters',
            errors: errors.array(),
            parametersSent: req.body,
        });
    } else {
        const from = weatherDateParse(req.body.from)
        const to = weatherDateParse(req.body.to)

        try {
            if (!USE_API) { 
                throw new Error("Problems")
            }
            const result = await getWeatherForecast(from, to);
            return res.json({
                from,
                to,
                weather: "result",
            });
        } catch (err) {
            // return cached data
            console.log("Using cached response")
            return res.json(weatherResponse)
        }
    }
};

router.post('/', handler)
router.get('/', handler)

interface WeatherForecast {
    date: string;
    max_temp_high: number;
    max_temp_low: number;
    min_temp_code: string;
    min_temp_high: number;
    min_temp_low: number;
    precipitation: string;
    precipitation_code: string;
    temp: string;
    temp_code: string;
}

interface WeatherResponse {
    status: string;
    error?: any;
    location?: string;
    forecast?: WeatherForecast[];
}

const getWeatherForecast = async (from: string, to: string): Promise<WeatherResponse> => {
    try {
        const response = await axios.request({
            url: `https://weatherplanner.azure-api.net/v1/Forecast/Des Moines/${from}/${to}`,
            params: { 'subscription-key': WEATHER_API_KEY },
            headers: { 'Content-type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        return {
            status: 'failed',
            error: error,
        };
    }
};

export default router;
