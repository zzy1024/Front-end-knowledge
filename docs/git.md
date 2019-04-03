# Git知识备忘

## 一、安装配置git

###1.配置git：

```
#Administrator替换为你的名字
#admin@example.com替换为公司给你提供的邮箱地址
git config --global user.name "Administrator"
git config --global user.email "admin@example.com"
```
###2.创建RSA证书后打开git bash后输入

```
#youname@example.com替换为公司给你提供的邮箱地址
ssh-keygen -t rsa -C "youname@example.com"
```
之后会在C:\Users\Administrator.ssh\生成两个文件id_rsa，id_rsa.pub，这
两个一个是私钥，一个是公钥，创建过程中会提示输入密码，直接忽略就行了。

###3.获取公钥
SSH 公钥默认储存在账户的主目录下的 ~/.ssh 目录，有 .pub 后缀的文件就是公钥，另一个文件则是密钥。
```
$ cd ~/.ssh
$ ls
authorized_keys2  id_dsa       known_hosts
config            id_dsa.pub

$ cat ~/.ssh/id_rsa.pub

ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
NrRFi9wrf+M7Q== schacon@agadorlaptop.local
```

复制公钥然后填写到git上或者发给Git服务器的管理员让他添加一下就可以了

## 二、开发人员日常操作

###1、获取项目

```
git clone ssh://xxxxxxxxx #具体的克隆链接可咨询他人
```

###2、切换分支

```
git checkout -b develop # 创建本地分支的同时切换到新创建的分支上
git checkout develop #切换分支
```
###3、获取提交代码
在正常的工作分支(例如：develop)上进行日常开发，需要共享代码或更新时
   推送到仓库： a> 本地提交：

```
git add a.txt
git commit -m '⼀次普通的本地提交'    #本地提交
git pull origin develop     #获取其他同事的更新
git push origin develop     #推送到仓库,推送前先获取

#项⽬阶段性开发完成后，打版本号通知测试⼈员进⾏测试：
git tag -a v1.0.0
git push origin v1.0.0:refs/tags/v1.0.0
```

## 3、线上BUG处理流程

1、基于线上的版本(例如：v1.0.3)创建⼀个分支(例如：issue)：

```
git checkout -b issue v1.0.3

```
2、在该issue分⽀下修复BUG：

3、在issue分⽀下提交本次修复的内容，并打新的版本号：
```
git commit -a -m '修复v1.0.3版本BUG'
git tag -a v1.0.3.1
```

4、合并⾄正常⼯作分⽀(例如：develop)并推送该更新：

```
git checkout develop
git merge issue
git push origin develop:refs/for/develop
git push origin v1.0.3.1:refs/tags/v1.0.3.1
```

5、等待测试和运维⼈员操作完成确认BUG修复成功后删除issue分支：
```
git branch -d issue
```

##常用操作

```
查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

查看分支合并图：git log --graph

暂存当前分支代码（工作现场）：git stash 

查看当前分支的代码储存现场：git stash list

恢复工作现场：git stash pop

我是第一次修改

```


