# Docker 常用命令

## **1. Docker 版本和帮助命令**

```bash
# 查看 Docker 版本
docker --version

# 查看 Docker 详细信息
docker info

# 查看某个命令的帮助
docker <command> --help
```

---

## **2. 镜像操作**

```bash
# 搜索镜像
docker search <镜像名>

# 拉取镜像
docker pull <镜像名>:<标签>

# 查看本地镜像列表
docker images

# 删除镜像
docker rmi <镜像ID>
```

---

## **3. 容器操作**

```bash
# 运行一个容器（后台模式）
docker run -d --name <容器名> -p <宿主端口>:<容器端口> <镜像名>

# 运行一个交互式容器
docker run -it --name <容器名> <镜像名> /bin/bash

# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop <容器ID>

# 启动已停止的容器
docker start <容器ID>

# 重启容器
docker restart <容器ID>

# 删除容器
docker rm <容器ID>
```

---

## **4. 进入容器内部**

```bash
# 方式 1: 使用 exec 进入正在运行的容器
docker exec -it <容器ID或名称> /bin/bash

# 方式 2: 使用 attach 进入正在运行的容器
# (注意: 使用 Ctrl + P + Q 退出，防止关闭容器)
docker attach <容器ID>

# 方式 3: 进入容器的 shell
nsenter --target $(docker inspect --format "{{.State.Pid}}" <容器ID>) --mount --uts --ipc --net --pid
```

---

## **5. 数据管理（Volumes）**

```bash
# 创建一个数据卷
docker volume create <卷名>

# 列出所有数据卷
docker volume ls

# 查看某个数据卷的详细信息
docker volume inspect <卷名>

# 删除数据卷
docker volume rm <卷名>
```

---

## **6. 构建自定义镜像**

```bash
# 进入包含 Dockerfile 的目录
cd /path/to/dockerfile

# 构建镜像
docker build -t <镜像名>:<标签> .

# 查看构建的镜像
docker images

# 提示
Play with Docker 使用 amd64 平台。
如果您使用的是基于 ARM 且搭载 Apple 芯片的 Mac，则需要重建映像以与 Play with Docker 兼容，并将新映像推送到您的存储库。
要为 amd64 平台构建图像，请使用--platform标志 Docker buildx 还支持构建多平台镜像。要了解更多信息，请参阅 多平台镜像。

# 单个
docker build --platform linux/amd64 -t <镜像名>:<标签> .

# 多个
docker build --platform linux/amd64,linux/arm64 -t <镜像名>:<标签> .

```

---

## **7. Docker Compose（管理多个容器）**

```bash
# 启动服务（后台运行）
docker-compose up -d

# 停止服务
docker-compose down

# 监听服务
docker-compose watch

# 查看 Compose 服务状态
docker-compose ps

# 容器已创建但未运行
docker compose start

# 容器未创建
docker compose up -d

#只启动特定服务
docker compose start <服务名>

#强制重新构建
docker compose up -d --build
```

---

## **8. 清理无用资源**

```bash
# 清理所有停止的容器
docker container prune

# 清理所有无用的镜像
docker image prune -a

# 清理所有未使用的数据卷
docker volume prune

# 清理所有无用的网络
docker network prune

# 一键清理所有无用资源
docker system prune -a
```

---

## **9. 其他常用命令**

```bash
# 查看容器的日志
docker logs -f <容器ID>

# 查看容器资源占用情况
docker stats

# 查看容器的端口映射
docker port <容器ID>
```

## **10. 退出容器的方法**

```bash
# 方式 1: 退出并保持容器运行
Ctrl + P + Q

# 方式 2: 退出并停止容器
exit
```

📌 **温馨提示**

- `-d` 表示后台运行容器
- `-it` 让容器进入交互模式
- `--name` 设定容器名称
- `-p 宿主端口:容器端口` 端口映射
- `-v 宿主目录:容器目录` 挂载数据卷

## 11. Dockerfile 常用指令

```bash
* FROM <image>- 这指定了构建将扩展的基础图像。
* WORKDIR <path>- 该指令指定“工作目录”或图像中将复制文件和执行命令的路径。
* COPY <host-path> <image-path>- 该指令告诉构建器从主机复制文件并将其放入容器映像中。
* RUN <command>- 该指令告诉构建器运行指定的命令。
* ENV <name> <value>- 该指令设置正在运行的容器将使用的环境变量。
* EXPOSE <port-number>- 该指令在图像上设置配置，指示图像想要公开的端口。
* USER <user-or-uid>- 该指令为所有后续指令设置默认用户。
* CMD ["<command>", "<arg1>"]- 该指令设置使用此映像的容器将运行的默认命令。
```

## 12. 实践操作

### 本地获取指定版本镜像

```bash
docker pull harbor.tiduyun.com/datagradient/datagradient-ui:2.1.x-706-lite --platform=linux/arm64
```

### 修改名称

```bash
docker tag harbor.tiduyun.com/datagradient/datagradient-ui:2.1.x-706-lite datagradient-ui:2.1.x-706-lite-arm64
```

### 保存镜像

```bash
docker save datagradient-ui:2.1.x-706-lite-arm64 | gzip > datagradient-ui-2.1.x-706-lite-arm64.tar.gz
```

### bundle-images.sh 脚本多架构镜像

```bash
for p in amd64 arm64; do
  (docker pull "$img" --platform=linux/$p && docker tag "$img" "$target_img") >/dev/null
  f=$(echo "${target_img##*/}" |tr ':' '_')-$p.tar.gz
  docker save "${target_img}" |gzip >./"$f";
  echo >&2 "-> $f"
done
```

### [多架构镜像导出](https://doc.tiduyun.com/pages/viewpage.action?pageId=71794815)

获取对应架构镜像

```bash
docker pull <SOURCE_IMAGE_URL> --platform linux/arm64
```

保存下载 gzip

```bash
docker save <SOURCE_IMAGE_URL> |gzip > xx-arm64.tgz
```

### [基于现有镜像构建多架构镜像(cmp-ui)](https://doc.tiduyun.com/pages/viewpage.action?pageId=31360393)

登录服务器

```bash
ssh root@192.168.0.233
```

执行脚本

```bash
sh ./update-73.sh <SOURCE_IMAGE_URL> <TARGET_IMAGE_NAME>
```

### 下载远程资源

```bash
scp root@192.168.0.217:/mount/cmp/sources/cmp-ui/datagradient-ui_2.1.x-706-lite-arm64.tar.gz ./
```
