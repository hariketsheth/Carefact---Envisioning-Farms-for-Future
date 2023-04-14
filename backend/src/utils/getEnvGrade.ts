
interface Grade {
    score: Score;
    description: string
}
enum Score {
    "F" = 0,
    "D",
    "D+",
    "C",
    "C+",
    "B",
    "B+",
    "A",
    "A+"
}

const scoreToDescription = (score: Score): string => {
    switch(score) {
        case Score.A, Score["A+"]: return "This place is great overall, the temperature is near perfect, and the moisture is flawless as well!"
        case Score.B, Score["B+"]: return "This place is not bad, the temperature is pretty good, but the soil moisture isn't the best — watering and fertilizing will be key to get the most out of this space."
        case Score.C, Score["C+"]: return "This place isn't the best — it's temperature isn't in a great range nor is the soil moisture suitable for industrial farming. You'll need a lot of heaters / fans + fertilizer + water to build on this spot."
        case Score.D, Score["D+"]: return "We wouldn't recommend farming here. The temperature is not conducive to agricultural growth"
        case Score.F: return "We cannot give any recommendations for farming here — The temperature is not conducive to agricultural growth and the soil moisture is horrible"
    }
}

/*
A: This place is great overall, the temperature is near perfect, and the moisture is flawless as well!
B: This place is not bad, the temperature is pretty good, but the soil moisture isn't the best — watering and fertilizing will be key to get the most out of this space.
C: This place isn't the best — it's temperature isn't in a great range nor is the soil moisture suitable for industrial farming. You'll need a lot of heaters / fans + fertilizer + water to build on this spot.
D: We wouldn't recommend farming here. The temperature is not conducive to agricultural growth
F: We cannot give any recommendations for farming here — The temperature is not conducive to agricultural growth and the soil moisture is horrible
*/
export const numToGrade = (score: number): Grade => {
    score = Math.round(score);
    return {
        score: score,
        description: scoreToDescription(score)
    }
}

export const getGrade = (moisture: number,temp: number): number  => {
    const weights = [0.1,0.9];
    const moistureScore = 1 - Math.abs(40 - moisture)/40;
    const tempScore = 1 - Math.abs(70 - temp)/70;
    return (moistureScore*weights[0] + tempScore*weights[1]) * 9;
}