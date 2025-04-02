export const useFormatNumber = () => {
  const formatNumber = (value: number | string) => {
    if (!value) return "0";
    return new Intl.NumberFormat("en-US").format(Number(value));
  };
  return { formatNumber };
};
