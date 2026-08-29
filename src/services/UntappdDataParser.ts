export function parseUntappdCSV(content: string) {

    const columns: number = 32

    const beerNames: string[] = [];
    const breweryNames: string[] = [];
    const beerTypes: string[] = [];
    const abvs: number[] = [];
    const ibus: number[] = [];
    const comments: string[] = [];
    const venueNames: string[] = [];
    const venueCities: string[] = [];
    const venueStates: string[] = [];
    const venueCountries: string[] = [];
    const venueLatitudes: number[] = [];
    const venueLongitudes: number[] = [];
    const ratings: number[] = [];
    const createdAtDates: Date[] = [];
    const checkinIds: string[] = [];
    const beerIds: string[] = [];
    const breweryIds: string[] = [];
    const breweryCountries: string[] = [];
    const breweryCities: string[] = [];
    const breweryStates: string[] = [];
    const flavourProfiles: string[] = [];
    const purchaseVenues: string[] = [];
    const servingTypes: string[] = [];
    const photoUrls: string[] = [];
    const globalRatings: number[] = [];
    const globalWeightedRatings: number[] = [];
    const taggedFriends: string[] = [];
    const totalToasts: number[] = [];
    const totalComments: number[] = [];
    const checkinUrls: string[] = [];
    const beerUrls: string[] = [];
    const breweryUrls: string[] = [];

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
    }
}