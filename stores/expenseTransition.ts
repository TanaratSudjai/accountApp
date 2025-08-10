import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpenseTransitionStore = defineStore('expenseTransition', () => {
  const { $api } = useApi()

  const transition = ref([])
  const disabledAccountTypeIds = ref(new Set())
  const error = ref(null)

  const fetchTransitions = async () => {
    console.log("Fetching transitions...")
    try {
      const res = await $api('/get_expense_transition')
      if (Array.isArray(res)) {
        transition.value = res
        disabledAccountTypeIds.value = new Set(
          res.map((item) => item.account_type_id)
        )
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      error.value = 'Error fetching transitions: ' + (err?.message || String(err))
    }
  }

  return {
    transition,
    disabledAccountTypeIds,
    error,
    fetchTransitions,
  }
})