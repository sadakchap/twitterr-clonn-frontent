export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}
export function isLeapYear(input) {
  const year = parseInt(input);
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getNumberOfDays(month, year) {
  let numberOfDays = 31;
  if (year && month) {
    return new Date(year, month, 0).getDate();
  }
  numberOfDays = month % 2 === 0 ? 30 : 31;
  if (month === 2) {
    numberOfDays = 28;
  }
  return numberOfDays;
}
