<template>
  <el-table :data="userData" border style="width: 100%" @selection-change="">
    <el-table-column align = "center"
                     type = "selection"
                     width="80"/>
    <!-- @selection-change 当选择项发生变化是会触发改事件   -->
    <el-table-column prop="id" label="编号" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="pass" label="密码">
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="180">
    </el-table-column>
    <el-table-column prop="birthday" label="生日" width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址" width="180">
    </el-table-column>

    <el-table-column align = "center"
                     label = "功能">
      <template #default = "scope">
        <el-button type = "danger"
                   @click = "deleteEmp(tableData[scope.$index].empno)">删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      userData: [],
      pageInfo:{
        /* 当前页 */
        currentPage: 1,
        /* 当前页的数据条数 */
        pagesize: 3,
        /* 总条数 */
        total: 0
      },
    }
  },
  methods: {
    selectEmps() {
      this.axios.get("http://localhost:8080/TestuserPlus/depts", {
        params: this.pageInfo
      }).then(response => {
        console.log(response);
        this.userData = response.data.records
      }).catch(function (error) {
        console.log(error);
      });
    }

  }, created() {
    this.selectEmps()
  }
}
</script>

<style scoped>

</style>