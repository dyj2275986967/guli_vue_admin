import request from '@/utils/request'

export default{
    getAllSubject(){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit, 
          url: "/eduservice/edu-subject/getAllSubject", 
          method: 'get',
          })
    }
}


