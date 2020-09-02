//calculate player percentage for each stat type
//calculate player total reps for each stat type
//calculate team percentage for stat type
//compare that to the day before's

export const datesAreInRange = (first, second, dateParam) => {
  if (dateParam === 'day') {
      return (
          first.getFullYear() === second.getFullYear() &&
          first.getMonth() === second.getMonth() &&
          first.getDate() === second.getDate()
      );
  } else if (dateParam === 'week') {
      //gotta fix this one man
      return true;
  } else if (dateParam === 'month') {
      return (
          first.getFullYear() === second.getFullYear() &&
          first.getMonth() === second.getMonth()
      );
  } else if (dateParam === 'year') {
      return (
          first.getFullYear() === second.getFullYear()
      )
  } else {
      return true;
  }
}