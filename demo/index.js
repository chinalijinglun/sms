const SMSClient = require('./../index')

const schedule = require('node-schedule');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = '你自己的id'
const secretAccessKey = '你自己的secret'

//初始化sms_client
let smsClient = new SMSClient({ accessKeyId, secretAccessKey })

// //短信回执报告
smsClient.receiveMsg(0, queueName).then(function (res) {
    //消息体需要base64解码
    let { code, body } = res
    if (code === 200) {
        //处理消息体,messagebody
        console.log(body)
    }
}, function (err) {
    console.log(err)
})

//短信上行报告
smsClient.receiveMsg(1, queueName).then(function (res) {
    //消息体需要base64解码
    let { code, body } = res
    if (code === 200) {
        //处理消息体,messagebody
        console.log(body)
    }
}, function (err) {
    console.log(err)
})


//查询短信发送详情
smsClient.queryDetail({
    PhoneNumber: '1500000000',
    SendDate: '20170731',
    PageSize: '10',
    CurrentPage: "1"
}).then(function (res) {
    let { Code, SmsSendDetailDTOs } = res
    if (Code === 'OK') {
        //处理发送详情内容
        console.log(SmsSendDetailDTOs)
    }
}, function (err) {
    //处理错误
    console.log(err)
})

const now = new Date(),
      jhr = new Date(2017, 4, 1),
      calculation = Math.abs(parseInt((jhr - now) / 86400000));

function scheduleCronstyle() {
    //秒 、 分 、时 、 日 、 月 、 年 
    schedule.scheduleJob('30 0 7 * * *', function () {
        // 发送短信
        smsClient.sendSMS({
            PhoneNumbers: '1888888888',
            SignName: '李经纶',
            TemplateCode: 'SMS_88960019',
            TemplateParam: '{"name":"刘颖","date":' + calculation + '}'
        }).then(function (res) {
            let { Code } = res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }, function (err) {
            console.log(err)
        })
    });
}

scheduleCronstyle();