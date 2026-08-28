const uploadButton = document.getElementById("upload-button");

uploadButton?.addEventListener("click", handleFileUpload);

function handleFileUpload() {
    const input = document.getElementById("file-input") as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log(content);
    };
    reader.readAsText(file);
}