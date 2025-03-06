<template>
  <div class="flex w-full gap-2 justify-center">
    <button
      @click="confirmAndRemove"
      class="bg-[#111827] text-green-400 opacity-[90%] rounded-xl p-1 text-sm cursor-pointer hover:bg-cyan-700 transition w-full md:w-[50%]"
    >
      รีเซ็ทรายการธุรกรรม
    </button>
    <button
      @click="confirmAndRemoveType"
      class="bg-[#374151] text-green-400 opacity-[90%] rounded-xl p-1 text-sm cursor-pointer hover:bg-cyan-700 transition w-full md:w-[50%]"
    >
      เคลียร์ข้อมูลเพื่อเปิดบัญชีใหม่
    </button>
  </div>
</template>

<script setup>
const confirmAndRemove = async () => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ทรายการธุรกรรม?")) {
    try {
      await fetch("/removetransition", {
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
      await fetch("/removedatatype", {
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
