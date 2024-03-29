import React, { useState } from 'react';

const Base64ToImageConverter: React.FC = () => {
  const [imageSource, setImageSource] = useState<string | null>(null);

  const handleBase64ToImageConversion = (base64String: string) => {
    setImageSource(base64String);
  };

  // Function to handle file input change
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleBase64ToImageConversion(reader.result);
        }
      };

      reader.onerror = error => {
        console.error('Error converting file to base64:', error);
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {imageSource && (
        <div>
          <h2>Converted Image</h2>
          <img src={imageSource} alt="Converted" />
        </div>
      )}
    </div>
  );
};

export default Base64ToImageConverter;
