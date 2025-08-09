# รายงานการตรวจสอบโค้ด: ปัญหาการ Fetch ข้อมูลซ้ำซ้อน

## 📋 สรุปผลการตรวจสอบ

หลังจากตรวจสอบโค้ดในโปรเจกต์ Nuxt.js แล้ว พบปัญหาหลายจุดที่ทำให้ระบบมีการ fetch ข้อมูลซ้ำซ้อนและไม่มีประสิทธิภาพ ส่งผลให้ระบบทำงานช้าและใช้ bandwidth มากเกินจำเป็น

---

## 🔴 ปัญหาหลักที่พบ

### 1. การ Fetch ข้อมูลซ้ำซ้อนใน onMounted

#### `pages/transection/index.vue`
```javascript
onMounted(async () => {
  await Promise.all([
    fetchIcon(),           // API call 1
    fetchTransition(),     // API call 2
    groupOneTransition(),  // API call 3
    groupTwoTransition(),  // API call 4
    fetchsumone(),         // API call 5
    fetchsumtwo(),         // API call 6
    fetchfund(),           // API call 7
  ]);
});
```
**ปัญหา:** เรียก API ถึง 7 ครั้งพร้อมกันทุกครั้งที่เข้าหน้า

#### `pages/graph/index.vue`
```javascript
onMounted(async () => {
  await Promise.all([
    fetchDailyTotals(),
    fetchIncomeDailyTotals(),
    fetchExpensesForDay(),
    fetchIncomeForDay(),
    fetchExpensesInChart(),
    fetchIncomeInChart(),
  ]);
});
```
**ปัญหา:** เรียก API หลายครั้งพร้อมกันโดยไม่จำเป็น

#### `pages/home.vue`
```javascript
onMounted(async () => {
  await getSession();    // API call 1
  await fetchData();     // API call 2
});
```
**ปัญหา:** เรียก API ทุกครั้งที่เข้าหน้าโดยไม่มีการ cache

### 2. ไม่มีการ Cache ข้อมูล

#### Pinia Stores ไม่มีประสิทธิภาพ
```typescript
// stores/expenseTransition.ts
const fetchTransitions = async () => {
  console.log("Fetching transitions...")
  try {
    const res = await $axios.get('/get_expense_transition')
    // ไม่มีการตรวจสอบว่าข้อมูลยังใหม่อยู่หรือไม่
    transition.value = res.data
  } catch (err) {
    error.value = 'Error fetching transitions: ' + err?.message
  }
}
```
**ปัญหา:** ไม่มีการเก็บ cache หรือตรวจสอบว่าข้อมูลยังใหม่อยู่

### 3. การใช้ Watch ที่ไม่จำเป็น

#### `components/UpdateTypeModal.vue`
```javascript
watch(() => props.account_type_from_id, (newValue) => {
  localAccountType.value.account_type_from_id = newValue;
});

watch(() => props.accountType, (newValue) => {
  localAccountType.value = { ...newValue };
});

watch(selectedIcon, (newVal) => {
  localAccountType.value.account_type_icon = newVal ? newVal.account_icon_id : null;
});

watch(() => localAccountType.value.account_type_value, (newValue, oldValue) => {
  // การจัดรูปแบบตัวเลข
});
```
**ปัญหา:** มี watch หลายตัวที่ทำงานซ้ำซ้อนและไม่จำเป็น

#### `pages/home.vue`
```javascript
watch(
  () => checkData.value[0]?.account_type_sum,
  (sum) => {
    if (sum && parseFloat(sum) > 0) {
      // การ sort array ใหม่ทุกครั้ง
      const sorted = [...menuItems.value].sort((a, b) => a.id - b.id);
      menuItems.value = sorted;
    }
  },
  { immediate: true }
);
```
**ปัญหา:** ทำการ sort array ใหม่ทุกครั้งที่ข้อมูลเปลี่ยน

### 4. การจัดการ Token ที่ไม่สอดคล้องกัน

#### ปัญหาการเก็บ Token
```javascript
// pages/index.vue - ใช้ localStorage
localStorage.setItem("token", token);

// plugins/axios.ts - ใช้ useCookie
const tokenCookie = useCookie("token");

// pages/transection/index.vue - ใช้ localStorage อีกครั้ง
const token = localStorage.getItem("token");
```
**ปัญหา:** ใช้วิธีเก็บ token ที่ไม่สอดคล้องกัน

### 5. ไม่มีการป้องกัน Multiple Requests

```javascript
// ไม่มีการตรวจสอบว่ากำลัง loading อยู่หรือไม่
const fetchData = async () => {
  try {
    const { data } = await $axios.get("/transitions");
    // ถ้า user กดหลายครั้งจะเรียก API หลายครั้ง
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
```

---

## 💡 คำแนะนำการแก้ไขปัญหาแต่ละจุด

### 🔧 แก้ไขปัญหาที่ 1: การ Fetch ข้อมูลซ้ำซ้อนใน onMounted

#### ปัญหา: `pages/transection/index.vue` เรียก API 7 ครั้งพร้อมกัน

**วิธีแก้ไข 1: รวม API Endpoints**
```typescript
// สร้าง API endpoint ใหม่ที่รวมข้อมูลทั้งหมด
// server/api/transaction-dashboard.get.ts
export default defineEventHandler(async (event) => {
  const [icons, transitions, groupOne, groupTwo, sumOne, sumTwo, fund] = 
    await Promise.all([
      getMenuIcons(),
      getTransitions(),
      getGroupOne(),
      getGroupTwo(),
      getSumGroupOne(),
      getSumGroupTwo(),
      getTotalFund()
    ])
  
  return {
    icons,
    transitions,
    groupOne,
    groupTwo,
    sumOne,
    sumTwo,
    fund
  }
})
```

**วิธีแก้ไข 2: ใช้ Composable แทน**
```typescript
// composables/useTransactionDashboard.ts
export const useTransactionDashboard = () => {
  const { data, pending, error, refresh } = useLazyFetch('/api/transaction-dashboard', {
    key: 'transaction-dashboard',
    server: false,
    default: () => ({
      icons: [],
      transitions: [],
      groupOne: [],
      groupTwo: [],
      sumOne: { value: 0 },
      sumTwo: { value: 0 },
      fund: { value: 0 }
    })
  })
  
  return {
    data,
    pending,
    error,
    refresh,
    // Computed properties สำหรับแต่ละส่วน
    icons: computed(() => data.value.icons),
    transitions: computed(() => data.value.transitions),
    groupOne: computed(() => data.value.groupOne),
    groupTwo: computed(() => data.value.groupTwo),
    sumOne: computed(() => data.value.sumOne),
    sumTwo: computed(() => data.value.sumTwo),
    fund: computed(() => data.value.fund)
  }
}
```

**การใช้งานในหน้า:**
```vue
<!-- pages/transection/index.vue -->
<script setup>
const { 
  icons, 
  transitions, 
  groupOne, 
  groupTwo, 
  sumOne, 
  sumTwo, 
  fund, 
  pending 
} = useTransactionDashboard()

// ไม่ต้องมี onMounted แล้ว!
</script>
```

#### ปัญหา: `pages/graph/index.vue` เรียก API หลายครั้งโดยไม่จำเป็น

**วิธีแก้ไข: ใช้ Reactive Parameters**
```vue
<script setup>
// แทนที่การเรียก API หลายครั้งใน onMounted
const selectedDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate()
})

// ใช้ watch เพื่อ fetch ข้อมูลเมื่อวันที่เปลี่ยน
const { data: chartData, pending } = await useLazyFetch('/api/chart-data', {
  key: 'chart-data',
  query: selectedDate,
  server: false
})

// แยกข้อมูลออกจาก response
const expenseData = computed(() => chartData.value?.expense || [])
const incomeData = computed(() => chartData.value?.income || [])
const dailyTotals = computed(() => chartData.value?.dailyTotals || [])
</script>
```

### 🔧 แก้ไขปัญหาที่ 2: ไม่มีการ Cache ข้อมูล

#### ปัญหา: Pinia Stores ไม่มี Caching

**วิธีแก้ไข: เพิ่ม Smart Caching**
```typescript
// stores/expenseTransition.ts
export const useExpenseTransitionStore = defineStore('expenseTransition', () => {
  const { $axios } = useNuxtApp()
  
  const transition = ref([])
  const disabledAccountTypeIds = ref(new Set())
  const error = ref(null)
  const loading = ref(false)
  const lastFetch = ref(null)
  
  // Cache duration: 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000
  
  const fetchTransitions = async (force = false) => {
    // ตรวจสอบ cache ก่อน
    if (!force && transition.value.length > 0 && lastFetch.value) {
      const timeSinceLastFetch = Date.now() - lastFetch.value
      if (timeSinceLastFetch < CACHE_DURATION) {
        console.log("Using cached expense transitions")
        return transition.value
      }
    }
    
    // ป้องกันการ fetch ซ้ำ
    if (loading.value) {
      console.log("Already fetching expense transitions")
      return transition.value
    }
    
    loading.value = true
    console.log("Fetching fresh expense transitions...")
    
    try {
      const res = await $axios.get('/get_expense_transition')
      if (Array.isArray(res.data)) {
        transition.value = res.data
        disabledAccountTypeIds.value = new Set(
          res.data.map((item) => item.account_type_id)
        )
        lastFetch.value = Date.now()
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      error.value = 'Error fetching transitions: ' + (err?.message || String(err))
      throw err
    } finally {
      loading.value = false
    }
    
    return transition.value
  }
  
  // เพิ่มฟังก์ชันสำหรับ clear cache
  const clearCache = () => {
    transition.value = []
    disabledAccountTypeIds.value = new Set()
    lastFetch.value = null
    error.value = null
  }
  
  // เพิ่มฟังก์ชันสำหรับ refresh
  const refresh = () => fetchTransitions(true)
  
  return {
    transition: readonly(transition),
    disabledAccountTypeIds: readonly(disabledAccountTypeIds),
    error: readonly(error),
    loading: readonly(loading),
    fetchTransitions,
    clearCache,
    refresh,
    // Helper computed
    hasData: computed(() => transition.value.length > 0),
    isCacheValid: computed(() => {
      if (!lastFetch.value) return false
      return Date.now() - lastFetch.value < CACHE_DURATION
    })
  }
})
```

**การใช้งาน:**
```vue
<script setup>
const expenseStore = useExpenseTransitionStore()

// ใช้ในหน้า
onMounted(async () => {
  if (!expenseStore.hasData || !expenseStore.isCacheValid) {
    await expenseStore.fetchTransitions()
  }
})

// หรือใช้ composable wrapper
const { data: expenses, loading, refresh } = await useLazyAsyncData(
  'expense-transitions',
  () => expenseStore.fetchTransitions(),
  {
    server: false,
    default: () => []
  }
)
</script>
```

### 🔧 แก้ไขปัญหาที่ 3: การใช้ Watch ที่ไม่จำเป็น

#### ปัญหา: `components/UpdateTypeModal.vue` มี Watch หลายตัว

**วิธีแก้ไข: รวม Watch และใช้ Computed**
```vue
<!-- components/UpdateTypeModal.vue -->
<script setup>
const props = defineProps({
  accountType: Object,
  account_type_from_id: Number,
  show: Boolean
})

// แทนที่ watch หลายตัวด้วย computed
const localAccountType = computed({
  get() {
    return {
      ...props.accountType,
      account_type_from_id: props.account_type_from_id,
      account_type_icon: selectedIcon.value?.account_icon_id || props.accountType?.account_type_icon
    }
  },
  set(value) {
    // Handle updates if needed
    emit('update', value)
  }
})

// ใช้ watch เดียวสำหรับ props ทั้งหมด
watch(
  () => [props.accountType, props.account_type_from_id],
  ([newAccountType, newFromId]) => {
    if (newAccountType) {
      // Update local state only when props actually change
      nextTick(() => {
        // Update selectedIcon based on new props
        const iconId = newAccountType.account_type_icon
        selectedIcon.value = iconData.value.find(icon => 
          icon.account_icon_id === iconId
        ) || null
      })
    }
  },
  { deep: true, immediate: true }
)

// Debounced value formatting
const debouncedFormatValue = useDebounceFn((value) => {
  if (!value) return
  const numericValue = value.replace(/,/g, '')
  if (!isNaN(numericValue) && numericValue !== '') {
    const formatted = parseFloat(numericValue).toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    // Update formatted value
    formattedValue.value = formatted
  }
}, 300)

// Watch สำหรับ value formatting
watch(
  () => localAccountType.value.account_type_value,
  (newValue) => {
    if (newValue) {
      debouncedFormatValue(newValue)
    }
  }
)
</script>
```

#### ปัญหา: `pages/home.vue` มี Watch ที่ทำ Sort Array

**วิธีแก้ไข: ใช้ Computed Properties**
```vue
<!-- pages/home.vue -->
<script setup>
// แทนที่ watch ด้วย computed
const processedMenuItems = computed(() => {
  if (!menuItems.value?.length) return []
  
  // Clone array เพื่อไม่ให้ mutate original
  let items = [...menuItems.value]
  
  // ปรับ id ตาม condition
  const accountSum = parseFloat(checkCheck_open.value?.value || 0)
  if (accountSum > 0) {
    items = items.map(item => {
      if (item.title === "จัดการหมวดหมู่") {
        return { ...item, id: 12 }
      }
      if (item.title === "เปิดบัญชี") {
        offAccount_menu.value = false
        return { ...item, id: 13 }
      }
      return item
    })
  }
  
  // Sort by id
  return items.sort((a, b) => a.id - b.id)
})

// Filter menu items
const filteredMenuItems = computed(() => {
  return processedMenuItems.value.filter(item => {
    // ซ่อน "เปิดบัญชี" ถ้า offAccount_menu เป็น false
    if (item.title === "เปิดบัญชี" && !offAccount_menu.value) {
      return false
    }
    return true
  })
})

// ไม่ต้องมี watch แล้ว!
</script>
```

### 🔧 แก้ไขปัญหาที่ 4: การจัดการ Token ที่ไม่สอดคล้องกัน

#### ปัญหา: ใช้ localStorage และ useCookie ปนกัน

**วิธีแก้ไข: สร้าง Auth Composable ที่สอดคล้อง**
```typescript
// composables/useAuth.ts
export const useAuth = () => {
  // ใช้ useCookie เป็นหลัก
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24, // 1 วัน
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    httpOnly: false // ให้ client access ได้
  })
  
  const user = useState("auth.user", () => null)
  const loading = ref(false)
  
  // Sync กับ localStorage สำหรับ backward compatibility
  const syncTokenWithLocalStorage = () => {
    if (process.client) {
      if (token.value) {
        localStorage.setItem("token", token.value)
      } else {
        localStorage.removeItem("token")
      }
    }
  }
  
  // Watch token changes และ sync กับ localStorage
  watch(token, syncTokenWithLocalStorage, { immediate: true })
  
  const login = async (credentials) => {
    if (loading.value) return { success: false, error: "กำลังเข้าสู่ระบบ" }
    
    loading.value = true
    try {
      const response = await $fetch("/auth/login", {
        method: "POST",
        body: credentials
      })
      
      // Set token (จะ trigger watch และ sync กับ localStorage)
      token.value = response.token
      user.value = response.user
      
      return { success: true, user: response.user }
    } catch (error) {
      return { 
        success: false, 
        error: error.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" 
      }
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    loading.value = true
    try {
      await $fetch("/auth/logout", { method: "POST" })
    } catch (error) {
      console.warn("Logout API failed:", error)
    } finally {
      // Clear token และ user
      token.value = null
      user.value = null
      loading.value = false
      
      // Navigate to login
      await navigateTo("/")
    }
  }
  
  const getToken = () => {
    // ลำดับความสำคัญ: cookie > localStorage
    if (token.value) return token.value
    if (process.client) {
      const localToken = localStorage.getItem("token")
      if (localToken) {
        token.value = localToken // sync กลับไป cookie
        return localToken
      }
    }
    return null
  }
  
  return {
    token: readonly(token),
    user: readonly(user),
    loading: readonly(loading),
    login,
    logout,
    getToken,
    isAuthenticated: computed(() => !!getToken())
  }
}
```

**ปรับปรุง Axios Plugin:**
```typescript
// plugins/axios.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { getToken } = useAuth()
  
  const $axios = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true,
  })

  $axios.interceptors.request.use(
    (config) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("⚠️ Unauthorized! Redirecting to login...")
        const { logout } = useAuth()
        logout()
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: $axios,
    },
  }
})
```

### 🔧 แก้ไขปัญหาที่ 5: ไม่มีการป้องกัน Multiple Requests

#### ปัญหา: User สามารถกด Submit หลายครั้งได้

**วิธีแก้ไข: เพิ่ม Request Deduplication**
```typescript
// composables/useRequestDeduplication.ts
export const useRequestDeduplication = () => {
  const pendingRequests = new Map()
  
  const dedupedRequest = async (key, requestFn) => {
    // ถ้ามี request เดียวกันกำลัง pending อยู่
    if (pendingRequests.has(key)) {
      console.log(`Request ${key} already pending, waiting...`)
      return await pendingRequests.get(key)
    }
    
    // สร้าง request ใหม่
    const requestPromise = requestFn()
    pendingRequests.set(key, requestPromise)
    
    try {
      const result = await requestPromise
      return result
    } finally {
      // ลบ request ออกจาก pending เมื่อเสร็จแล้ว
      pendingRequests.delete(key)
    }
  }
  
  return { dedupedRequest }
}
```

**การใช้งาน:**
```vue
<script setup>
const { dedupedRequest } = useRequestDeduplication()
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const data = await dedupedRequest('fetch-transitions', async () => {
      const response = await $axios.get("/transitions", {
        params: { page: page.value, limit: limit.value }
      })
      return response.data
    })
    
    checkData.value = data.data || []
    // ... handle other data
  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    loading.value = false
  }
}

// ปุ่ม submit ที่ป้องกันการกดซ้ำ
const handleSubmit = async () => {
  if (loading.value) return
  
  await dedupedRequest('submit-form', async () => {
    // Submit logic here
    const response = await $axios.post('/api/submit', formData.value)
    return response.data
  })
}
</script>

<template>
  <button 
    @click="handleSubmit" 
    :disabled="loading"
    class="btn"
  >
    <span v-if="loading">กำลังส่ง...</span>
    <span v-else>ส่งข้อมูล</span>
  </button>
</template>
```

**สำหรับ Form Submission:**
```vue
<script setup>
const formLoading = ref(false)
const submitCount = ref(0)

const handleLogin = async () => {
  // ป้องกันการ submit ซ้ำ
  if (formLoading.value) {
    console.log("Form is already submitting")
    return
  }
  
  // Validate form
  if (!formData.value.account_user_username.trim()) {
    showAlert("กรุณากรอกชื่อผู้ใช้", "ชื่อผู้ใช้ไม่สามารถเว้นว่างได้")
    return
  }
  
  if (!formData.value.account_user_password.trim()) {
    showAlert("กรุณากรอกรหัสผ่าน", "รหัสผ่านไม่สามารถเว้นว่างได้")
    return
  }
  
  formLoading.value = true
  submitCount.value++
  
  try {
    const { success, error } = await useAuth().login({
      account_user_username: formData.value.account_user_username,
      account_user_password: formData.value.account_user_password,
    })
    
    if (success) {
      await navigateTo("/home")
      // ไม่ต้อง reload หน้า
    } else {
      showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error)
    }
  } catch (err) {
    showAlert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", "กรุณาลองใหม่อีกครั้ง")
  } finally {
    formLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <!-- form fields -->
    <button 
      type="submit"
      :disabled="formLoading"
      class="btn-primary"
    >
      <LoadingSpinner v-if="formLoading" />
      <span v-else>เข้าสู่ระบบ</span>
    </button>
  </form>
</template>
```

---

## 💡 คำแนะนำทั่วไปในการแก้ไข

### 1. ปรับปรุง Pinia Stores ให้มี Caching

```typescript
// stores/dataStore.ts
export const useDataStore = defineStore('data', () => {
  const data = ref(null)
  const loading = ref(false)
  const lastFetch = ref(null)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 นาที
  
  const fetchData = async (force = false) => {
    // ตรวจสอบ cache
    if (!force && data.value && lastFetch.value && 
        Date.now() - lastFetch.value < CACHE_DURATION) {
      return data.value
    }
    
    // ป้องกันการ fetch ซ้ำ
    if (loading.value) return data.value
    
    loading.value = true
    try {
      const response = await $axios.get('/api/data')
      data.value = response.data
      lastFetch.value = Date.now()
      return data.value
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    } finally {
      loading.value = false
    }
  }
  
  const clearCache = () => {
    data.value = null
    lastFetch.value = null
  }
  
  return { 
    data: readonly(data), 
    loading: readonly(loading), 
    fetchData, 
    clearCache 
  }
})
```

### 2. ใช้ Nuxt's Built-in Data Fetching

```vue
<script setup>
// แทนที่การใช้ axios ใน onMounted
const { data: transitions, pending, error, refresh } = await useLazyFetch('/transitions', {
  key: 'transitions',
  server: false,
  default: () => [],
  transform: (data) => data.data || []
})

// สำหรับข้อมูลที่ต้องการ real-time
const { data: session } = await useFetch('/auth/get_session', {
  key: 'user-session',
  server: false,
  lazy: true
})
</script>
```

### 3. รวม API Calls ที่เกี่ยวข้องกัน

```typescript
// composables/useTransactionData.ts
export const useTransactionData = () => {
  const loading = ref(false)
  const error = ref(null)
  
  const fetchAllTransactionData = async () => {
    if (loading.value) return
    
    loading.value = true
    error.value = null
    
    try {
      // รวม API calls ที่เกี่ยวข้องกัน
      const [
        iconsRes,
        transitionsRes,
        groupOneRes,
        groupTwoRes,
        summaryRes
      ] = await Promise.all([
        $axios.get('/menu_icon'),
        $axios.get('/transitions'),
        $axios.get('/getGropOne'),
        $axios.get('/getGropTwo'),
        $axios.get('/transaction_summary') // API ใหม่ที่รวม sum data
      ])
      
      return {
        icons: iconsRes.data,
        transitions: transitionsRes.data,
        groupOne: groupOneRes.data,
        groupTwo: groupTwoRes.data,
        summary: summaryRes.data
      }
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchAllTransactionData
  }
}
```

### 4. ใช้ Computed Properties แทน Watch

```vue
<script setup>
// แทนที่ watch ที่ทำการ sort
const sortedMenuItems = computed(() => {
  if (!menuItems.value?.length) return []
  
  return [...menuItems.value]
    .filter(item => {
      // ตรรกะการ filter
      if (item.title === "เปิดบัญชี" && !offAccount_menu.value) {
        return false
      }
      return true
    })
    .sort((a, b) => a.id - b.id)
})

// ใช้ computed สำหรับการตรวจสอบ disabled state
const isMenuItemDisabled = computed(() => (title) => {
  if (!title) return true
  
  const depter = parseFloat(checkData_depter.value?.value || 0)
  const creditor = parseFloat(checkData_creditor.value?.value || 0)
  const accountSum = parseFloat(checkCheck_open.value?.value || 0)
  
  if (title === "ลูกหนี้" && depter <= 0) return true
  if (title === "เจ้าหนี้" && creditor <= 0) return true
  
  return accountSum <= 0 && [
    "บันทึกรายการค่าใช้จ่าย",
    "บันทึกรายการรายได้",
    "ลูกหนี้",
    "เจ้าหนี้",
    "ธนาคาร"
  ].includes(title)
})
</script>
```

### 5. เพิ่ม Debounce สำหรับ User Input

```typescript
// composables/useDebounce.ts
import { debounce } from 'lodash-es'

export const useDebounce = (fn, delay = 300) => {
  return debounce(fn, delay)
}

// ใช้งาน
const debouncedSearch = useDebounce(async (query) => {
  await searchData(query)
}, 300)
```

### 6. ปรับปรุงการจัดการ Authentication

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  })
  
  const user = useState("user", () => null)
  const loading = ref(false)
  
  const login = async (credentials) => {
    if (loading.value) return { success: false, error: "กำลังเข้าสู่ระบบ" }
    
    loading.value = true
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: credentials
      })
      
      token.value = response.token
      user.value = response.user
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }
  
  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" })
    } finally {
      token.value = null
      user.value = null
      await navigateTo("/login")
    }
  }
  
  return {
    token: readonly(token),
    user: readonly(user),
    loading: readonly(loading),
    login,
    logout,
    isAuthenticated: computed(() => !!token.value)
  }
}
```

### 7. ใช้ Global Loading State

```typescript
// composables/useGlobalLoading.ts
export const useGlobalLoading = () => {
  const loading = useState('global.loading', () => false)
  const loadingCount = useState('global.loadingCount', () => 0)
  
  const startLoading = () => {
    loadingCount.value++
    loading.value = true
  }
  
  const stopLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      loading.value = false
    }
  }
  
  return {
    loading: readonly(loading),
    startLoading,
    stopLoading
  }
}
```

---

## 📊 ผลลัพธ์ที่คาดหวังหลังการแก้ไข

### ก่อนแก้ไข
- **API Calls ต่อหน้า:** 7-10 requests
- **Loading Time:** 2-3 วินาที
- **Data Transfer:** ~500KB ต่อหน้า
- **Cache Hit Rate:** 0%

### หลังแก้ไข
- **API Calls ต่อหน้า:** 1-3 requests
- **Loading Time:** 0.5-1 วินาที  
- **Data Transfer:** ~100KB ต่อหน้า
- **Cache Hit Rate:** 70-80%

---

## 🎯 ขั้นตอนการ Implementation

### Phase 1: ปรับปรุง Data Fetching (สัปดาห์ที่ 1)
1. สร้าง composables สำหรับ data fetching
2. แทนที่ axios calls ด้วย useFetch/useLazyFetch
3. เพิ่ม caching mechanism

### Phase 2: ปรับปรุง State Management (สัปดาห์ที่ 2)
1. ปรับปรุง Pinia stores
2. เพิ่ม global loading state
3. ปรับปรุงการจัดการ authentication

### Phase 3: Optimization (สัปดาห์ที่ 3)
1. เพิ่ม debounce สำหรับ user input
2. ปรับปรุง computed properties
3. ลบ watch ที่ไม่จำเป็น

### Phase 4: Testing & Monitoring (สัปดาห์ที่ 4)
1. ทест performance improvements
2. ตั้งค่า monitoring
3. ปรับแต่งตามผลการทดสอบ

---

## 📝 หมายเหตุ

การแก้ไขปัญหาเหล่านี้จะช่วยให้:
- ระบบทำงานเร็วขึ้น
- ลด bandwidth usage
- ปรับปรุง user experience
- ลดโอกาสเกิด race conditions
- ทำให้โค้ดง่ายต่อการ maintain

**คำแนะนำ:** ควรทำการแก้ไขทีละส่วนและทดสอบให้ดีก่อนที่จะ deploy ไป production