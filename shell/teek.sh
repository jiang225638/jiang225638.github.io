#!/bin/bash

#提交
cd /d/vitepress-theme-teek-one-private
git status
git pull
git add -A
git commit -m"update data"
git push
git status




#构建
cd /d/vitepress-theme-teek-one-private
pnpm docs:build
echo "----------------------------追加音乐播放器代码前--------------------------------"
tail -5 /d/vitepress-theme-teek-one-private/docs/.vitepress/dist/index.html
sed -i '/<\/body>/i\    <script type="text/javascript" src="https://myhkw.cn/player/js/jquery.min.js"></script>\n    <script type="text/javascript" id="myhk" src="https://myhkw.cn/api/player/1741345067120" key="1741345067120" m="1" lr="r"></script>' /d/vitepress-theme-teek-one-private/docs/.vitepress/dist/index.html
echo "----------------------------追加音乐播放器代码后--------------------------------"
tail -5 /d/vitepress-theme-teek-one-private/docs/.vitepress/dist/index.html



git status
git pull
git add -A
git commit -m"update data"
git push
git status


echo "推送winodws site数据到ecs："
/d/vitepress-theme-teek-one-private/shell/teek.bat
echo "rsync: rsync数据winodws-->ecs推送成功!"
echo ""
echo ""

echo "***************************"
echo "当前仓库状态："
git status



