
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
        case Score.A, Score["A+"]: return "Air quality is satisfactory, and air pollution poses little or no risk."
        case Score.B, Score["B+"]: return "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
        case Score.C, Score["C+"]: return "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
        case Score.D, Score["D+"]: return "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
        case Score.F: return "Health alert: The risk of health effects is increased for everyone."
    }
    return "Air quality is satisfactory, and air pollution poses little or no risk."
}

export const numToGrade = (score: number): Grade => {
    score = Math.round(score);
    return {
        score: score,
        description: scoreToDescription(score)
    }
}

export const getGrade = (aqi: number): Score => {
    if (aqi < 37.5) return Score["A+"];
    else if (aqi < 75) return Score["A"];
    else if (aqi < 112.5) return Score["B+"];
    else if (aqi < 150) return Score["B"];
    else if (aqi < 187.5) return Score["C+"];
    else if (aqi < 225) return Score["C"];
    else if (aqi < 262.5) return Score["D+"];
    else if (aqi < 300) return Score["D"];
    else  return Score["F"];
}