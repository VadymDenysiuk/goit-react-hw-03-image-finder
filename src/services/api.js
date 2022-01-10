function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=24210531-913aea170a5833c8fd964936d&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Некорректный запрос, повторите, пожалуйста'));
  });
}

export default fetchImages;
