export const formatNumber = amount => {
 return new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
 }).format(amount);
};
