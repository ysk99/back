<template>
  <div class="app-container">
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="jump">新增</el-button>
    <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button> -->
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
      <el-table-column label="网站名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.website }}
        </template>
      </el-table-column>
      <el-table-column label="URL" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="进度1" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.schedule1 }}
        </template>
      </el-table-column>
      <el-table-column label="进度2" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.schedule2 }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.leixing }}
        </template>
      </el-table-column>
      <el-table-column label="推荐指数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.recommend }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="地址" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="Actions" width="250">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button> -->
          <!-- <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="chengeEdit(scope.row)">表内编辑</el-button> -->
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">弹窗编辑</el-button>
          <el-button type="primary" size="small" @click="update(scope.row)">更新</el-button>
          <el-button type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="网站名" prop="website">
          <el-input v-model="temp.website"/>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="temp.url"/>
        </el-form-item>
        <el-form-item label="进度1" prop="others">
          <el-input v-model="temp.schedule1"/>
        </el-form-item>
        <el-form-item label="进度2" prop="others">
          <el-input v-model="temp.schedule2"/>
        </el-form-item>
        <el-form-item label="类型" prop="others">
          <el-input v-model="temp.leixing"/>
        </el-form-item>
        <el-form-item label="推荐指数" prop="recommend">
          <el-input v-model="temp.recommend"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updatedata">确定</el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updatedata()">确定</el-button> -->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList, clewers_add, clewers_delete, updatesome } from '@/api/clewers'

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
        website: '',
        url: '',
        leixing: '',
        schedule1: '',
        recommend: '',
        schedule2: ''

      },
      rules: {
        // edit: [{ required: true, message: 'edit is required', trigger: 'change' }],
        // address: [{ required: true, message: 'timestamp is required', trigger: 'blur' }],
        // name: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
    jump(){
    //this.$router.push("/cart")
    //传递的参数用{{ $route.query.goodsId }}获取
    this.$router.push({path: '/clewers/clewers_add'})
    //this.$router.go(-2)
    //后退两步
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
     },
     handleSuccess (res, file, fileList) {
       console.log(res.photo)
       this.temp.files_address = res.photo
       console.log(file)
       console.log(fileList)  // 这里可以获得上传成功的相关信息
    },
    handlePreview(file) {
       console.log(file);
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        website: '',
        url: '',
        leixing: '',
        schedule1: '',
        recommend: '',
        schedule2: ''
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
    update(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp.website)
      updatesome(this.temp.url).then(response =>{
        console.log(response.data)
      })
    },
    updatedata(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          clewers_add(this.temp).then(response => {
            console.log('修改成功')
            // this.data = response.data
            this.resetTemp()
            // row = this.data
            console.log(response.data)
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
    handleDelete(row) {
        // this.listLoading = true
        clewers_delete(row.website).then(response => {
        console.log(response.data)
        // 确保后台更新后，前端页面同步更新
        for (const v of this.list) {
          if (v.id === response.data.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break
          }
        }
        // location.reload();
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        // this.listLoading = false,
        // location.reload()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          hotsearch_add(this.temp).then(() => {
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
      hotsearch_add(row).then(response => {
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