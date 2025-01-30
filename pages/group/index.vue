<template>
  <div>
    <h1>Group</h1>
    <div class="flex flex-col w-[20%]">
      <input
        type="text"
        placeholder="account_group_id"
        class="border-2 border-gray-300 rounded"
      />

      <input
        type="text"
        placeholder="account_category_id"
        class="border-2 border-gray-300 rounded"
      />

      <div>
        <input
          type="text"
          placeholder="account_group_name"
          class="border-2 border-gray-300 rounded"
        />

        <button>ADD</button>
      </div>

      <tab le class="table-auto border-2">
        <thead class="border-2">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-2">
            <td>1</td>
            <td>yoy</td>
            <td>hee</td>
          </tr>
        </tbody>
      </tab>
    </div>
  </div>
</template>
