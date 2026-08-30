import type { RetailDrink } from "../models/RetailDrink";

interface RawRetailDrink {
    untappdId?: string;
    ean: string | number;
    retailChain?: string;
    name: string;
    brand?: string;
    brandCountry?: string;
    price?: number;
    storeCategory?: string;
    drinkType: string;
    abv?: number;
}

export function loadRetailDrinksFromData(rawDrinks: RawRetailDrink[]): RetailDrink[] {
    return rawDrinks.map(item => ({
        untappdId: item.untappdId,
        ean: item.ean.toString(),
        retailChain: item.retailChain,
        name: item.name,
        brand: item.brand,
        brandCountry: item.brandCountry,
        price: item.price,
        storeCategory: item.storeCategory,
        drinkType: item.drinkType,
        abv: item.abv
    }));
}