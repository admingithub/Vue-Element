<template>
	<div>
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider style="margin: 5px 0;"></el-divider>
		<div style="margin-bottom: 10px;">
			<el-button @click="AddUser()">新增</el-button>
		</div>		
		<el-table :data="tableData"  v-loading="loading" element-loading-text="拼命加载中" ref="multipleSelection" border stripe highlight-current-row style="width:100%;" max-height="670px" >
			<el-table-column type="selection" width="40"></el-table-column>
			<el-table-column fixed prop="date" label="日期" sortable  width="150"/>
			<el-table-column prop="name" label="姓名"  width="120"/>
			<el-table-column prop="province" label="省份"  width="120"/>
			<el-table-column prop="city" label="市区"  width="120"/>
			<el-table-column prop="address" label="地址"  width="360"/>
			<el-table-column prop="zip" label="邮编"  width="120"/>
			<el-table-column fixed="right" label="操作" width="160">
				<template slot-scope="scope">
					<el-button size="mini" @click="EditUser(scope.$index,scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="DelUser(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
			
		</el-pagination>
		<!-- <add-or-update v-if="addOrupdateVisible" ref="addOrUpdate" @refreshDataList=""></add-or-update> -->
		<userEdit v-if="addOrupdateVisible" ref="addOrUpdate"></userEdit>
	</div>
</template>

<script>
	import userEdit from './userEdit.vue'
	export  default{
		components:{
			userEdit
		},
		data(){
			return{
				multipleSelection: [],
				tableData:[],
				currentPage:1,
				size:10,
				total:0,
				addOrupdateVisible:false,
				loading:true
			}
		},
		created() {
			this.GetUserList()
		},
		activated() {
			this.GetUserList();
		},
		methods:{
			GetUserList(){
				const that=this;
				this.axios.get(this.$global.user.GetUserList,{
					params:{
						page:that.currentPage,
						size:that.size
					}
				})
				.then(function(response){
					that.loading=false;
					that.tableData=response.data.data;
					that.total=response.data.total;
				})
				.catch(function(error){
					console.log(error);
				});
			},
			handleSizeChange(val){
				this.size=val;
				this.GetUserList();
			},
			handleCurrentChange(val){
				this.currentPage=val;
				this.GetUserList();				
			},
			AddUser(){
				this.addOrupdateVisible=true;
				this.$nextTick(()=>{
					this.$refs.addOrUpdate.visible=true;
				});				
			},
			EditUser(index,row){
				const that=this;
				this.$nextTick(()=>{
					this.addOrupdateVisible=true;
					this.axios.get(this.$global.user.GetUserById+"?id="+row.id)
					.then(function(response){						
						that.$refs.addOrUpdate.visible=true;
						that.$refs.addOrUpdate.ruleForm=response.data;					
					})
					.catch(function(error){
						console.log(error);
					});
				});				
			},
			DelUser(index,rows){
				const that=this;
				this.axios.get(that.$global.user.DeleteUserById+"?id="+rows[index].id)
				.then(function(response){
					if(response.data.status===0)
						that.$message.error(response.data.msg);
					else{
						that.$message({showClose:true,message:response.data.msg,type:'success'});
						that.GetUserList();
					}						
				})
				.catch(function(error){
					that.$message.error(error);
					console.log(error);
				});
			}
		}
	}
</script>

<style>
</style>
