const CurrentAngka = (number) => {
  const formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(number);
};
export default CurrentAngka;
