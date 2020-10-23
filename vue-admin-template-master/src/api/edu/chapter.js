import request from '@/utils/request'

export default{
    //根据课程id获取章节小结列表
    getChapterVideo(courseId){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduservice/edu-chapter/getChapterVideo/${courseId}`, 
          method: 'get'
          })
    },
    //添加章节
    addChapter(eduChapter){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: '/eduservice/edu-chapter/addChapter', 
          method: 'post',
          data:eduChapter
          })
    },
    // 根据id查询章节
    getChapterInfo(courseId){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduservice/edu-chapter/getChapterInfo/${courseId}`, 
          method: 'get'
          })
    },
   //更新章节
   updateChapter(eduChapter){
    return request({
        //可以用拼接字符串的方式传值
    //url: '/eduservice/edu-course/addCourseInfo', 
      url:'/eduservice/edu-chapter/updateChapter', 
      method: 'post',
      data:eduChapter
      })
},
    //删除章节
    deleteChapterByChapterId(courseId){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url:`/eduservice/edu-chapter/${courseId}`, 
          method: 'delete'
          })
    },
    //小结APi操作开始=======================》》》》》
  
}


