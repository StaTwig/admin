exports.getLastDates = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt);
    //if(new Date() < date1) return false;
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

exports.expiringIn = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt.expiryDate);
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

exports.expired = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt.expiryDate);
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 <= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

exports.Count = (data) => {
  var sum = 0;
  if (typeof data == "object") {
    data.forEach((expire) => {
      sum += parseFloat(expire.quantity);
    });
  }
  return sum;
};
