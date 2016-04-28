#!/usr/bin/env bash
#
# File        : provision.sh
# Description : Vagrant provisioning script.
# Copyright   : Copyright (c) 2016 Mirror Labs Inc. All rights reserved.
# Maintainer  : Enzo Haussecker <enzo@mirror.co>
# Stability   : Stable
# Portability : Portable
#
# NOTICE: Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# This script provides provisioning for the Vagrant development environment.
##

# Update package manager.
apt-get update

# Install Python development tools.
apt-get install -y libyaml-dev python-dev python-pip
pip install watchdog

# Install SSL development libraries.
apt-get install -y libssl-dev

# Install Rust development tools.
wget \
	https://static.rust-lang.org/dist/rust-1.7.0-x86_64-unknown-linux-gnu.tar.gz \
	-O /tmp/rust-1.7.0-x86_64-unknown-linux-gnu.tar.gz
if [[ $(sha1sum /tmp/rust-1.7.0-x86_64-unknown-linux-gnu.tar.gz) = \
	7cb14cfd368d6ea9f680db82796ebe4bf126bb28* \
	]]; then
	pushd /tmp
	tar -xf rust-1.7.0-x86_64-unknown-linux-gnu.tar.gz
	pushd rust-1.7.0-x86_64-unknown-linux-gnu
	sh install.sh
	popd
	popd
else
	echo -e '\033[91mCannot download the Rust compiler from rust-lang.org.\033[0m'
fi

# Install Babel and Less compilers.
apt-get install -y npm
npm install --global babel-cli babel-plugin-transform-react-jsx less
ln -s /usr/bin/nodejs /usr/bin/node

# Install Google HTML compressor.
wget \
	https://htmlcompressor.googlecode.com/files/htmlcompressor-1.5.3.jar \
	-O /tmp/htmlcompressor-1.5.3.jar
if [[ $(sha1sum /tmp/htmlcompressor-1.5.3.jar) = \
	57db73b92499e018b2f2978f1c7aa7b1238c7a39* \
	]]; then
	mkdir /opt/lib
	mv /tmp/htmlcompressor-1.5.3.jar /opt/lib
	cat <<EOF > /usr/bin/html-compressor
#!/bin/sh
java -jar /opt/lib/htmlcompressor-1.5.3.jar \$1 -o \$2
EOF
	chmod +x /usr/bin/html-compressor
else
	echo -e '\033[91mCannot download the HTML compression library from googlecode.com.\033[0m'
fi

# Install YUI compressor.
apt-get install -y yui-compressor

# Remove temporary files.
rm -r /tmp/*
