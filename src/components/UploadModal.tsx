import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (image: string, name: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [actorName, setActorName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read the file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      setError('Please upload an image');
      return;
    }
    
    if (!actorName.trim()) {
      setError('Please enter the actor name');
      return;
    }
    
    onUpload(image, actorName);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Upload Actor Image</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Actor Image</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
              {image ? (
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-600 rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto mb-2" size={32} />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag and drop an image, or click to browse
                  </p>
                  {isLoading && <p>Loading...</p>}
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={image ? "hidden" : "absolute inset-0 w-full h-full opacity-0 cursor-pointer"}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="actorName" className="block text-sm font-medium mb-2">
              Actor Name
            </label>
            <input
              type="text"
              id="actorName"
              value={actorName}
              onChange={(e) => setActorName(e.target.value)}
              placeholder="e.g., Tom Hanks"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600/40 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
              disabled={!image || !actorName.trim()}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;