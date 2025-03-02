import React, { useRef, useEffect } from 'react';

interface PixelatedImageProps {
  src: string;
  pixelationLevel: number;
}

const PixelatedImage: React.FC<PixelatedImageProps> = ({ src, pixelationLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Calculate pixel size based on pixelation level (1-30)
      // Higher pixelation level = larger pixels = more pixelated
      const pixelSize = Math.max(1, Math.ceil((pixelationLevel / 30) * 20));
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Pixelate the image
      const width = img.width;
      const height = img.height;
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Loop through each pixel block
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          // Get the color of the first pixel in the block
          const red = data[((y * width + x) * 4)];
          const green = data[((y * width + x) * 4) + 1];
          const blue = data[((y * width + x) * 4) + 2];
          
          // Fill the entire block with this color
          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };
    
    return () => {
      img.onload = null;
    };
  }, [src, pixelationLevel]);
  
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto object-cover"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
};

export default PixelatedImage;