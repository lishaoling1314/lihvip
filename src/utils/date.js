class DATE{
    newDate(time,bakccll){//倒计时
        
        //获取结束时间
        let end_date = time
        end_date = end_date.replace(/-/g, '/')
        let end_time = new Date(end_date)
        end_time = end_time.getTime()
        setInterval(() => {
            return bakccll(this.presellDate(end_time))
        }, 1000)
    }

    presellDate(endTime) {//
        let GDate = new Date().getTime()
        let leftTime = endTime - GDate
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
        let hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
        let minutes = parseInt((leftTime / 1000 / 60) % 60, 10) //计算剩余的分钟
        let seconds = parseInt((leftTime / 1000) % 60, 10) //计算剩余的秒数
        let date = new Object();

        date.days = days
        date.hours = this.openZero(hours)
        date.minutes = this.openZero(minutes)
        date.seconds = this.openZero(seconds)

        return date
    }


    openZero(zero) {
        //加0
        if (zero <= 9) {
            zero = '0' + zero
        }
        return zero
    }
    
}



const GSX_DATE = new DATE();

export default GSX_DATE 