import earthData from './data/earthData.json';


export const data = earthData;
    export interface CropInformation {
        type: string;
        name: string;
        earthScore: number;
        state: Season;
        image: string;
        summary: string;
        environmentalImpact: string;
        costPerAcre: number;
        verdict: string;
        daysToGrow: number;
        waterUsed: number;
        lbsPerAcre: number;
        valuePerAcre: number;
    }

 
    
    export const dataForCrop = (crop: string): CropInformation => {
        return earthData.find(candidate => {
            return candidate.name == crop;
        }) as CropInformation;
    };
    
    export const findAlternateCrop = (crop: CropInformation): CropInformation => {
        return earthData.find(candidate => {
            return candidate.name !== crop.name && candidate.state === crop.state
        }) as CropInformation;
    };
    /**
    Array
       0    1      2    3
    Spring Summer Fall Winter 
     */
    export interface CropAmount {
        crop: string;
        acre: number; // in acres (remember to convert)
    }
    
    export enum Season {
        Spring = 'Spring',
        Summer = 'Summer',
        Fall = 'Fall',
        Winter = 'Winter',
    }
    
    export const SeasonToIdx = (season: Season): number => {
        switch (season) {
            case Season.Spring: return 0
            case Season.Summer: return 1
            case Season.Fall: return 2
            case Season.Winter: return 3
        }
    }
    
    export enum Month {
        January = 0,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December,
    }
    
    export const monthToSeason = (month: Month) => {
        if (month >= 2 && month < 5 ) {
            return Season.Spring;
        } else if (month >= 5 && month < 8) {
            return Season.Summer;
        } else if (month >= 8 && month < 11) {
            return Season.Fall;
        } else {
            return Season.Winter;
        }
    };
    
    export const seasonToMonth = (season: Season) => {
        switch (season) {
            case Season.Spring:
                return Month.March;
            case Season.Summer:
                return Month.June;
            case Season.Fall:
                return Month.September;
            case Season.Winter:
                return Month.December;
        }
    };
    
    export const cleanMonth = (month: number): Month => {
        // somehow normalize month to be within 0 and 11
        return (month + 12) % 12;
    }
    
    export const sqftToAcre = (sqft: number) => {
         // https://www.thecalculatorsite.com/conversions/area/square-feet-to-acres.php
        return 0.000022956841138659 * sqft;
    };
    
    export interface WaterUsageAndYieldOutput {
        waterUsage: number[];
        yield: number[];
    }
    
    export const determineWaterUsageAndYield = (array: CropAmount[]): WaterUsageAndYieldOutput => {
        const output: WaterUsageAndYieldOutput = {
            waterUsage: [0,0,0,0],
            yield: [0,0,0,0],
        };
    
        for (const item of array) {
            const cropData = dataForCrop(item.crop);
            const season = cropData.state;
            const endMonth = seasonToMonth(season);
            const numOfMonths = cropData.daysToGrow / 30;
            const startMonth = cleanMonth(endMonth - numOfMonths);
            console.log(`for ${item.crop}, startMonth: ${startMonth}, endMonth: ${endMonth}`)
    
            for (let j = 0; j <= numOfMonths; j++) {
                const month = cleanMonth(startMonth + j);
                const season = monthToSeason(month);
                const idx = SeasonToIdx(season);
    
                output.waterUsage[idx] += cropData.waterUsed * 91.25;
            }
            output.yield[SeasonToIdx(season)] += cropData.lbsPerAcre * item.acre;
        }
        return output;
    };
    
    interface SpendingAndRevenueOutput {
        spending: number[];
        revenue: number[];
    }
    
    export const determineSpendingAndRevenue = (array: CropAmount[]): SpendingAndRevenueOutput => {
        const output: SpendingAndRevenueOutput = {
            spending: [0,0,0,0],
            revenue: [0,0,0,0],
        };
    
        for (const item of array) {
            const cropData = dataForCrop(item.crop);
            console.log(item.crop)
            const season = cropData.state;
            const endMonth = seasonToMonth(season);
            const numOfMonths = cropData.daysToGrow / 30;
            const startMonth = cleanMonth(endMonth - numOfMonths);
    
            for (let j = 0; j <= numOfMonths; j++) {
                const month = cleanMonth(startMonth + j);
                const season = monthToSeason(month);
                const idx = SeasonToIdx(season);
    
                const cost = cropData.costPerAcre * item.acre;
                console.log(cropData.costPerAcre)
                console.log(item.acre)
                console.log(cost)
                const revenue = cropData.valuePerAcre * item.acre;
                output.spending[idx] += cost;
                output.revenue[idx] += revenue;
            }
        }
        
        return output;
    };


