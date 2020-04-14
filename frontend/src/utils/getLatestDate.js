export const getLastDates = (dates, time) =>{
  return dates.filter(dt => {
    const date1 = new Date(dt);
    if(new Date() < date1) return false;
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
}
