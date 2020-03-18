<template>
	<el-container :style="defaultHeight">
		<!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)"> -->
		<div class="el-aside" style="background-color:#304156">
			<el-menu class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b" router unique-opened :collapse="isCollapse" back>
				<template v-for="route in menus" >
					<el-submenu v-if="route.isShow&&route.children.length>0&&!route.redirect" v-bind:key="route.path"  :index="route.index">
						<template slot="title">
							<i :class="route.icon"></i>
							<span slot="title">{{route.meta.title}}</span>
						</template>
						<el-menu-item v-for="item in route.children" v-bind:key="item.path" :index="item.path" >{{item.meta.title}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else-if="route.isShow"  :index="route.path" v-bind:key="route.path" >
						<i :class="route.icon"></i>
						<span slot="title">{{route.meta.title}}</span>
					</el-menu-item>
				</template>
			</el-menu> 
			</div>
		<!-- </el-aside> -->
		<el-container>
			<el-header style="height: 50px;">
				<div style="float: left;">
					<div class="blockAside" @click="isCollapse =!isCollapse">
						<i v-if="isCollapse" class="el-icon-s-unfold" ></i>
						<i v-else class="el-icon-s-fold" ></i>
					</div>
				</div>
				<el-dropdown @command="userCommand">
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="1">查看</el-dropdown-item>
						<el-dropdown-item command="2">新增</el-dropdown-item>
						<el-dropdown-item command="3">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>王小虎</span>
			</el-header>
			
			<el-main>
				<router-view :key="key"></router-view>
			</el-main>
			<el-footer style="height: 50px;">Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script>
	export default{
		name:"appmain",
		computed:{
			key(){
				return this.$route.path
			}
		},
		data(){
			return{
				isCollapse:false,// 左侧菜单默认展开
				defaultHeight:{//主页高度
					height:''
				},
				menus:this.$router.options.routes
			}
		},
		methods:{
			userCommand(command){
				if(command=="3"){
					localStorage.removeItem(this.$global.tokenId);
					this.$router.push({path:'/login'});
				}					
			}
		},
		created(){
			this.defaultHeight.height=window.innerHeight+"px";
		},
		mounted() {
			const that=this;
			window.onresize=()=>{
				that.defaultHeight.height=window.innerHeight+"px";
			}
		}
	}
</script>

<style>
	.el-header,.el-footer {
		background-color: #B3C0D1;
		font-size: 12px;
		text-align: right;
		color: #333;
		line-height: 50px;
		padding-right: 20px;
		padding-left: 0;
	}
	.el-aside {
		color: #333;
		overflow: auto;
	}
	.left-aside{
		display: inline-block;
		position: relative;
		overflow: auto;
		background-color: #324157 !important;
	}
	.blockAside{
		width: 60px;
		height: 100%;
		cursor: pointer;
		font-size: 25px;
		text-align: center;
	}
	.blockAside:hover{
		background: #bac7d8;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
		border-right: 0px;
	}

</style>
