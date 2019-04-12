<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-button v-if="tag" class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="savedata">保存</el-button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { storeapi } from '@/api/excel'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      tag: false,
      listLoading: false
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      this.tag = true
      // 上传成功后自动执行函数赋值
      console.log(results)
      console.log(header)
    },
    savedata() {
      this.listLoading = true
      storeapi(this.tableData).then(response => {
        console.log(response.data)
        this.listLoading = false
        console.log('保存成功')
      })
    }
  }
}
</script>
