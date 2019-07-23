
set path=%~1
set dir=%~2
cd %path%
del %dir% /q
rmdir %dir%