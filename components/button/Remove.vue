<template>
  <div class="flex w-full gap-2 justify-center">
    <button
      @click="confirmAndRemove"
      class="bg-cyan-600 rounded-xl text-white cursor-pointer hover:bg-cyan-700 transition w-[98%] sm:w-[48%]"
    >
      รีเซ็ทรายการธุรกรรม
    </button>
    <button
      @click="confirmAndRemoveType"
      class="bg-cyan-600 rounded-xl text-white cursor-pointer hover:bg-cyan-700 transition w-[98%] sm:w-[48%]"
    >
      เคลียร์ข้อมูลเพื่อเปิดบัญชีใหม่
    </button>
  </div>
</template>

<script setup>
const confirmAndRemove = async () => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ทรายการธุรกรรม?")) {
    try {
      await fetch("http://localhost:5000/api/removetransition", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching transition:", error);
      alert("ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  }
};

const confirmAndRemoveType = async () => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ทรายการธุรกรรม?")) {
    try {
      await fetch("http://localhost:5000/api/removedatatype", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching transition:", error);
      alert("ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  }
};
</script>
