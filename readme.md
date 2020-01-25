## 环境要求
npm环境,版本：6.10.3     
mongodb数据库，要提前建好名为test的数据库，并创建一个管理员用户，具体命令如下(前提条件：mongodb服务已经正确启动)：
在mongodb命令行界面输入：    
1. use test
2. db.createUser({user:"admin",pwd:"admin",roles:["dbAdmin"]})

## 使用方法
1. 进入该项目的根目录，新建终端，输入：    
npm install 来下载项目所需的全部依赖    
2. 继续输入：DEBUG=signup:* npm start
若控制台输出“连接成功”的字样说明服务端正确启动
**注意，该服务运行在本机的8001端口，请确保8001端口没有被占用**
**如果被占用可以修改源代码(全局搜索8001替换为您的端口号即可)**
## 域名以及对应内容
- localhost:8001/ --- 首页
- localhost:8001/regist --- 注册页面
- localhost:8001/signin --- 登陆页面
