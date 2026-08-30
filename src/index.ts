import type { Checkin } from "./models/Checkin";
import { parseUntappdCSV } from "./services/UntappdDataParser";
import { analyzeBeerStyles } from "./services/UserFlavourProfileService";

const uploadButton = document.getElementById("upload-button");

uploadButton?.addEventListener("click", handleFileUpload);

function handleFileUpload() {
    const input = document.getElementById("file-input") as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const content = e.target?.result as string;
        const checkins: Checkin[] = parseUntappdCSV(content);
        console.log(checkins);

        const flavourProfile = analyzeBeerStyles(checkins);
        const sortedFlavourProfile = new Map([...flavourProfile.entries()].sort((a, b) => b[1] - a[1]));
        console.log(sortedFlavourProfile)
    };
    reader.readAsText(file);
}