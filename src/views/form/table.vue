<template>
	<div>
		<div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>组件</el-breadcrumb-item>
				<el-breadcrumb-item>表格</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-divider style="margin: 5px 0;"></el-divider>
		<div style="padding-bottom: 10px;">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-date-picker v-model="filterDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				</el-col>
				<el-col :span="4">
					<el-input v-model="filterName" clearable placeholder="姓名"></el-input>
				</el-col>
				<el-col :span="4">
					<el-select v-model="filterCity" filterable clearable multiple placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="FilterSearch()">搜索</el-button>
				</el-col>
			</el-row>
		</div>		
		<el-table :data="tableData" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading" ref="multipleSelection" border stripe highlight-current-row style="width:100%;" height="100%">
			<el-table-column type="selection" width="40"></el-table-column>
			<el-table-column fixed prop="date" label="日期" sortable  width="150"/>
			<el-table-column prop="name" label="姓名"  width="120"/>
			<el-table-column prop="province" label="省份"  width="120"/>
			<el-table-column prop="city" label="市区"  width="120"/>
			<el-table-column prop="address" label="地址"  width="360"/>
			<el-table-column prop="zip" label="邮编"  width="120"/>
			<el-table-column prop="tag" label="标签" width="100" :filters="[{text:'家',value:'家'},{text:'公司',value:'公司'}]" :filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.tag==='家'?'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	var data=[{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }];
	var filterOptions=[{
		value:'成都',
		label:'成都'
	},
	{
		value:'重庆',
		label:'重庆'
	},{
		value:'上海',
		label:'上海'
	},{
		value:'北京',
		label:'北京'
	},{
		value:'广州',
		label:'广州'
	}];
	export default{
		data(){
			return{
				multipleSelection: [],
				tableData:data,
				filterName:'',
				filterDate:'',
				filterCity:'',
				options:filterOptions,
				loading:true
			}
		},
		methods:{
			filterTag(value,row){
				return row.tag === value;
			},
			filterHandler(value,row,column){
				const property=column['property'];
				return row[property] === value;
			},
			handleEdit(index,row){
				console.log(index,row);
				alert("编辑行索引号:"+index);
			},
			handleDelete(index,rows){
				var that=this;
				this.axios.get(that.$global.user.DeleteUser+"?id="+rows[index].id)
				.then();
			},
			FilterSearch(){
				alert(this.filterDate+"\r"+this.filterName+"\r"+this.filterCity);
			}
		}
	}
</script>

<style>
</style>
