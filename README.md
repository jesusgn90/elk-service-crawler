# Elasticsearch service crawler

> Scan the whole IP4 space looking for exposed Elasticsearch services.

## Requirements

- [Node.js latest](https://nodejs.org)
- [masscan](https://github.com/robertdavidgraham/masscan)

## How to

**Launch the Node.js script for testing candidate URLs**

If it's the very first time you are using it, install NPM related packages:

```
$ cd elk-service-crawler
$ npm i 
```

Now, open a CLI and launch the next command:

```
$ cd elk-service-crawler
$ node tail.js
```

**Launch the masscan helper script**

Open a second CLI and launch the next command:

```
$ cd elk-service-crawler
$ sudo ./start.sh
```

Wait for the results on the first CLI, if an exposed server is found, you'll see it.

Example:

```
$ node tail.js

------------------------------------------------------
| STARTED SERVICE-CRAWLER 0.0.1                      |
------------------------------------------------------

------------------------------------------------------
Elasticsearch server found!
Cluster name: <cluster_name>
Node name   : <node_name>
Address     : <ip>:9200/tcp
------------------------------------------------------
```

## Be aware of the next points

- Scanning the entire Internet is bad. For one thing, parts of the Internet react badly to being scanned. For another thing, some sites track scans and add you to a ban list, which will get you firewalled from useful parts of the Internet.
- Respect data from exposed servers, do not use it for your profit a don't reveal secrets.
- This repository has educational purposes only and I'm not responsible for any damage or any other kind of responsibility related to its usage.

## Contributing

This repository is pretty simple, however, I'm opened to see contributions. Feel free to create a pull request and I'll review it as soon as possible.
