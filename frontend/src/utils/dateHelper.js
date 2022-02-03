export const getLastDates = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt);
    //if(new Date() < date1) return false;
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

export const expiringIn = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt.expiryDate);
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

export const expired = (dates, time) => {
  return dates.filter((dt) => {
    const date1 = new Date(dt.expiryDate);
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - time * 3600;
    const is24 = date1 <= new Date(timeStampYesterday * 1000).getTime();
    return is24;
  });
};

export const Count = (data) => {
  var sum = 0;
  if (typeof data == "object") {
    data.forEach((expire) => {
      sum += parseFloat(expire.quantity);
    });
  }
  return sum;
};

export const formatDate = (date, format) => {
  console.log(date)
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (format === "mmyyyy") return [month, year].join("/");

  return [day, month, year].join("/");
};

export const formatTime = (d) => {
  const date = new Date(d);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + "" + ampm;
  return strTime;
};

export const formatTimeAMPM = (d) => {
  const date = d.split(":");
  var hours = parseInt(date[0]);
  var minutes = parseInt(date[1]);
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + "" + ampm;
  return strTime;
};
