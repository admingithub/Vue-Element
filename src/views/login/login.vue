<template>
	<div class="login-main">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form" >
			<h3 class="login-title">系统登录</h3>
			<el-form-item prop="name" label-width="0">
				<el-input placeholder="用户名" v-model="ruleForm.name" prefix-icon="el-icon-user" clearable class="login-input"></el-input>
			</el-form-item>
			<el-form-item prop="pwd" label-width="0">
				<el-input placeholder="密码" v-model="ruleForm.pwd" prefix-icon="el-icon-lock" clearable show-password class="login-input"></el-input>	
			</el-form-item>
			<el-form-item label-width="0">
				<el-button type="primary"  @click="submitForm('ruleForm')" class="login-button" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
			</el-form-item>
		</el-form>		
	</div>	
</template>

<script>
	export default{
		name:"login",
		data(){
			return{
				fullscreenLoading: false,
				ruleForm:{
					name:'admin',
					pwd:'admin1'
				},
				rules:{
					name:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					pwd:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6,max:20, message: '长度至少 6 个字符', trigger: 'blur' }
					]
				}
			};
		},
		methods:{
			submitForm(formdata){
				
				this.$refs[formdata].validate((valid) => {
					if (valid) {
						localStorage.setItem(this.$global.tokenId,this.ruleForm.name);
						this.$router.push({ path: '/' })
					} 
					else {
						console.log('error submit!!');
						return false;
						}
					});
			}
		}
	}
</script>

<style>
	.login-main{
		min-height: 100%;
		width: 100%;
		background-color: #2d3a4b;
		overflow: hidden;
	}
	.login-form{
		position: relative;
		width: 420px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;	
	}
	.login-title{
		color: white;
		font-size: 26px;
		text-align: center;
		margin: 0 auto 40px auto;
	}
	.login-input,.login-button{
		margin-top: 10px;
		width: 100%;
	}
</style>
