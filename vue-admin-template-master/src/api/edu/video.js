import request from '@/utils/request'

export default{
    //添加小结
    addVideo(eduVideo){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: '/eduservice/edu-video/addVideo', 
          method: 'post',
          data:eduVideo
          })
    },
     //根据id查询小结
     getVideoById(videoId){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduservice/edu-video/getVideoById/${videoId}`, 
          method: 'get',
          })
     },
     //更新小结
     updateVideo(eduVideo){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduservice/edu-video/updateVideo`, 
          method: 'post',
          data:eduVideo
          })
     },
     //删除小结
     deleteVideoById(videoId){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduservice/edu-video/${videoId}`, 
          method: 'delete',
          })
     },
     //删除阿里云视频id
     removeAlyVideo(id){
        return request({
            //可以用拼接字符串的方式传值
        //url: '/eduservice/edu-course/addCourseInfo', 
          url: `/eduvod/video/removeAlyVideo/${id}`, 
          method: 'delete',
          })

     }

}
