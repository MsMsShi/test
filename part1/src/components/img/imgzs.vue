<template>
  <el-upload action="#" :on-remove="handleRemove" ref="upload" :on-preview="handlePictureCardPreview"
             list-type="picture-card" :auto-upload="false" :on-change="handleUpload" :before-remove="beforeRemove"
             :multiple="true">
    <template #default>
      <i class="el-icon-plus"></i>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="" style="width: 80%!important;height: 80%!important;">
  </el-dialog>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器1</el-button>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      files: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file.url)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUpload(file) {
      console.log("文件名", file.name)
      // 保存需要上传的文件
      //let keyID = Math.random().toString().substr(2);
      //file["keyID"] = keyID;
      this.files.push(file);
      return true;
    },
    submitUpload() {
      let fd = new FormData();
      for (let i = 0; i < this.files.length; i++) {

        fd.append("files", this.files[i].raw);
        console.log(this.files[i])
        console.log("添加%d个文件", i + 1)
      }
      fd.append("filename", "a.jpg")
      /* const state = JSON.parse(sessionStorage.getItem('state'))
      var token = state.userInfo.token
      console.log("token:" + token)*/
      console.log("formdata:%o", fd)
      this.axios({
        url: 'http://localhost:8089/vueupload/file/upload',
        method: 'post',
        processData: false,
        data: fd,
        headers: {
          /* "JWTDemo": token, */
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        console.log("上传成功")
        console.log(response)
        this.$router.push({
          path: '/imgs',
          query: {
            list: response.data.data.list
          }
        })
      }).catch(function(err) {
        console.log("上传失败")
        console.log(err)
      })



       this.axios.post("http://localhost:8089/vueupload/file/upload",fd,{headers:{"JWTDemo":token,'Content-Type':'multipart/form-data'}})
         .then(function(response){
           console.log("上传成功")
           console.log(response)
         }).catch(function(err){
           console.log("上传失败")
           console.log(err)
         })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`删除图片： ${file.name} ?`)
    }
  }

}
</script>
<style>

</style>
