@REM 上传项目到github 
cd docs/.vitepress/dist
git init
git add -A
git commit -m "auto deploy"
git push -f git@github.com:haitangstillcoding/haitangstillcoding.github.io.git master:gh-pages