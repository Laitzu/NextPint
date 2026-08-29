import type { UntappdDrink } from '../models/UntappdDrink';
import type { Checkin } from '../models/Checkin';

export function parseUntappdCSV(content: string) : Checkin[] {

    const columns: number = 32
    const checkInList: Checkin[] = [];

    // Lets first get the column numbers for the fields we care about.
    // This way the order of columns can change without breaking the parser.
    const headerLine: string = content.split("\n")[0];
    const headerFields: string[] = headerLine.split(",");

    const drink_id_col: number = headerFields.indexOf("bid");
    const drink_name_col: number = headerFields.indexOf("beer_name");
    const brewery_name_col: number = headerFields.indexOf("brewery_name");
    const brewery_country_col: number = headerFields.indexOf("brewery_country");
    const drink_type_col: number = headerFields.indexOf("beer_type");
    const drink_abv_col: number = headerFields.indexOf("beer_abv");
    const drink_ibu_col: number = headerFields.indexOf("beer_ibu");

    const checkin_id_col: number = headerFields.indexOf("checkin_id");
    const rating_col: number = headerFields.indexOf("rating_score");
    const checkin_date_col: number = headerFields.indexOf("created_at");
    const comment_col: number = headerFields.indexOf("comment");

    // Ugly parsing of CSV of my own creation because some fields contain commas and quotes.

    for (let line of content.split("\n").slice(1)) {
        // After slicing per newline, lets add one to the end of each line
        // So we can parse the last field in the line.
        line = line + "\n";

        let field: string = "";
        let parsedLine: string[] = [];
        let foundQuotes: boolean = false;
        let lastChar: string = "";

        for (const char of line) {
            if(char === '"' && !foundQuotes) {  // Start of a quoted field
                foundQuotes = true;
                continue;
            }
            if(char === '"' && foundQuotes) {   // End of a quoted field
                if(field[0] === ",") {
                    field = field.slice(1);
                }
                foundQuotes = false;
                parsedLine.push(field);
                field = "";
                lastChar = char;
                continue;
            }
            if(char === "," && !foundQuotes && lastChar !== '"') {  // End of a non-quoted field
                if(field[0] === ",") {
                    field = field.slice(1);
                }
                parsedLine.push(field);
                field = "";
                continue;
            }
            if(char === "\n") { // End of line
                parsedLine.push(field.trim());
                break;
            }
            field += char;
            lastChar = char;
        }

        // After parsing the line, populate the objects with the parsed data.
        const untappdDrink: UntappdDrink = {
            drinkId: parsedLine[drink_id_col],

            name: parsedLine[drink_name_col],
            breweryName: parsedLine[brewery_name_col],
            breweryCountry: parsedLine[brewery_country_col],

            drinkType: parsedLine[drink_type_col],

            abv: parseFloat(parsedLine[drink_abv_col]),
            ibu: parseFloat(parsedLine[drink_ibu_col])
        };
        const checkin: Checkin = {
            untappdCheckinId: parsedLine[checkin_id_col],

            drink: untappdDrink,

            rating: parseFloat(parsedLine[rating_col]),
            checkinDate: new Date(parsedLine[checkin_date_col]),

            comment: parsedLine[comment_col]
        };
        checkInList.push(checkin);
    }
    return checkInList;
}