// import { defineStore } from "pinia";
// import { useNuxtApp } from "#app";

// interface GroupState {
//   groups: any[]; // Replace `any[]` with a proper type
// }

// export const useGroupStore = defineStore("group", {
//   state: (): GroupState => ({
//     groups: [],
//   }),
//   actions: {
//     async fetchGroup(categoryID: string): Promise<void> {
//       try {
//         const { $axios } = useNuxtApp(); // Get axios instance inside the function

//         const response = await $axios.get(`/account_group_counttype/${categoryID}`);
//         this.groups = response.data.count_type_at_group; // Save data to state

//         console.log(this.groups);
//       } catch (error) {
//         console.error("Error fetching group data:", error);
//       }
//     },
//   },
// });


//for using by group