import dayjs from 'dayjs';

export const formatNumber = amount => {
 return new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
 }).format(amount);
};

export const calculateDateAfterYears = (date, yearsToAdd) => {
 const years = Number(yearsToAdd);
 return dayjs(date).add(years, 'year').format('YYYY-MM-DD');
};
