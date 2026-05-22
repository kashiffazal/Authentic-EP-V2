/*eslint-disable no-useless-escape*/
/*eslint-disable no-unreachable*/

import moment from 'moment';



export const getCurrentFortnightDates = (fortnightOfDate = false) => {
  fortnightOfDate = fortnightOfDate ? fortnightOfDate : moment().format('YYYY-MM-DD');
  //Create fortnight List ---------------------------------//
  //Start from
  var startDate = '2021-02-08';
  var format = 'YYYY-MM-DD';
  var dateArr = [];
  dateArr.push(moment(startDate).format(format));
  for (var i = 0; i < 500; i++) { dateArr.push(moment(dateArr[i]).add(14, 'days').format(format)); }//End for loop
  //------------------------------------------------------//
  //Check nereast week of given date and make fortnight date range 
  var fortnightDates = [];
  for (let i = 0; i < dateArr.length; i++) {
    if (moment(fortnightOfDate).isBefore(dateArr[i])) {
      fortnightDates.push(moment(dateArr[i - 1]).format(format));
      fortnightDates.push(moment(dateArr[i]).add(-1, 'days').format(format));
      break;
    }//End if condition
  }
  return fortnightDates;
}//End function

export const currentDay = () => {
  return [[moment().format('YYYY-MM-DD'), moment().format('dddd')]];
}//End function

export const currentWeekOr2WeeksOr4Week = (type) => {
  let startDate = getCurrentFortnightDates()[0];
  let currentDate = moment().format('YYYY-MM-DD');
  let dates = [[moment(startDate).format('YYYY-MM-DD'), moment(startDate).format('dddd')]]
  let weeks = [[...dates], []];
  let currentWeekType = '';
  for (let i = 0; i < (type === 'fourWeeks' ? 27 : 13); i++) {
    var calculatedDate = [moment(dates[i][0]).add(1, 'days').format('YYYY-MM-DD'), moment(dates[i][0]).add(1, 'days').format('dddd')];
    dates.push(calculatedDate);
    if (i < 6) {
      if (moment(currentDate).isSame(calculatedDate[0])) { currentWeekType = 1; }//End if condition
      weeks[0].push(calculatedDate);
    } else {
      if (moment(currentDate).isSame(calculatedDate[0])) { currentWeekType = 2; }//End if condition
      weeks[1].push(calculatedDate);
    }//#ne function
  }//End function

  if(type === 'currentWeek'){return weeks[currentWeekType - 1];}
  if(type === 'twoWeeks' || type === 'fourWeeks'){return dates;}

}//End function

export const currentMonth = () => {
  let startOf = moment().startOf('month');
  let daysInMonth = startOf.daysInMonth();
  let arrDays = [[startOf.format('YYYY-MM-DD'), moment(startOf).format('dddd')]];
  for (let i = 0; i < (daysInMonth - 1); i++) {
    arrDays.push([moment(arrDays[i][0]).add(1, 'days').format('YYYY-MM-DD'), moment(arrDays[i][0]).add(1, 'days').format('dddd')]);
  }//End for loop
  return arrDays;
}//End function