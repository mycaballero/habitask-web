<script setup>

import {watch, inject, ref, useSlots} from "vue"

const slots = useSlots()

const useFetch = inject('useFetchDefault')
const loading = ref(false)

const props = defineProps({
      headers: Object,
      url: String,
      withPagination: {
        type: Boolean,
        default: true
      },
      headerClassName: String,
      headerItemClassName: String,
      bodyRowClassName: String,
      bodyItemClassName: String,
      tableClassName: String,
      buttonsPagination: {
        type:Boolean,
        default: true
      },
      sortBy: [],
      sortType: ["desc", "asc"],
      searchValue: Object,
      multiSort: {
        type: Boolean,
        default: true
      }
    }
)

const sortType = ["desc", "asc"];
const items = ref([])
const total = ref(0)
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
})
const getDataFromApi = async () => {
  try {
    loading.value = true
    let queryParams = ''
    let url = props.url
    if (props.withPagination) {
      let params = {
        page: serverOptions.value.page,
        perPage: serverOptions.value.rowsPerPage,
        sortBy: getAliasColumn(serverOptions.value.sortBy) || '',
        sort: serverOptions.value.sortType,
        ...props.searchValue
      }
      Object.keys(params).forEach(key => ([null, undefined, ''].includes(params[key]) && delete params[key]))
      queryParams = new URLSearchParams(params).toString()
      url = `${props.url}?${queryParams}`
    }
    const {response, data} = await useFetch(url).json()
    if (response.value?.ok) {
      total.value = !!data.value.meta.total ? data.value.meta.total : data.value.total
      items.value = props.withPagination ? data.value.data : data.value
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getAliasColumn = (columnName) => {
  return props.headers.filter( f => f.value === columnName)[0]?.alias || columnName
}

watch(() => props.searchValue, () => {
  getDataFromApi()
}, {deep: true})

watch(serverOptions, () => {
  getDataFromApi()

}, {deep: true})

getDataFromApi()

defineExpose({
  getDataFromApi
})

// $ref dataTable
const dataTable = ref("dataTable")
</script>


<template>
  <div class="bg-white rounded-xl border border-black/15 w-full">
    <EasyDataTable v-if="withPagination"
                   ref="dataTable"
                   :table-class-name="`${tableClassName} customize-table`"
                   :headers="headers"
                   :items="items"
                   :loading="loading"
                   rowsPerPageMessage=""
                   v-model:server-options="serverOptions"
                   :server-items-length="total"
                   :rows-items="[5,15,20]"
                   header-text-direction="center"
                   body-text-direction="center"
                   :header-class-name="headerClassName"
                   :body-row-class-name="bodyRowClassName"
                   :header-item-class-name="headerItemClassName"
                   :body-item-class-name="bodyItemClassName"
                   :buttons-pagination="buttonsPagination"
                   theme-color="black"
                   :sort-by="sortBy"
                   :sort-type="sortType"
                   @click-row="$emit('click-row')"
    >
      <template #empty-message>
        <p class="text-[15px] text-gray-500 mt-6"> Sin datos</p>
      </template>
      <template v-for="(_,x) in slots" v-slot:[x]="props">
        <slot :name="x" v-bind="props"/>
      </template>
    </EasyDataTable>
    <EasyDataTable v-else
                   :table-class-name="`${tableClassName} customize-table`"
                   :headers="headers"
                   :items="items"
                   :loading="loading"
                   header-text-direction="center"
                   body-text-direction="center"
                   :header-class-name="headerClassName"
                   :body-row-class-name="bodyRowClassName"
                   :header-item-class-name="headerItemClassName"
                   :body-item-class-name="bodyItemClassName"
                   :sort-by="sortBy"
                   :sort-type="sortType"
                   @click-row="$emit('click-row')"
                   hide-footer
    >
      <template #empty-message>
        <p class="text-[15px] text-gray-500 mt-6"> {{ $t('no_data') }}</p>
      </template>
      <template v-for="(_,x) in slots" v-slot:[x]="props">
        <slot :name="x" v-bind="props"/>
      </template>
    </EasyDataTable>
  </div>
</template>

<style scoped>
.customize-table {
  --easy-table-border: none;

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 35px;
  --easy-table-header-font-color: gray;
  --easy-table-header-background-color: transparent;

  --easy-table-header-item-padding: 20px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: transparent;

  --easy-table-body-row-font-color: gray;
  --easy-table-body-row-background-color: transparent;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: transparent;

  --easy-table-body-item-padding: 20px 15px;

  --easy-table-footer-background-color: transparent;
  --easy-table-footer-font-color: gray;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;


  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: black;
  --easy-table-scrollbar-color: black;
  --easy-table-scrollbar-thumb-color: #F24855;
  --easy-table-scrollbar-corner-color: black;

  --easy-table-loading-mask-background-color: transparent;
  --1b889342: #F24855 !important;
}

.easy-data-table__rows-selector ul.select-items li.selected {
  background-color: #F24855 !important;
  color: #fff !important;
}
</style>
