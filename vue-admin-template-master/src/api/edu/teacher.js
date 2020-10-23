import request from '@/utils/request'

export default{
    //讲师条件查询分页接口
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit, 
          url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`, 
          method: 'post',
          //把对象换成json 传到接口
           data:teacherQuery
          })
    },
    removeDataById(id){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit, 
          url: `/eduservice/edu-teacher/${id}`, 
          method: 'delete',
        
          })
     },
     //添加讲师
     addTeacher(teacher){
        return request({
            //可以用拼接字符串的方式传值
          url: `/eduservice/edu-teacher/addTeacher`, 
          method: 'post',
          data:teacher
          })
     },
     //修改讲师
     updatedTeacher(teacher){
        return request({
            //可以用拼接字符串的方式传值
          url: `/eduservice/edu-teacher/updateTeacher`, 
          method: 'post',
          data:teacher
          })
     },
     //根据 id查询教师信息
     selectTeacher(id){
        return request({
            //可以用拼接字符串的方式传值
          url: `/eduservice/edu-teacher/getTeacher/${id}`, 
          method: 'get',
          })
     }
}


