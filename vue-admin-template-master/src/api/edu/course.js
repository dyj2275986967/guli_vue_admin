import request from '@/utils/request'

export default{
    //添加课程信息
    addCourseInfo(courseInfo){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: "/eduservice/edu-course/addCourseInfo", 
          method: 'post',
        //把对象换成json 传到接口
          data:courseInfo
          })
    },
    //查询所有讲师
    getTeacherList(){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: "/eduservice/edu-teacher/findAll", 
          method: 'get',
        //把对象换成json 传到接口
          })
    },
   //根据课程id查询课程基本信息
   getCourseInfoById(id){
    return request({
        //可以用拼接字符串的方式传值
      url: "/eduservice/edu-course/getCourseInfo/"+id, 
      method: 'get',
    //把对象换成json 传到接口
      })
},

   //修改课程信息
   updataCourseInfo(courseInfoVo){
    return request({
        //可以用拼接字符串的方式传值
    //url: '/eduservice/edu-course/getCourseInfoById', 
      url: "/eduservice/edu-course/updataCourseInfo", 
      method: 'post',
    //把对象换成json 传到接口
     data:courseInfoVo
      })
},

  //课程确认信息显示
  getPublishCourseInfo(id){
    return request({
        //可以用拼接字符串的方式传值
    //url: '/eduservice/edu-course/getCourseInfoById', 
      url: "/eduservice/edu-course/getPublishCourseInfo/"+id, 
      method: 'get',
    //把对象换成json 传到接口
      })
},
}

