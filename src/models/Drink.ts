export interface Drink {
  untappdId?: string;

  name: string;
  breweryName: string;
  breweryCountry?: string;

  beerType: string;

  abv?: number;
  ibu?: number;
}