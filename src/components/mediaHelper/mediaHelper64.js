export const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};


export const getFileFormat = (file) => {
    const extensionFromName = file.name.split('.').pop();
    return `.${extensionFromName}`;
};

const getFileType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'image/' + extension;
        case 'pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
};

export const handleFileDownloadOrView = (file) => {
    const getMimeType = getFileType(file?.genType)
    const byteCharacters = atob(file.base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const mimeType = getMimeType;
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
        newWindow.onload = () => URL.revokeObjectURL(url);
    }
};