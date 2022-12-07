export const formattedTotal = (data) => {
  const option = { maximumSignificantDigits: 6 };
  return new Intl.NumberFormat("Ko-KR", option).format(data);
};

export const formattedDates = (data) => {
  return new Intl.DateTimeFormat("ko-KR").format(data);
};
