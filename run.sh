#/usr/bin/env /bin/sh

rake db:setup && rails server --port 3000 --binding "0.0.0.0"
