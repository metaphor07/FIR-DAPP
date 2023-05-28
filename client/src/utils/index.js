export const daysLeft = (deadline) => {
  // const difference = new Date(deadline).getTime() - Date.now();
  //   const difference = deadline - Date.now();
  //   const remainingDays = difference / (1000 * 3600 * 24);
  //   return remainingDays.toFixed(0);
  //   var test = new Date(deadline);
  let dt = new Date(deadline * 1000).toLocaleString();
  let date = dt.split(",")[0];
  return date;
};
