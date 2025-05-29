
export const useFormatThaiDate = () => {
  const FormatThaiDate = (dateString: string) =>{
    const monthsThai = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
      'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
      'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const time = new Date().getTime();
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) return 'วันที่ไม่ถูกต้อง';
  
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543;
  
    return `วันที่ ${day} เดือน ${month} พ.ศ. ${year} `;
  };

  // เวลา ${date.toLocaleTimeString('th-TH', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit'
  //   })}

  return { FormatThaiDate }
};


