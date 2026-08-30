export interface RetailDrink {
  untappdId?: string;
  ean: string;

  retailChain?: string;

  name: string;
  brand?: string;
  brandCountry?: string;
  price?: number;

  storeCategory?: string;

  drinkType: string;

  abv?: number;
}