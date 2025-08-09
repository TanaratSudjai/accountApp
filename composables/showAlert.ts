import Swal from "sweetalert2";

export function useAlert() {
  const showAlert = (
    title: string,
    text: string,
    confirmButtonColor: string = "oklch(58.8% 0.158 241.966)"
  ) => {
    Swal.fire({
      html: `
        <div class="flex flex-col items-center space-y-2 ">
          <h2 class="text-md text-nowrap font-semibold text-gray-800">${title}</h2>
          <p class="text-sm text-gray-600">${text}</p>
        </div>
      `,
      icon: "info",
      iconColor: "oklch(58.8% 0.158 241.966)",
      width: "350px",
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

  return { showAlert };
}
