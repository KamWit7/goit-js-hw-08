export const createGalery = (galleryItems, query) => {
  const galleryArray = galleryItems.map(ele => {
    const { preview, original, description } = ele;
    return query({ preview, original, description });
  });
  return galleryArray.join('');
};
