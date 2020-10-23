<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>
  <el-form label-width="120px">
  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
  </el-form-item>
  <!-- 所属分类 TODO -->
  <!-- 所属分类：级联下拉列表 -->
<!-- 一级分类 -->
<el-form-item label="课程类别">
  <el-select
    v-model="courseInfo.subjectParentId"
    placeholder="请选择" @change="oneSubjectChange">
    <el-option
      v-for="subject in subjectNestedList"
      :key="subject.id"
      :label="subject.title"
      :value="subject.id"/>
  </el-select>
    <!-- 二级分类 -->
<el-select v-model="courseInfo.subjectId" placeholder="请选择">
  <el-option
    v-for="subject in subSubjectList"
    :key="subject.value"
    :label="subject.title"
    :value="subject.id"/>
</el-select>
</el-form-item>
  <!-- 课程讲师 TODO -->
<!-- 课程讲师 -->
<el-form-item label="课程讲师">
  <el-select
    v-model="courseInfo.teacherId"
    placeholder="请选择">
    <el-option
      v-for="teacher in teacherList"
      :key="teacher.id"
      :label="teacher.name"
      :value="teacher.id"/>
  </el-select>

</el-form-item>

  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
  </el-form-item>
  <!-- 课程简介 TODO -->
<!-- 课程简介-->
<el-form-item label="课程简介">
    <tinymce :height="300" v-model="courseInfo.description"/>
</el-form-item>
  <!-- 课程封面 TODO -->
<!-- 课程封面-->
<el-form-item label="课程封面">
  <el-upload
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :action="BASE_API+'/eduoss/fileoss'"
    class="avatar-uploader">
    <img :src="courseInfo.cover">
  </el-upload>
</el-form-item>
  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
  </el-form-item>
  <el-form-item>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
 import course from '@/api/edu/course.js'
 import subject from '@/api/edu/subject.js'
 import Tinymce from '@/components/Tinymce'
 
 export default {
    //声明
    components: { Tinymce },
    data() {
      return {
        saveBtnDisabled:false,
         courseInfo :{
         title: '',
         subjectId: '',//二级分类id
         subjectParentId:'',//一级分类id
         teacherId: '',
         lessonNum: 0,
         description: '',
         cover: 'static/loading.gif',
         price: 0 
      },
      courseId:'',
      //所有讲师信息
      teacherList :[],
      //所有的一级课程信息
      subjectNestedList:[],
      //一级分类
      subSubjectList:[],
      BASE_API: process.env.BASE_API // 接口API地址
      };
    },
  
    created () {
     
    this.init()
    },
    //监听
  watch: {
    $route(to, from) {//路由发生变化  都会执行该方法
     this.courseInfo ={
         title: '',
         subjectId: '',//二级分类id
         subjectParentId:'',//一级分类id
         teacherId: '',
         lessonNum: 0,
         description: '',
         cover: 'static/loading.gif',
         price: 0 
      }
      this.init()
    }
  },
    methods: {
   init(){
     
    if(this.$route.params && this.$route.params.id){
         this.courseId=this.$route.params.id
          this.getCourseInfoById()
       }else{
   //所有的讲师信息
        this.getTeacherList()
        //一级的课程信息
       this.getOneSubject()

       }
    
       


        },
      //根据id查询课程信息
      getCourseInfoById(){
         course.getCourseInfoById(this.courseId)
               .then(response=>{
                 //所有课程信息
                 this.courseInfo=response.data.courseInfoVo
                 // 回显展示二级分类
                 subject.getAllSubject()
                        .then(response=>{
                      //遍历list
                      for(var i=0;i<response.data.list.length;i++){
                         console.log(response.data.list[i].id)
                         if(this.courseInfo.subjectParentId==response.data.list[i].id){
                              this.subSubjectList=response.data.list[i].children
                             
                         }
 
                      }
                        })

                    //所有的讲师信息
                      this.getTeacherList()
                //一级的课程信息
                   this.getOneSubject()
               })

      },
   
     //下拉框改变后事件 ，value-是elementUI直接注入进来的不用传
    oneSubjectChange(value){
      for(var i=0;i<this.subjectNestedList.length;i++){
          if(value==this.subjectNestedList[i].id){
            this.subSubjectList=this.subjectNestedList[i].children
          }

      }
      //清空二级分类
      this.courseInfo.subjectId='';
    },

      //下一步
      next() {
            //如果路径中有值,做修改 
          if(this.$route.params && this.$route.params.id){
            course.updataCourseInfo(this.courseInfo)
                  .then(response=>{
                this.$message({
                 type: 'success',
               message: response.data.msg
                });
                      this.$router.push({path:'/course/chapter/'+this.courseId})
                  })
        //没有做插入操作
          } else{
        course.addCourseInfo(this.courseInfo)
             .then(response=>{
               //提示信息
                this.$message({
                 type: 'success',
               message: '添加课程信息成功!'
             });
              this.$router.push({path:'/course/chapter/'+response.data.courseId})
             })      

          }  
      },
      //查询所有的讲师信息
      getTeacherList(){
        course.getTeacherList()
              .then(response=>{
              this.teacherList= response.data.items
              })

      },
      //查询一级的课程信息
      getOneSubject(){
         subject.getAllSubject()
                .then(response=>{

               this.subjectNestedList=response.data.list

                })
      },
      //上次封面成功的方法
      handleAvatarSuccess(res,file){
        this.courseInfo.cover=res.data.url

      },
      //上传之前做的事情file
      beforeAvatarUpload(file){

   const isJPG = file.type === 'image/jpeg'
   const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
      }
   

    }
  }
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>