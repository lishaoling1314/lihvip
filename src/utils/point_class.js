
class Point{
    /**
    * 判断字符串是否为空
     @param str
    * @returns {boolean}
    */
    isNull(str){
        return str == null || str.length === 0 || str === ''; 
    }

    formatDateTime(inputTime){//时间搓转换器formatDateTime(时间搓’)-----2021-08-31 00:00:00
        var date = new Date(inputTime);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;  
        second = second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    }



    
    

}


const point = new Point();

export default point 