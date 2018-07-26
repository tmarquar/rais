# RAIS

This app is designed for risk assessors in the the field.
It is built using the Ionic Framework.
To work on code follow this installation:
https://ionicframework.com/docs/intro/installation/

To work on this application one also needs papaparse:
https://www.papaparse.com/

To get this you can type in the command line:
npm install papaparse --save
npm install @types/papaparse --save

The foundation of reading the csv data was coded based of the following tutorial:
https://devdactic.com/csv-data-ionic/

The data is free and can be found at:
https://www.epa.gov/risk/regional-screening-levels-rsls-generic-tables

The bulk of the work lies in the fourth tab, currently named Chemical Select

# Testing

https://ionicframework.com/docs/v1/guide/testing.html

To begin testing for android I followed many tutorials, and went down many rabbit holes.
I believe many steps were unneccesary. 
First, after having Ionic all set up, get android studio:
https://developer.android.com/studio/install

From here I followed this video to set up the virtual phone.
https://www.youtube.com/watch?v=ZWrKakQOCYE
It was a little overdone and I think leaves out some details.
On android studio I went to Tools>SDK Manager
Under SDK Platforms I got Marshmallow and Lollipop.
Under tools, I got everything. 
The video opens a new blank app in Studio.
Instead, in the Ionic project you should:
npm install -g cordova (there may be some other dependencies to get from npm)
*note, I think that I may have downloaded cordova earlier in this process using npm*
ionic cordova platform add android
ionic cordova build android

Then open myAPP/platforms/android as a project.
Follow how the video sets up a virtual phone, but I believe that you should
change "Emulated Performance" from Automatic to software
https://stackoverflow.com/questions/47384916/android-studio-emulator-process-finished-with-exit-code-139-interrupted-by-sig
This solved a seg fault that I was getting when I tried 
ionic cordova emulate android
I never got the above command to load the app.
# Instead I ran the project from android studio.

To make changes, change then from the main project source, and when you want to test 
the app in emulator, use:
ionic cordova prepare android

If you decide to try and get the cordova emulator to work, other issues I have to resolve
the java jdk I was using was too new. I had jdk 10. (check with $java -version)
I had to unistall that (I tried using rpm and yum. I think yum was the one that worked.)
https://unix.stackexchange.com/questions/110512/uninstall-jdk-rpm-to-reinstall
https://java.com/en/download/help/linux_uninstall.xml#jre

I then used yum to get jdk 1.8.0_171

I also had issues with gradle not existing, so I downloaded that from the binary and put in suggested location:
https://gradle.org/install/

finally, I had to set the paths:
export ANDROID_HOME=/home/6tm/Android/Sdk/
export PATH=${PATH}:/home/6tm/Android/Sdk/platform-tools:/home/6tm/Android/Sdk/tools
export JAVA_HOME=/usr/java/jdk1.8.0_181-amd64
export PATH=$PATH:/opt/gradle/gradle-4.9/bin

there should be a way of putting these in ~/.bash_profile
but that never worked for me. 

Using the android studio method, I discovered that we were using the wrong http get, so I 
am working to fix that:
https://ionicframework.com/docs/native/http/
I don't think the above will work in browser, but might in emulator.

# Dependencies
Still under construction :)

Homebrew:
``$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Node.js:
```$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
   $ sudo apt-get install -y nodejs
```
         
Ionic and Cordova: 
```$ npm install -g cordova ionic
```

SQLite: 
```$ ionic cordova plugin add cordova-sqlite-storage
   $ npm install --save @ionic-native/sqlite
```
Papaparse:
```$ npm install papaparse
```

File: 
```$ ionic cordova plugin add cordova-plugin-file
   $ npm install --save @ionic-native/file
```

Http: 
```$ ionic cordova plugin add cordova-plugin-advanced-http
   $ npm install --save @ionic-native/http
```