export const useFormatNumber = () => {
  const formatNumber = (value: number | string) => {
    if (value === null || value === undefined || value === "") return "0.00";
    const numberValue = parseFloat(value.toString());
    if (isNaN(numberValue)) return "0";

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2, 
    }).format(numberValue);
  };

  return { formatNumber };
};
