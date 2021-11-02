<template>
	<h1>部门职工</h1>
	<el-tree
	:data="treeDate"
	  :props="defaultProps"
	  :load="loadNode"
	  lazy
	  show-checkbox>
	</el-tree>
</template>

<script>
	import qs from 'qs'
  export default {
    data() {
      return {
		 treeDate:[],
		 childrenDate:[],
		 defaultProps: {
		  label: 'name',
		  isLeaf: 0
	     }
      }
    },
    methods: {
      loadNode(node, resolve) {
		  var _this=this
		  var ps={
		  		currentPage:1,
		  		pagesize:6
		  	}
        if (node.level === 0) {			
			this.axios.get("http://localhost:8088/eldata/depts",{params:ps})
			.then(function(response){
				console.log(response.data)
				_this.treeDate=response.data.content
			}).catch(function(error){
				console.log(error)
			})
          return resolve(_this.treeDate);
        }
        if (node.level > 1){
			 return resolve([]);
		}
		console.log(node.data.deptno)
		this.axios.get("http://localhost:8088/eldata/emps/"+node.data.deptno)
			.then(function(response){
				console.log(response.data)
				_this.childrenDate=response.data
				return resolve(_this.childrenDate)
			}).catch(function(error){
				console.log(error)
			})
        return resolve([]);
       
      }
    }
  };
</script>
<style>
</style>
