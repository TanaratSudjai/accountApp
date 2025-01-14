<template>
    <div class="bg-[#f0f2f5] min-h-screen w-full p-4">
        <div class="max-w-4xl mx-auto mb-[150px]">
            <!-- Header Card -->
            <div
                class="bg-gradient-to-br from-[#4A90E2] to-[#2E5C8A] rounded-[20px] p-6 text-white mb-6 shadow-lg shadow-[#4A90E24D]">
                <div class="flex items-center mb-[20px]">
                    <div class="w-[60px] h-[60px] rounded-full bg-[#fff] mr-[15px] flex items-center justify-center">
                        <div class="text-3xl text-[#4A90E2]">
                            <UserRound class="w-10 h-10 text-[#4A90E2]" />
                        </div>
                    </div>
                    <div>
                        <h1 class="text-xl md:text-2xl mb-[5px]">สวัสดี, คุณสมชาย</h1>
                        <p class="opacity-90 text-sm">ข้อมูลการเงินของคุณ</p>
                    </div>
                </div>
                <div class="flex flex-col items-center m-[20px]">
                    <h2 class="opacity-90 text-base">ยอดเงินรวมทั้งหมด</h2>
                    <div class="text-3xl md:text-4xl font-bold m-[10px]">฿2,458,900.00</div>
                </div>
            </div>

            <!-- Grid Cards -->
            <div class="grid grid-cols-2 gap-3 md:gap-4 my-5">
                <div
                    class="bg-gradient-to-tr from-[#4CAF50] to-[#45a049] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(1)"
                    >
                    <ArrowUp class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">รายรับ</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿145,000</h3>
                </div>
                <div
                    class="bg-gradient-to-tr from-[#FF5252] to-[#FF1744] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(2)"
                    >
                    <ArrowDown class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">รายจ่าย</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿65,400</h3>
                </div>
                <div
                    class="bg-gradient-to-tr from-[#FFD700] to-[#FFC107] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(3)"
                    >
                    <Banknote class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">เงินสด</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿25,000</h3>
                </div>
                <div
                    class="bg-gradient-to-tr from-[#FFB74D] to-[#FFA726] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(4)"
                    >
                    <Landmark class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">เงินในธนาคาร</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿1,250,000</h3>
                </div>
                <div
                    class="bg-gradient-to-tr from-[#FF7043] to-[#FF5722] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(5)"
                    >
                    <ArrowUp class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">ลูกหนี้</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿145,000</h3>
                </div>
                <div
                    class="bg-gradient-to-tr from-[#9C27B0] to-[#7B1FA2] p-4 md:p-6 rounded-[20px] shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    @click="path(6)"
                    >
                    <ArrowDown class="object-cover text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                    <p class="opacity-90 text-white text-sm md:text-base">เจ้าหนี้</p>
                    <h3 class="text-lg md:text-2xl text-white font-bold">฿65,400</h3>
                </div>
            </div>

            <!-- Recent Transactions -->
            <div class="bg-white rounded-[20px] p-4 md:p-6 mt-[25px] shadow-md">
                <h2 class="mb-[20px] text-xl md:text-2xl font-bold">รายการล่าสุด</h2>
                <div class="flex p-[15px] items-center border-b-2">
                    <div
                        class="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center mr-[15px] bg-green-100">
                        <Plus class="object-cover text-green-500 w-5 h-5 md:w-6 md:h-6"></Plus>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-sm md:text-base">รับชำระจากลูกค้า</h3>
                        <p class="text-xs md:text-sm text-gray-600">15 นาทีที่แล้ว</p>
                    </div>
                    <div class="font-bold text-green-500 text-base md:text-lg"> +25000</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loaded = ref(false)
import { ArrowDown, ArrowUp, UserRound, Banknote, Landmark, Plus } from "lucide-vue-next";


onMounted(() => {
    // Simulate a loading delay
    setTimeout(() => {
        loaded.value = true
    }, 1000) // Adjust this timing as needed
})

const path = (menu) => {
    if(menu == 1)router.push('/transection_income') 
    if(menu == 2)router.push('/transection_expense') 
    if(menu == 3)router.push('/creditors') 
    if(menu == 4)router.push('/creditors') 
    if(menu == 5)router.push('/debtors') 
    if(menu == 6)router.push('/creditors') 
}
</script>
