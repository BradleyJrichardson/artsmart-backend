const convertTime = epoch => {
  return new Date(epoch * 1000).toDateString();
};

console.log(convertTime(1563520115));
