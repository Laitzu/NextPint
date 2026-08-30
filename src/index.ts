import type { Checkin } from "./models/Checkin";
import { parseUntappdCSV } from "./services/UntappdDataParser";
import { analyzeABVPreference, analyzeBeerStyles } from "./services/UserFlavourProfileService";
import { loadRetailDrinksFromData } from "./services/RetailDrinkLoader";
import rawKKaupatDrinks from "../data/k-ruoka/retail_drinks.json";
import rawSKaupatDrinks from "../data/s-kaupat/retail_drinks.json";

const uploadButton = document.getElementById("upload-button");

uploadButton?.addEventListener("click", handleFileUpload);

function handleFileUpload() {
    const input = document.getElementById("file-input") as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const content = e.target?.result as string;

        // Parse checkins into Checkin schema format
        const checkins: Checkin[] = parseUntappdCSV(content);
        console.log(checkins);

        // Count amount of beer styles user has checked in / tasted
        const beerStyleCounts = analyzeBeerStyles(checkins);
        const sortedBeerStyleCounts = new Map([...beerStyleCounts.entries()].sort((a, b) => b[1] - a[1]));
        console.log(sortedBeerStyleCounts)

        // Record a naive analysis of preferred ABV through
        // simple weighted average using the rating and ABF of drinks
        // with the following formula:
        // Sum(ABVs * DrinkRatings) / Sum(DrinkRatings)
        const preferenceABV = analyzeABVPreference(checkins);
        console.log(preferenceABV);

        // Load K-Kaupat and S-Kaupat drinks to RetailDrink schema format
        // from the semi-manually scraped and parsed product data

        const KKaupatDrinks = loadRetailDrinksFromData(rawKKaupatDrinks);
        const SKaupatDrinks = loadRetailDrinksFromData(rawSKaupatDrinks);
        console.log(KKaupatDrinks);
        console.log(SKaupatDrinks);

    };
    reader.readAsText(file);
}