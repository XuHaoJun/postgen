export async function imageToDataUrl(imageUrl: string) {
    return new Promise((resolve, reject) => {
        // Create new image object
        const img = new Image();
        
        // Handle CORS issues
        img.crossOrigin = 'Anonymous';
        
        img.onload = function() {
            try {
                // Create canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                
                // Set canvas dimensions to image dimensions
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw image on canvas
                ctx.drawImage(img, 0, 0);
                
                // Convert to base64
                const dataUrl = canvas.toDataURL('image/png');
                resolve(dataUrl);
            } catch (error: any) {
                reject(new Error('Error converting image to base64: ' + error.message));
            }
        };
        
        img.onerror = function() {
            reject(new Error('Error loading image'));
        };
        
        // Set image source to start loading
        img.src = imageUrl;
    });
}