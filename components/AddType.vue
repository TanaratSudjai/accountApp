<template>
    <div class="flex justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="p-6 sm:p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl">
            <div>
                <button @click="goBack">Back</button>
            </div>

            <div class="flex justify-center mb-4">
                <TypeGetName></TypeGetName>
            </div>
            <form @submit.prevent="submitForm" class="space-y-2">
                <label htmlFor="phone" className="text-gray-800 text-sm block">
                    ชื่อประเภท
                </label>
                <div class="relative flex items-center">
                    <input type="text" placeholder="account_type_name"
                        class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        v-model="formData.account_type_name" />
                </div>
                <label htmlFor="phone" className="text-gray-800 text-sm  block">
                    จำนวนเงิน
                </label>
                <div class="relative flex items-center">
                    <input type="text" placeholder="account_type_amount"
                        class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        v-model="formData.account_type_value" />
                </div>
                <label htmlFor="phone" className="text-gray-800 text-sm  block">
                    คำอธิบาย
                </label>
                <div class="relative flex items-center">
                    <input type="text" placeholder="account_type_description"
                        class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        v-model="formData.account_type_description" />
                </div>
                <label htmlFor="phone" className="text-gray-800 text-sm  block">
                    เลือกประเภท
                </label>
                <div class="flex overflow-x-auto py-2 border-2 p-2 rounded-xl mb-2">
                    <div v-for="type in typeData" :key="type.account_type_id" @click="toggleSelect(type)"
                        class="flex p-2 rounded-xl border-1 justify-center items-center cursor-pointer">
                        <div :class="[
                            'p-2 rounded-xl w-[500%] text-center truncate',
                            selected && selected.account_type_id === type.account_type_id ? 'bg-green-500' : 'bg-yellow-500'
                        ]">
                            {{ type.account_type_name }}
                        </div>
                    </div>
                </div>
                <label htmlFor="phone" className="text-gray-800 text-sm  block">
                    เลือกไอคอน
                </label>
                <div class="flex overflow-x-auto py-2 space-x-4 border-2 p-2 rounded-xl mb-2">
                    <div v-for="icon in icons" :key="icon.account_icon_id"
                        class="inline-flex flex-col gap-2 justify-center">
                        <div @click="toggleSelectIcon(icon)" :class="[
                            'rounded-full flex items-center justify-center w-16 h-16 cursor-pointer',
                            selectedIcon && selectedIcon.account_icon_id === icon.account_icon_id
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                        ]">
                            <img :src="`/icon_folder/${icon.account_icon_name}`" alt="icon"
                                class="w-12 h-12 rounded-full object-cover" />
                        </div>
                    </div>
                </div>
                <!-- <label htmlFor="phone" className="text-gray-800 text-sm  block">
                  รูปภาพ
                </label>
                <div class="relative flex items-center">
                  <input type="file" placeholder="Icon" class="border-2 border-gray-300 rounded" />
                </div> -->
                <button type="submit"
                    class="w-full bg-[#eed43d] hover:bg-[#bba62f] text-white py-3 mt-4 rounded-md transition duration-300 ease-in-out mb-2">
                    add
                </button>
            </form>
        </div>
    </div>

</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const groupID = route.params.id;
const categoryID = route.query.groupID
const { $axios } = useNuxtApp();

const icons = ref(); //เก็บข้อมูลไอคอน
const fetchIcon = async () => { //นำข้อมูลไอคอนมา
    try {
        const response = await $axios.get(`/get_icons`);
        const data = await response.data;
        icons.value = data.data;
        
    }
    catch (error) {
        console.log("No data", error);
    }
}

const formData = ref({ //ฟอร์มเตรียมส่ง
    account_type_name: "",
    account_type_value: "",
    account_type_description: "",
    account_type_from_id: null,
    account_type_icon: null,
    account_group_id: groupID,
    account_category_id: categoryID,
});


const selected = ref(null); //เก็บ account_type_id
const toggleSelect = (type) => { //เลือกและยกเลืกการเลือก account_type_id
    selected.value = selected.value?.account_type_id === type.account_type_id ? null : type;
    console.log(selected.value)
};

const selectedIcon = ref(null); //เก็บ account_icon_id
const toggleSelectIcon = (icon) => { //เลือกและยกเลืกการเลือก account_icon_id
  selectedIcon.value =
    selectedIcon.value?.account_icon_id === icon.account_icon_id ? null : icon;
      console.log(selectedIcon.value.account_icon_id);
      console.log(formData);
};

watch(selected, (newVal) => {
    formData.value.account_type_from_id = newVal ? newVal.account_type_id : null;
});

// Watch `selectedIcon` and update formData.account_type_icon
watch(selectedIcon, (newVal) => {
    formData.value.account_type_icon = newVal ? newVal.account_icon_id : null;
});






const typeData = ref([]); //เก็บข้อมูล type ไว้ใช้ในการกำหนด account_type_from_id
const fetchTypeData = async () => { //นำข้อมูล account_type มา
    try {
        const response = await $axios.get(`/account_type_get`);
        const data = await response.data;
        typeData.value = data.account_type;
    } catch (error) {
        console.error("Error fetching icons:", error);
    }
};

const goBack = () => { //ปุ่มย้อนกลับ
    router.back();
};

const submitForm = async () => {
    try {
        const response = await $axios.post("/account_type_create", {
            account_type_name: formData.value.account_type_name,
            account_type_value: formData.value.account_type_value,
            account_type_description: formData.value.account_type_description,
            account_type_from_id: formData.value.account_type_from_id,
            account_type_icon: formData.value.account_type_icon,
            account_group_id: formData.value.account_group_id,
            account_category_id: formData.value.account_category_id,   
        });

        const result = response.data;
        console.log("Account group created successfully:", result);

        // Reset formData correctly
        formData.value = {
            account_type_name: "",
            account_type_value: "",
            account_type_description: "",
            account_type_from_id: null, // Use null instead of empty string
            account_type_icon: null,
            account_group_id: null,
            account_category_id: null,
        };

        selected.value = null;
        selectedIcon.value = null;
        fetchType();
    } catch (error) {
        console.log("Error creating account group:", error.response?.data || error);
    }
};


const TypeData = ref([]);
const fetchType = async () => {
    try {
        const response = await $axios.get(
            `/account_type_get/${groupID}`
        );
        const data = await response;
        TypeData.value = data.account_type;
        console.log(TypeData.value);
    } catch (error) {
        console.log("Error fetching group data:", error);
    }
};

onMounted(async () => {
    fetchType();
    fetchTypeData();
    fetchIcon();
});

</script>