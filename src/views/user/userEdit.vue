<template>
	<el-dialog title="用户管理" :visible.sync="visible" :before-close="handleClose" :close-on-click-modal="false">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item prop="id">
				<label v-model="ruleForm.id" v-show="false"></label>
			</el-form-item>
			<el-form-item label="姓名:" label-width="60px" prop="name">				
				<el-input v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="省份:" label-width="60px" prop="province">
				<el-select v-model="ruleForm.province" placeholder="请选择" style="width: 100%;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="市区:" label-width="60px" prop="city">
				<el-input v-model="ruleForm.city" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址:" label-width="60px" prop="address">
				<el-input v-model="ruleForm.address" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮编:" label-width="60px" prop="zip">
				<el-input v-model="ruleForm.zip" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="日期:" label-width="60px" required>
				<el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="resetForm('ruleForm')">重 置</el-button>
			<el-button @click="visible=false">取 消</el-button>
			<el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	var optionData=[{
		value:'四川',
		label:'四川'
	},{
		value:'北京',
		label:'北京'
	},{
		value:'上海',
		label:'上海'
	},{
		value:'重庆',
		label:'重庆'
	}];
	export default{		
		data(){
			return{
				visible:false,
				options:optionData,
				fullscreenLoading:false,
				ruleForm:{
					id:'',
					name:'',
					province:'',
					address:'',
					zip:'',
					date:''
				},
				rules:{
					name:[
						{required: true, message: '请输入姓名', trigger: 'blur' },
						{ max: 20, message: '长度最多20 个字符', trigger: 'blur'}
					],
					province:[
						{required: true, message: '请选择省份', trigger: 'blur' }
					],
					city:[
						{required: true, message: '请输入市区', trigger: 'blur' }
					],
					address:[
						{required: true, message: '请输入具体地址', trigger: 'blur' }
					],
					zip:[
						{required: true, message: '请输入邮编', trigger: 'blur' },
						// {type:'number',message:'邮编必须为数字', trigger: 'blur'},
						{len:6, message: '邮编长度为六位', trigger: 'blur' }
					],
					date:[
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change'}
					]
				}
			}
		},
		methods:{
			handleClose(done){
				this.$confirm('确认关闭？').then(()=>{
					// this.visible=false;
					done();
				}).catch(()=>{});
			},
			submitForm(formName){
				const that=this;
				this.$refs[formName].validate((valid)=>{
					if(valid){
						that.fullscreenLoading = true;
						var param=JSON.stringify(that.ruleForm);
						this.axios.post(this.$global.user.UpdateUser,param,{
							headers:{
								'Content-Type':'application/json;charset=utf-8'
							}
						})
						.then(function(response){
							if(response.data.status==1){
								that.$message({
									message:"恭喜你，保存成功",
									type:"success"
								});
								that.visible=false;
								that.$parent.GetUserList();
							}
							else{
								that.$message.error("保存出错了哦...."+response.data.msg);
							}
							that.fullscreenLoading = false;
						})
						.catch(function(error){
							that.fullscreenLoading = false;
							console.log(error);
							that.$message.error("保存失败了诶....");
						});
					}						
					else
						return false;
				});
			},
			resetForm(formName){
				this.$refs[formName].resetFields();
			}
		}
	}	
</script>

<style>
</style>
