import type { Drink } from './Drink';

export interface Checkin {
    untappdCheckinId?: string;

    drink: Drink;

    rating: number;
    checkinDate: Date;

    comment?: string;
}