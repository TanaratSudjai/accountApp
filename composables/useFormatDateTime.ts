export const useFormatDateTime = () => {
  const formatDateTime = (datetime: string): string => {
    const date = new Date(datetime);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime(); // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
      return "เมื่อสักครู่";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} นาทีที่แล้ว`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ชั่วโมงที่แล้ว`;
    } else {
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return { formatDateTime };
};
