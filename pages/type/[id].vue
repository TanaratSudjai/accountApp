<template>
  <client-only>
    <BackComponentsForTypeForm1></BackComponentsForTypeForm1>
  </client-only>
  <div
    v-if="!TypeData || TypeData.length === 0"
    class="text-center p-4 text-gray-600"
  >
    ไม่มีประเภท
  </div>
  <div v-else class="flex w-full justify-center mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-4 xl:grid-cols-3 max-w-7xl">
      <div
        v-for="Type in TypeData"
        :key="Type.account_type_id"
        className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 mb-4 transition-all hover:shadow-xl "
      >
        <div className="flex items-center mb-4">
          <div>
            <img
              :src="`/icon_folder/${Type.account_icon_name}`"
              alt="icon"
              class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {{ Type.account_type_name }}
            </h3>
            <p className="text-sm text-gray-500">
              Code: {{ Type.account_type_id }}
            </p>
          </div>
        </div>
    
        <div className="space-y-2 text-gray-700 mb-4">
          <div className="flex">
            <span className="font-semibold mr-2 w-24">Amount:</span>
            <span className="font-bold text-blue-600">
              {{ Type.account_type_value }}
            </span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-24">Description:</span>
            <span>{{ Type.account_type_description }}</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 w-24">Type:</span>
            <span>{{ getAccountTypeName(Type.account_type_from_id) }}</span>
          </div>
        </div>
    
        <div className="flex space-x-2">
          <button
            @click="deleteFormData(Type.account_type_id)"
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="mr-2 w-2 h-2" />
            Delete
          </button>
          <button
            @click="openUpdateModal(Type)"
            className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Pencil className="mr-2 w-4 h-4" />
            Edit
          </button>
          <UpdateTypeModal
            :show="showUpdateModal"
            :accountType="selectedAccountType"
            :account_type_from_id="formData.account_type_from_id"
            @update="handleUpdate"
            @close="showUpdateModal = false"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Pencil,Trash2  } from "lucide-vue-next";

const router = useRouter();

const route = useRoute();
const groupID = route.params.id;
const { $axios } = useNuxtApp();

const selected = ref(null);
const toggleSelect = (type) => {
  if (
    selected.value &&
    selected.value.account_type_id === type.account_type_id
  ) {
    selected.value = null;
    formData.value.account_type_from_id = "";
  } else {
    selected.value = type;
    formData.value.account_type_from_id = type.account_type_id;
  }
};

const getAccountTypeName = (id) => {
  const account = typeDataID.value.find((type) => type.account_type_id === id);
  return account ? account.account_type_name : "ยังไม่ได้เลือก";
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
    const response = await $axios.get(`/account_type_get`);
    const data = await response.data;
    typeData.value = data.account_type;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};

const typeDataID = ref([]);
const fetchTypeDataID = async () => {
  try {
    const response = await $axios.get(`/account_type_get`);
    const data = await response.data;
    typeDataID.value = data.account_type;
  } catch (error) {
    console.error("Error fetching icons:", error);
  }
};


const submitForm = async () => {
  try {
    const response = await $axios.post("/account_type_create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

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
    const response = await $axios.get(`/account_type_get/${groupID}`);
    const data = await response.data;
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
    const response = await $axios.delete(
      `/account_type_del/${account_type_id}`,
    );

    if (response.status == 200 || response.status ==201) {
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
