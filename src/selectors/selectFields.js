export const selectFields = ({ id, by, url, time, title ,kids} = {}) => ({
  id,
  by,
  url,
  time,
  title,
  kids,
});

export const allComments = ({ id, text} = {}) => ({
  id, 
  text
});

