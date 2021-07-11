export const getBestHashTag = (hashTags) => {
  let copy = [...hashTags];
  copy.sort((t1, t2) => t1 > t2);
  copy.sort((t1, t2) => t2.length - t1.length);
  let keyword = copy[0];
  return keyword;
};
