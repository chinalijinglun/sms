## 步骤1
现在阿里云通信中的短信签名中申请签名，签名在你短信中是以：
 【短信签名】你短信模板内容
方式为主的。

## 步骤2
申请短信模板，短信模板的变量是以这种形式存在的：${name}，可以写多个：
 示例：尊敬的${name}，您的快递已在飞奔的路上，将在今天${time}送达您的手里，请留意查收。

## 步骤3 
申请accesskeys，在你控制台上面有个accesskeys，点击申请就能显示你的id及Secret。

## 步骤4
在demo文件夹中的index.js中填写你的accessKeyId和secretAccessKey，就是你在步骤3申请的id和secret。

## 步骤5
在sendSMS中填写
1、PhoneNumbers  // 发送短信的账号，可以多写，用逗号分隔
2、SignName      // 你步骤一申请的签名
3、TemplateCode  // 你步骤2申请的模板code码
4、TemplateParam // 你步骤2中短信模板的变量名称要表达的含义

## 步骤6
定时执行任务node-schedule

```javascript
      function scheduleCronstyle(){
        //秒 、 分 、时 、 日 、 月 、 年 
            schedule.scheduleJob('30 0 7 * * *', function(){
                console.log('scheduleCronstyle:' + new Date());
            }); 
        }
    scheduleCronstyle();
```
6个*分别代表了秒 、 分 、时 、 日 、 月 、 年 ，如上每天7点0分30秒的时候

## 步骤7 
服务器上面pm2守护对应的nodejs进程即可。

ps：
阿里云短信这个一进来会送10元的代金券，可以用很久了。
祝各位能哄得女朋友开心