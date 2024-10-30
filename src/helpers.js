export function getAverage(...nums) {
  let suma = 0;
  nums.forEach((num) => (suma += num));

  return (suma / nums.length).toFixed(1);
}
