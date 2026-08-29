import type { Checkin } from "./models/Checkin";
import { parseUntappdCSV } from "./services/UntappdDataParser";

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
    };
    reader.readAsText(file);
}