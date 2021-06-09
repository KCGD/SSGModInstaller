@echo off
nwbuild -p win64 -o build -v 0.54.0 --flavor normal --winIco "./resources/mc.ico" "%CD%"
pause