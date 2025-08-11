import Swal from "sweetalert2";

export function useAlert() {
  const showAlert = (
    title: string,
    text: string,
    icons: "success" | "error" | "warning" | "info" = "info",
    confirmButtonColor: string = "oklch(58.8% 0.158 241.966)"
  ) => {
    Swal.fire({
      html: `
        <div class="flex flex-col items-center space-y-2 ">
          <h2 class="text-md text-nowrap font-semibold text-gray-800">${title}</h2>
          <p class="text-sm text-gray-600">${text}</p>
        </div>
      `,
      icon: icons,
      iconColor: "oklch(58.8% 0.158 241.966)",
      width: "380px",
      padding: "1rem",
      background: "#fff",
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
      confirmButtonColor,
      customClass: {
        popup: "rounded-lg shadow-md",
        confirmButton: "px-3 py-1.5 text-sm rounded-md",
      },
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  };

  const confirmAlert = (
    title: string,
    text: string,
    confirmButtonColor: string = "oklch(58.8% 0.158 241.966)"
  ) => {
    return Swal.fire({
      title,
      text,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Yes, delete it!",
    });
  };

  return { showAlert, confirmAlert};
}
