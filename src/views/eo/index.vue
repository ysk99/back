<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          <!-- {{ scope.$index }} -->
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="EO项目" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="剩余天数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.days }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Body">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.body" class="edit-input" size="small"/>
            <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.body }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="到期日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">Edit</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getEo } from '@/api/eo'

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
      listLoading: true

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getEo(this.listQuery).then(response => {
        this.list = response.data
        console.log(response.data)
        this.listLoading = false
      })
    }
    // cancelEdit(row) {
    //   // row.body = row.body
    //   row.edit = false
    //   this.$message({
    //     message: 'The title has been restored to the original value' + row.id,
    //     type: 'warning'
    //   })
    // },
    // confirmEdit(row) {
    //   row.edit = false
    //   // row.originalTitle = row.title
    //   console.log(row)
    //   updateArticles(row).then(response => {
    //     console.log('xiugaichengg')
    //     console.log(response)
    //   })
    //   this.$message({
    //     message: 'The title has been edited' + row.body + row.originalTitle,
    //     type: 'success'
    //   })
    // }
  }
}
</script>
