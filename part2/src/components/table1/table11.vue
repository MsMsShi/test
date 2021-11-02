<template>
<!--  {{tableData}}<br>-->

  <el-button style="float: left" type = "danger"
             @click = "removeEmps()">删除选中
  </el-button>
  <br>
  <br>
  <br>
  <div style="float: left">
  傻逼：{{emps}}<br>
  ID:{{id}}
  </div>
  <el-table @row-dblclick="one" :data="tableData" border style="width: 100%" @selection-change="deleteEmps">
    <el-table-column align = "center"
                     type = "selection"
                     width="80"/>
<!-- @selection-change 当选择项发生变化是会触发改事件   -->
    <el-table-column prop="编号" label="empno" width="180">
    </el-table-column>
    <el-table-column prop="job" label="JOB" width="180">
    </el-table-column>
    <el-table-column prop="mgr" label="mgr">
    </el-table-column>
    <el-table-column prop="hiredate" label="hiredate" width="180">
    </el-table-column>
    <el-table-column prop="sal" label="sal" width="180">
    </el-table-column>
    <el-table-column prop="comm" label="comm" width="180">
    </el-table-column>
    <el-table-column prop="name" label="name" width="180">
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

<!-- 分页  -->

  <div class="demo-pagination-block">
    <span class="demonstration">分页</span>
<!-- 分页绑定   -->
    <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:currentPage="pageInfo.currentPage"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size = "pageInfo.pagesize"

        :page-sizes="[3, 4, 5, 6]"
        :page-size="3"
        :pager-count="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="selectEmps"
        @current-change="selectEmps"
        @prev-click="selectEmps"
        @next-click="selectEmps"
        prev-text="上一页"
        next-text="下一页"
        background
    >
    </el-pagination>
  </div>




  <el-drawer v-model = "drawer"
             :with-header = "false"
             title = "I am the title">
    <el-form ref = "form"
             :model = "form"
             label-width = "120px">
      <el-form-item label = "部门编号">
        <el-input v-model = "form.deptno"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label = "部门名称">
        <el-input v-model = "form.name"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label = "部门地址">
        <el-input v-model = "form.loc"
                  disabled></el-input>
      </el-form-item>
    </el-form>
  </el-drawer>


</template>

<script>
import {ElMessage} from "element-plus";

export default{
  data(){
    return{
      /* 分页查询多条员工数据 */
      /*是否显示部门信息*/
      drawer: false,
      tableData:[],
      id:[],
      emps:[],//储存选择的东西  *全选选择的项
      /* 分页的功能 */
      pageInfo:{
        /* 当前页 */
        currentPage: 1,
        /* 当前页的数据条数 */
        pagesize: 3,
        /* 总条数 */
        total: 0
      },
      /*部门信息*/
      form: {
        deptno: "",
        name: "",
        loc: ""
      },
    }
  },methods:{
    selectEmps(){
      this.axios.get("http://localhost:8089/eldata/emps", {
        params: this.pageInfo
      }).then(response=>{
        console.log(response);
        this.pageInfo.total = response.data.totalElements
        this.tableData=response.data.content
      }).catch(function (error) {
            console.log(error);
          });
    },
    deleteEmp(id){
      this.id=[];
      this.id.push(id)
      this.axios({
        url: 'http://localhost:8089/eldata/deleteEmps',
        method: 'post',
        data:this.id
      }).then(response => {
        if (response.data === "成功") {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
         /* this.next()*/
        } else {
          ElMessage.error('删除失败')
        }

      }).catch(function (error) {
        console.log(error);
      });


    }, deleteEmps(vul){//全选按钮事件
     /* alert("cnm")*/
      this.emps=vul//将选择的东西传给一个参数 vul
    },removeEmps(){
      this.id=[];
      for( var i = 0; i<this.emps.length;i++){//循坏id
          this.id.push(this.emps[i].empno);//取第几个的id
      }
        this.id = [];
        for (var i = 0; i < this.emps.length; i++) { //循坏id
          this.id.push(this.emps[i].empno); //取第几个的id
        }

        this.axios({
          url: 'http://localhost:8089/eldata/deleteEmps',
          method: 'post',
          data: this.id
        }).then(response => {
          if (response.data === "成功") {
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            this.selectEmps()
          } else {
            ElMessage.error('删除失败')
          }

        }).catch(function(error) {
          console.log(error);
        });

      },one(row){
      this.axios.get("http://localhost:8089/eldata/selectDept"
          , {params: {id: row.empno}})
          .then(response => {
            console.log(response.data)
            this.drawer = true
            this.form.deptno = response.data.data.deptno
            this.form.name = response.data.data.name
            this.form.loc = response.data.data.loc
          }).catch(function (error) {
        console.log(error)
      })

    }
  },created(){
    this.selectEmps()
  }
}
</script>


<style>
.el-table__header .el-table-column--selection .cell .el-checkbox:after {
  color: #909399;
  content: "全选";
  font-size: 14px;
  margin-left: 2px;
  font-weight: bold;
}

</style>