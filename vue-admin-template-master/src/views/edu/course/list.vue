<template>
  <div class="app-container">
         课程列表
     <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名"/>
      </el-form-item>
       <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
          <el-option :value="0" label="未发布"/>
          <el-option :value="1" label="已发布"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
  <!-- 表格 -->
<el-table
  v-loading="listLoading"
  :data="list"
  element-loading-text="数据加载中"
  border
  fit
  highlight-current-row
  row-class-name="myClassList">
  <el-table-column
    label="序号"
    width="70"
    align="center">
    <template slot-scope="scope">
      {{ (page - 1) * limit + scope.$index + 1 }}
    </template>
  </el-table-column>
  <el-table-column label="课程信息" width="470" align="center">
    <template slot-scope="scope">
      <div class="info">
        <div class="pic">
          <img :src="scope.row.cover" alt="scope.row.title" width="150px">
        </div>
        <div class="title">
          <a href="">{{ scope.row.title }}</a>
          <p>{{ scope.row.lessonNum }}课时</p>
        </div>
      </div>
    </template>
  </el-table-column>
  <el-table-column label="创建时间" align="center">
    <template slot-scope="scope">
      {{ scope.row.gmtCreate.substr(0, 10) }}
    </template>
  </el-table-column>
  <el-table-column label="发布时间" align="center">
    <template slot-scope="scope">
      {{ scope.row.gmtModified.substr(0, 10) }}
    </template>
  </el-table-column>
      <el-table-column label="发布状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>
  <el-table-column label="价格" width="100" align="center" >
    <template slot-scope="scope">
      {{ Number(scope.row.price) === 0 ? '免费' :
      '¥' + scope.row.price.toFixed(2) }}
    </template>
  </el-table-column>
  <el-table-column prop="buyCount" label="付费学员" width="100" align="center" >
    <template slot-scope="scope">
      {{ scope.row.buyCount }}人
    </template>
  </el-table-column>
  <el-table-column label="操作" width="150" align="center">
    <template slot-scope="scope">
      <router-link :to="'/course/info/'+scope.row.id">
        <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
      </router-link>
      <router-link :to="'/course/chapter/'+scope.row.id">
        <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
      </router-link>
      <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteCourseById(scope.row.id)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
   <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
 import course from '@/api/edu/course.js'

 
 export default {

    data() {
      return {
         list:null,//表格数据
             //当前页面
            page:1,
            //每页显示的记录数
            limit:7,
            //总记录数
            total:0,
            //条件对象
           courseQuery:{},
           listLoading:true
      };
    },
  
    created () {
     this.getList()
    },
    methods: {
       //查询全部课程信息
        getCourseList(){
            course.getCourseList()
                  .then(response=>{
                    this.list=response.data.list
                  })

        },
        //条件查询
       getList(page=1){
            this.page=page
            course.pageCourseCondition(this.page,this.limit,this.courseQuery)
                  .then(response=>{
                    this.total=response.data.total
                    this.list=response.data.rows
                    this.listLoading=false
                    console.log(response);
                  })

        },
        //清空表单
        resetData(){
           this.courseQuery={};
        },
        //删除课程信息
        deleteCourseById(courseId){
              this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         course.deleteCourseById(courseId)
          .then(response=>{
                    //提示信息 
         this.$message({
            type: 'success',
            message: '删除成功!'
          });
                    //回到列表页面
                    this.getList();
                   })//请求成功
                   .catch(error=>{
                          //error 请求失败的信息
                     console.log(error)
                   })//请
        }).catch(() => {
             
        });


        }


    }
  }
</script>