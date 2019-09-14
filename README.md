# Elasticsearch service crawler

> Scan the whole IP4 space looking for exposed Elasticsearch services.

## Requirements

- [Node.js latest](https://nodejs.org)
- [masscan](https://github.com/robertdavidgraham/masscan)

## How to

**Launch the Node.js script for testing candidate URLs**

If it's the very first time you are using it, install NPM related packages:

```sh
$ cd elk-service-crawler
$ npm i 
```

Now, open a CLI and launch the next command:

```sh
$ cd elk-service-crawler
$ node tail.js
```

_Note: you can use verbose mode for "tail.js", open the file and replace `const DEBUG = false` with `const DEBUG = true`._

**Launch the masscan helper script**

Open a second CLI and launch the next command:

```sh
$ cd elk-service-crawler
$ sudo ./start.sh
```

Wait for the results on the first CLI, if an exposed server is found, you'll see it.

Example with `DEBUG = false`:

```sh
$ node tail.js
{"cluster_name":"<cluster_name>","name":"<node_name>","httpURL":"http://<ip>:9200","ip":"<ip>","port":"9200/tcp"}
```

Example with `DEBUG = true`:

```sh
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

## Custom IP ranges and advanced usage

Let's say we have some IP ranges, for example, the AWS ranges for EC2:

```sh
$ curl -s https://ip-ranges.amazonaws.com/ip-ranges.json | grep EC2 -b3 | grep ip_prefix | grep -o -P "\d+\.\d+\.\d+\.\d+/\d+" > ip-ranges.txt
```

The above command would generate a list with all the IP ranges for AWS EC2.

Now, we want to scan all of them, let's modify the `start.sh` script as follow:

```sh
#/usr/bin/env bash
PORT="9200"
RATE="1000000"
rm -f output
while read range; do
    RANGE="$range"
    masscan "$RANGE" -p "$PORT" --rate "$RATE" --exclude 255.255.255.255 >> output
done <ip-ranges.txt
```

Then, we can follow the same steps described in this README.md for scanning the whole AWS EC2 space.

#### Useful Elasticsearch commands

See cluster details:

```sh
$ curl <ip>:9200
```

List indices:

```sh
$ curl <ip>:9200/_cat/indices
```

List indices using a pattern:

```shsh
$ curl <ip>:9200/_cat/indices/mypattern*
$ curl <ip>:9200/_cat/indices/mypa*pattern*
$ curl <ip>:9200/_cat/indices/*mypattern*
```

Fetch documents:

```sh
$ curl <ip>:9200/<index-name>/_search?pretty
$ curl <ip>:9200/<index-name>/_search?pretty -s | more
```

## Contributing

This repository is pretty simple, however, I'm opened to see contributions. Feel free to create a pull request and I'll review it as soon as possible.
