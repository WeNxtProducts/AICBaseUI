export const readFileAsByteArray = file => {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
   const arrayBuffer = reader.result;
   const byteArray = new Uint8Array(arrayBuffer);
   const byteArrayFormatted = Array.from(byteArray);
   resolve(byteArrayFormatted);
  };
  reader.onerror = error => reject(error);
  reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
 });
};

export const getFileFormat = file => {
 // Extract file extension from the name property
 const extensionFromName = file.name.split('.').pop();

 // Extract file type and convert to extension
 const extensionFromType = file.type.split('/').pop();

 // Return the file format/extension
 return `.${extensionFromName}`;
};

const getFileType = filename => {
 const extension = filename.split('.').pop().toLowerCase();
 switch (extension) {
  case 'png':
  case 'jpg':
  case 'jpeg':
   return 'image/' + extension;
  case 'pdf':
   return 'application/pdf';
  default:
   return 'application/octet-stream'; // Default for unknown types
 }
};

const isImage = filename => {
 const extension = filename.split('.').pop().toLowerCase();
 return ['png', 'jpg', 'jpeg'].includes(extension);
};

const isPDF = filename => {
 const extension = filename.split('.').pop().toLowerCase();
 return extension === 'pdf';
};

export const handleFileDownloadOrView = file => {
 const byteArray = new Uint8Array(file.byteArray);

 // Convert byteArray to Blob
 const blob = new Blob([byteArray], { type: getFileType(file.filename) });

 // Create a URL for the Blob
 const url = URL.createObjectURL(blob);

 // Open in a new tab or trigger download
 if (isImage(file?.filename) || isPDF(file?.filename)) {
  // Open in a new tab to view the image or PDF
  window.open(url, '_blank');
 } else {
  // Trigger download for other file types
  const link = document.createElement('a');
  link.href = url;
  link.download = file.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 }

 // Clean up the URL object
 URL.revokeObjectURL(url);
};

const handleDownload = (event, file) => {
 event.preventDefault();
 const url = URL.createObjectURL(file);
 const link = document.createElement('a');
 link.href = url;
 link.download = file.name; // Ensures the file is downloaded
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 URL.revokeObjectURL(url);
};
