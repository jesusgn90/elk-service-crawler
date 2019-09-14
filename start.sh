#/usr/bin/env bash
PORT="9200"
RATE="1000000"
RANGE="0.0.0.0/0"
rm -f output
masscan "$RANGE" -p "$PORT" --rate "$RATE" --exclude 255.255.255.255 >> output
