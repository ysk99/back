<template>
  <div class="app-container">
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="70">
        <template slot-scope="scope">
          <!-- {{ scope.$index }} -->
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Title" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Body">
        <template slot-scope="scope">
          <!-- 如果edit为真，则出现输入框，并且吧body值传给input中，否则直接输出文本body -->
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.body" class="edit-input" size="small"/>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.body }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Created_at" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="250">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="chengeEdit(scope.row)">表内编辑</el-button>
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">弹窗编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="body" prop="body">
          <el-input v-model="temp.body"/>
        </el-form-item>
        <el-form-item label="edit" prop="edit">
          <el-input v-model="temp.edit"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList, updateArticles, createArticles } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        id: undefined,
        title: '',
        body: '',
        edit: 0
      },
      rules: {
        // edit: [{ required: true, message: 'edit is required', trigger: 'change' }],
        body: [{ required: true, message: 'timestamp is required', trigger: 'blur' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: ''

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        console.log(response.data)
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        body: '',
        title: '',
        edit: 0
      }
    },
    chengeEdit(row) {
      row.edit = 1
    },
    cancelEdit(row) {
      // row.body = row.body
      row.edit = 0
      this.$message({
        message: 'The title has been restored to the original value' + row.id,
        type: 'warning'
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateArticles(this.temp).then(response => {
            console.log('修改成功')
            this.data = response.data
            // row = this.data
            console.log(this.data)
            // 确保后台更新后，前端页面同步更新
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createArticles(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    confirmEdit(row) {
      row.edit = 0
      // row.originalTitle = row.title
      console.log(row)
      updateArticles(row).then(response => {
        console.log('xiugaichengg')
        console.log(response)
      })
      this.$message({
        message: 'The title has been edited' + row.body + row.originalTitle,
        type: 'success'
      })
    }
  }
}
</script>
