import React from "react";

const filterByDate = (sourceNotifications) => {
  let targetNotifications = [];
  let currentDate = new Date().toLocaleDateString();
  let date = "";
  let length = 0;
  sourceNotifications.forEach((element) => {
    date = new Date(element.created).toLocaleDateString();
    date = date === currentDate ? "today" : date;
    length = targetNotifications.length;
    if (length > 0 && date === targetNotifications[length - 1].date) {
      targetNotifications[length - 1].notifications.push(element);
    } else {
      targetNotifications.push({
        date: date,
        notifications: [element],
      });
    }
  });
  return targetNotifications;
};

export default filterByDate;
