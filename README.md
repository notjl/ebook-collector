# < L I B R A R Y > | E-book Collector
A CPE025 (Software Design) Project by Team 6.

It is **advised** to use [pdm](https://pdm.fming.dev/latest/) as a packaging system to ensure system and package compatibility. Make sure you have `Python 3.10.4` installed to start. To begin:
```
$ pip install pdm
$ pdm --pep582
$ pdm plugin add pdm-vscode # This is to assume you are using VSCode / Code - OSS

// Restart shell / terminal

$ git clone git@github.com:CPE025-Team-6/ebook-collector.git
$ cd ebook-collector
$ pdm install
```
These instructions assume you are using VSCode / Code - OSS as IDE, if not follow [Working with PEP582](https://pdm.fming.dev/latest/usage/pep582/) for PEP582 IDE Support.

#### MongoDB
Make sure you have [MongoDB](https://mongodb.com/) installed (MongoDB 6.0). If you have the luxury to do so, install MongoDB Compass.

Open MongoSH or MongoDB Compass (you should see mongosh in Compass)
Type in MongoSH
```
test >> use local
local >> db.startup_log.find().sort({startTime:-1}).limit(1).pretty()
```
Look for `storage: {dbPath: ...}`. Paste the given db in Discord group DMs.

You can change the default dbPath by going to `path/to/mongodb_install_dir/bin/mongod.cfg`


#### Start server
```
$ pdm run server
```
Go to `localhost:8000/docs` to access API documentation


#### API Access
Use [hoppscotch](https://hoppscotch.io/) - a postman alternative, to try accessing the API.

**NOTE:** Install the extension first then add `http://localhost:8000` or `http://127.0.0.1:8000` as origin


### Contributing
If you have problems with the backend / API, send me a message at Discord or create an Issue.

### License
This project is licensed under the terms of the [Expat License (MIT)](LICENSE).
