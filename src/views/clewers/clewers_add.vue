<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网站名" prop="website">
          <el-input v-model="form.website"/>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="form.url"/>
        </el-form-item>
        <el-form-item label="进度1" prop="others">
          <el-input v-model="form.schedule1"/>
        </el-form-item>
        <el-form-item label="进度2" prop="others">
          <el-input v-model="form.schedule2"/>
        </el-form-item>
        <el-form-item label="类型" prop="others">
          <el-input v-model="form.leixing"/>
        </el-form-item>
        <el-form-item label="推荐指数" prop="recommend">
          <el-input v-model="form.recommend"/>
        </el-form-item>
      <!-- <el-form-item label="图片">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="form.files"
          list-type="picture"
          class="upload-demo"
          action="http://localhost/api/public/index.php/api/files/upload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { clewers_add } from '@/api/clewers'

export default {
  data() {
    return {
      form: {
        website: '',
        url: '',
        leixing: '',
        schedule1: '',
        recommend: '',
        schedule2: ''
      },
      Token:'Bearer ' + getToken()
    }
  },
  methods: {
    onSubmit() {
      this.$message('正在提交axios请求')
      clewers_add(this.form).then(response => {
        console.log(response.data)
        this.listLoading = false
        // console.log('保存成功')
        this.$message('保存成功')
          this.form = {
            id: undefined,
            website: '',
            url: '',
            leixing: '',
            schedule1: '',
            recommend: '',
            schedule2: ''
          }
      })

    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // submitUpload() {
    //     this.$refs.upload.submit();
    //   },
    handleRemove(file, fileList) {
      console.log(file, fileList);
     },
     handleSuccess (res, file, fileList) {
       console.log(res.photo)
       this.form.files_address = res.photo
       console.log(file)
       console.log(fileList)  // 这里可以获得上传成功的相关信息
    },
    handlePreview(file) {
       console.log(file);
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
