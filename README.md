## Build React Projects with Waf

### Introduction
We show that [Waf](https://waf.io) provides an alternative to [Gulp](http://gulpjs.com) for front-end development and automation. Our example uses Waf to automate build tasks for [React](https://facebook.github.io/react) components, including compiling, minifying, installing, and unit testing them. The results are served from a [Rust](https://www.rust-lang.org) web server, which is also built with Waf. 

### Prerequisites
Download and install [Vagrant](https://www.vagrantup.com/downloads.html) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

### Configuration
Run the following command from inside the vagrant directory to configure a virtual machine that contains all the dependencies needed to run this example.

```bash
vagrant up
```

### Usage
You can access the virtual machine over SSH by running the following command.

```bash
vagrant ssh
```
We use Waf to compile, minify, install, and unit test React components. Run the following commands from inside your virtual machine to perform these actions.

```bash
cd /opt/project/workspace
python waf configure build install test
```

### Destruction
Run the following command from inside the vagrant directory to destroy your virtual machine.

```bash
vagrant destroy
```
