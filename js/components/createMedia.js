function createMedia(data, id) {
  const result = [];

  for (let i = 0; i < data.media.length; i += 1) {
    if (data.media[i].photographerId === parseInt(id, 10)) {
      const media = {
        image: data.media[i].image,
        photographerId: data.media[i].photographerId,
        title: data.media[i].title,
        likes: data.media[i].image,
      };

      result.push(media);
    }
  }

  return result;
}

export default createMedia;
