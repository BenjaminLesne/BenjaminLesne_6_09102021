async function incrementLikeCount(myData, id) {
  let pictureId;
  let info;
  const data = myData;
  if (!Number.isNaN(id)) {
    pictureId = parseInt(id, 10);
  } else {
    pictureId = id;
  }

  for (let i = 0; i < data.media.length; i += 1) {
    if (data.media[i].id === pictureId) {
      data.media[i].likes += 1;

      const index = i;
      i = data.media.length;

      info = {
        index,
        likes: data.media[index].likes,
      };
    }
  }

  return info;
}

export default incrementLikeCount;
