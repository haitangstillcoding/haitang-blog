@REM 打包项目，删除远程服务器的静态站点文件，上传打包文件到服务器nginx目录下并解压
cd docs/.vitepress
tar -czvf dist.tar.gz dist
ssh root@114.132.61.45 "cd /home/nginx/html ; rm -rf ./*"
scp dist.tar.gz root@114.132.61.45:/home/nginx/html 
ssh root@114.132.61.45 "cd /home/nginx/html ; tar -zxvf dist.tar.gz"