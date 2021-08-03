export const getBestHashTag = (hashTags, title) => {
  let copy = [...hashTags];
  copy = copy.filter((tag) => title.includes(tag));
  copy.sort((t1, t2) => t1 > t2);
  copy.sort((t1, t2) => t2.length - t1.length);
  let keyword = copy[0];
  // return keyword;
  return keyword || '키워드없음';
};
