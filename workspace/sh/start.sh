#!/bin/bash
set -m
if [ -x rust/debug/example ] && [ ! -f /tmp/example.pid ]; then
	nohup rust/debug/example > run.log 2>&1 &
	echo $! > /tmp/example.pid
fi
