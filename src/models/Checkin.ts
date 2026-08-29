import type { UntappdDrink } from './UntappdDrink';

export interface Checkin {
    untappdCheckinId?: string;

    drink: UntappdDrink;

    rating: number;
    checkinDate: Date;

    comment?: string;
}