export interface UntappdDrink {
  drinkId?: string;

  name: string;
  breweryName: string;
  breweryCountry?: string;

  drinkType: string;

  abv?: number;
  ibu?: number;
}