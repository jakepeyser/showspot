export const placeCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseDate = (dateString) => {
  let parts = dateString.match(/([a-zA-Z]+, [a-zA-Z]+ [\d]{1,2}), [\d]{4} at (.+)/);
  return {
    day: parts[1],
    time: parts[2]
  };
};
