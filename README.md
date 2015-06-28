# README #

### What is this repository for? ###

* The UVic Ballroom Club Website

### How do I get the folder on my computer? ###

* download git [here](https://git-scm.herokuapp.com/downloads) for windows or mac
* download git through the command line on linux `sudo apt-get git`
* open the command line(cmd on windows, terminal on mac)
* navigate to the folder you would like the website in in the command line
    * for windows - shift -> right click -> open command line here
    * for mac and linux - `cd [folder name]`
* run `git clone git@bitbucket.org:uvicballroom/uvicballroomwebsite.git` which will create a folder for the website and download all the files for it
* if prompted, enter your password from bitbucket

### How do I get set up? ###

* download npm [here](https://nodejs.org/download/) for windows or mac 
* download npm through the command line on linux `sudo apt-get nodejs`
* open the command line(cmd on windows, terminal on mac) and type `npm install -g grunt-cli` or `sudo npm install -g grunt-cli`
* navigate to the website folder in the command line
* run `npm install` or `sudo npm install` and wait for completion

### To work on the webpage ###

* To make working on the webpage easier, grunt will check for updates and automatically reload the local webpage.
* To work on the webpage, run `grunt serve` from the command line in the website folder.
* The page that opens will automatically refresh everytime you update any file for the webpage.
* The files to be worked on are in the folder *src*. All other folders are updated by grunt and npm and are not to be touched.
* To compress the webpage and get it ready for putting online, run `grunt`. This will run the necessary commands to compress the webpage.
* The webpage that is to be uploaded will be in the folder *dest*.
* Copy from *dest* to the website host and everything should work fine.

### To work with git ###

* before working with the website, you should always run `git pull` in the correct folder to grab any changes to the website
* To work with git, it is easiest to download a tool to help. 
    * On mac, GitX works well
    * On linux, git-cola
    * On Windows, [github for windows](https://windows.github.com/)
* after finishing working on files, open your git tool and select, stage, and commit the files that you have changed.
* When that is done, some GUIs allow you to push from them, but if not, switch back to command line and type `git push`
* all your changes will be saved to BitBucket for everyone else to use.

### Who do I talk to? ###

* Christopher Papke through email (kordex0@gmail.com) or facebook messages
