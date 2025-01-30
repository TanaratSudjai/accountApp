<template>
  <client-only>
    <BackComponentsForTypeForm1></BackComponentsForTypeForm1>
  </client-only>
 
    
  <div class="flex items-center justify-center mb-10">
    <div class="p-6 sm:p-8 rounded-2xl w-full max-w-md">
        <div v-if="!TypeData || TypeData.length === 0" class="text-center p-4 text-gray-600">
          ไม่มีประเภท
        </div>
        <div v-else>
          <div v-for="Type in TypeData" :key="Type.account_type_id"
            class="border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
            <div class="font-semibold text-lg">
              รหัส: <span class="font-normal">{{ Type.account_type_id }}</span>
            </div>
            <div>
              ชื่อ:
              <span class="font-normal">{{ Type.account_type_name }}</span>
            </div>
            <div>
              จำนวน:
              <span class="font-semibold">{{ Type.account_type_value }}</span>
            </div>
            <div>
              รายละเอียด:
              <span class="font-normal">{{
                Type.account_type_description
              }}</span>
            </div>
            <div>
              ประเภท:
              <span class="font-normal">{{ getAccountTypeName(Type.account_type_from_id) }}</span>
            </div>

            <div class="mt-4">
              <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                @click="deleteFormData(Type.account_type_id )">
                ลบ
              </button>
              <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
                @click="openUpdateModal(Type)">
                แก้ไข
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateTypeModal :show="showUpdateModal" :accountType="selectedAccountType"
        :account_type_from_id="formData.account_type_from_id" 
        @update="handleUpdate"
        @close="showUpdateModal = false"
        />
    </div>
  
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const groupID = route.params.id;

const selected = ref(null);
const toggleSelect = (type) => {
  if (selected.value && selected.value.account_type_id === type.account_type_id) {
    selected.value = null;
    formData.value.account_type_from_id = "";
  } else {
    selected.value = type;
    formData.value.account_type_from_id = type.account_type_id;
  }
};

const getAccountTypeName = (id) => {
  const account = typeDataID.value.find(
    (type) => type.account_type_id === id
  );
  return account ? account.account_type_name : 'ยังไม่ได้เลือก';
};

const formData = ref({
  account_type_name: "",
  account_type_value: "",
  account_type_description: "",
  account_type_from_id: "",
  account_type_icon: "",
  account_group_id: groupID,
});

const typeData = ref([]);
const fetchTypeData = async () => {
  try {
    const response = await fetch(`/account_type_get`);
    const data = await response.json();
    typeData.value = data.account_type;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const typeDataID = ref([]);
const fetchTypeDataID = async () => {
  try {
    const response = await fetch(`/account_type_get`);
    const data = await response.json();
    typeDataID.value = data.account_type;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const goBack = () => {
  router.back();
};

const submitForm = async () => {
  try {
    const response = await fetch(
      "/account_type_create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value),
      }
    );

    const result = await response.json();
    console.log("Account group created successfully:", result);

    formData.value = {
      account_type_name: "",
      account_type_value: "",
      account_type_description: "",
      account_type_from_id: "",
      account_type_icon: "",
      account_group_id: "",
    };

    selected.value = null;
    fetchType();
  } catch (error) {
    console.log("Error creating account group:", error);
  }
};

const TypeData = ref([]);

const fetchType = async () => {
  try {
    const response = await fetch(
      `/account_type_get/${groupID}`
    );
    const data = await response.json();
    TypeData.value = data.account_type;
    console.log(TypeData.value);
  } catch (error) {
    console.error("Error fetching group data:", error);
  }
};

onMounted(async () => {
  fetchType();
  fetchTypeData();
  fetchTypeDataID();
});

const deleteFormData = async (account_type_id) => {
  console.log(account_type_id);
  try {
    const response = await fetch(
      `/account_type_del/${account_type_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      TypeData.value = TypeData.value.filter(
        (Type) => Type.account_type_id !== account_type_id
      );
      console.log("Group deleted successfully");
      fetchType();
    } else {
      console.error("Failed to delete group");
    }
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};

import UpdateTypeModal from "../../components/UpdateTypeModal.vue";
import BackComponentsForTypeForm1 from "~/components/BackComponentsForTypeForm1.vue";

const showUpdateModal = ref(false);
const selectedAccountType = ref({});

const openUpdateModal = (Type) => {
  selectedAccountType.value = { ...Type };
  showUpdateModal.value = true;
};

const handleUpdate = (updatedData) => {
  TypeData.value = TypeData.value.map((Type) =>
    Type.account_type_id === updatedData.account_type_id ? updatedData : Type
  );

  formData.value.account_type_from_id = updatedData.account_type_from_id;
  console.log("Account type updated successfully:", updatedData);
  fetchType();
};


</script>
