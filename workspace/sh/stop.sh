#!/bin/bash
if [ -f /tmp/example.pid ]; then
	kill -15 $(cat /tmp/example.pid)
	rm -f /tmp/example.pid
fi
