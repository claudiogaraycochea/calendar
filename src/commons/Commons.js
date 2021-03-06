export const copyObj = (str = '') => {
    return JSON.parse(JSON.stringify(str));
}

export const dataMonth = {
  getToday: () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const previousMonth = today.getMonth();
    const year = today.getFullYear();
    const dayPosition = new Date(year, today.getMonth(), 1).getDay(); // day position to start the actual month
    const monthDataEndDay = new Date(year, month, 0).getDate(); // calculate total month days.
    const prevMonthDataEndDay = new Date(year, previousMonth, 0).getDate();
    const prevMonthDataStartDay = (prevMonthDataEndDay - dayPosition);
    const dateObject = {
      day,
      month,
      year,
      monthData: {
        dayPosition,
        endDay: monthDataEndDay,
      },
      prevMonthData: {
        startDay: prevMonthDataStartDay,
        endDay: prevMonthDataEndDay,
      }
    }
    return dateObject;
  },
  getDayNumberToName: (dayNumber) => {
    switch (dayNumber) {
      case 1: return 'sun';
      case 2: return 'mon';
      case 3: return 'tue';
      case 4: return 'wed';
      case 5: return 'thu';
      case 6: return 'fri';
      case 7: return 'sat';
      default: return null;
    }
  }
}