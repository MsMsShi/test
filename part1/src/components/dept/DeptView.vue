<template>
	<el-table ref="mt" :data="deptData" style="width: 100%;">
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column prop="deptno" label="编号" width="120">
			<template #default="scope">{{scope.row.deptno}}</template>
		</el-table-column>
		<el-table-column prop="name" label="部门名称" width="120"></el-table-column>
		<el-table-column prop="loc" label="地址" show-overflow-tooltip></el-table-column>
		<el-table-column lable="操作">
			<template #default="scope">
<!--				<el-button size="mini" @click="handeEdit(scope.$index,scope.row)">编辑</el-button>-->
        <el-button size="mini" @click="centerDialogVisible = true;handeEdit(scope.$index,scope.row)">编辑</el-button>
<!--				<el-button type="danger" size="mini" @click="handeDel(scope.$index,scope.row)">删除</el-button>-->
        <el-button type="danger" size="mini" @click="handeDel(scope.$index,scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

<!--修改elm-->
  <el-dialog v-model="centerDialogVisible" title="修改" width="30%" center>
    <input type="text" value="11"><br><br>
    <input type="text" value="22"><br>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>





	<div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageInfo.currentPage"
	      :page-sizes="[2, 3, 6, 10]"
	      :page-size="pageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.total">
	    </el-pagination>
	  </div> 
</template>

<script>
import { defineComponent, ref } from 'vue'

import qs from 'qs'
//npm install qs
	export default {

		data() {
			return {
        centerDialogVisible: ref(false),
				deptData: [],
				pageInfo:{
					currentPage:1,
					pagesize:3,
					total:0,

				},
				
			}
		},
		methods:{
			handeEdit(index,row){
			/*	alert("修改"+index+":"+row)*/
				console.log(row)
			},
			handeDel(index,row){
				alert("删除"+index+":"+row.deptno)
			},
			handleCurrentChange(page){
				var _this=this
				this.pageInfo.currentPage=page
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/eldata/depts",{params:this.pageInfo})
				.then(function(response){
					console.log("1-------------------------------------------")
					console.log(response.data)
					_this.deptData=response.data.content
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(size){
				var _this=this
				this.pageInfo.pagesize=size
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/eldata/depts",{params:this.pageInfo})
				.then(function(response){
					console.log("2-------------------------------------------")
					console.log(response.data)
					_this.deptData=response.data.content
					_this.pageInfo.total=response.data.totalElements
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		
		created(){
			var _this=this
			this.axios.get("http://localhost:8088/eldata/depts"
			                ,{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.deptData=response.data.content
				_this.pageInfo.total=response.data.totalElements
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>

</style>
