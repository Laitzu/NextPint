// Analysis of user untappd drinks and simple flavour profile goes here

// The flavour profile could use things like top 3 beer styles (e.g. IPA, Pale Lager, Stout) in the beginning

// The ABV could also be used to determine some sort of simple preference (Low, Medium, High).

import type { Checkin } from "../models/Checkin";


export function analyzeBeerStyles(checkins: Checkin[]): Map<string, number> {
    const styleCount = new Map<string, number>();

    for (const checkin of checkins) {
        const style = checkin.drink.drinkType;
        styleCount.set(style, (styleCount.get(style) ?? 0) + 1);
        }
        return styleCount;
    }

export function analyzeABVPreference(checkins: Checkin[]): number {
    let sumRatingTimesABV: number = 0;
    let sumOfRatings: number = 0;

    checkins.forEach(checkin => {
        if(checkin.rating && checkin.drink.abv) {
            sumRatingTimesABV += checkin.drink.abv * checkin.rating;
            sumOfRatings += checkin.rating;
        }
    });
    if(sumOfRatings == 0) {
        return 0;
    }

    return sumRatingTimesABV / sumOfRatings;
}