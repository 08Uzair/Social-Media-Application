const cloudName = 'dyphiefiy'; // Your Cloudinary cloud name
const uploadPreset = 'social'; // Your upload preset

export const uploadToCloudArray = async (files) => {
  if (!files || files.length === 0) return [];

  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  });

  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls.filter((url) => url !== null); // remove failed uploads
};
