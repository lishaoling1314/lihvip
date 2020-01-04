export const shaRePath =  ((to,from,next)=>{
    //用户携带initUserID
    to.query.initUserID = from.query.initUserID
    let path = '';
    if(!localStorage.getItem('initUserID')){
        return false;
    }
    if(to.fullPath.indexOf('?')>1){
        path = to.fullPath + '&initUserID='+localStorage.getItem('initUserID')
    }else{
        path = to.fullPath + '?initUserID='+localStorage.getItem('initUserID')
    }
    next(path)
})