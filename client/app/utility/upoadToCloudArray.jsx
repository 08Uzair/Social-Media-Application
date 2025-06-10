import { toast } from "react-toastify";

const cloudName = 'dyphiefiy'; // Your Cloudinary cloud name
const uploadPreset = 'social'; // Your upload preset

export const uploadToCloudArray = async (files) => {
  if (!files || files.length === 0) return [];

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

  const uploadPromises = Array.from(files).map(async (file) => {
    // File type validation
    if (!allowedTypes.includes(file.type)) {
      toast.error(`File "${file.name}" is not a PNG, JPG, or WEBP!`);
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Error uploading "${file.name}"!`);
      return null;
    }
  });

  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls.filter((url) => url !== null); // Remove failed uploads
};
