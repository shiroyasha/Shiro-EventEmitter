# Shiro EventEmitter - Observer pattern for Javascript#

This is a simple implementation of the observer pattern for javascript.It is based upon jquery trigger, and backbone event model. It supports creating custom not DOM related events for javascript classes.

It is aimed to be lightweight and independent of big libraries. The only dependicies it requires are 
1. underscore.js
2. [Shiro-Class](https://github.com/shiroyasha/shiro-class)

## Method reference ##

####SomeClass.extend( definition, [classDefinitions])####
Extend is a way to inherit some class with your method definiton passed as an argument to the function. 
The optional parameter classDefinitions adds statis(class) methods on the class itself.
    
#### The ***init*** method ####
The init method in definiton is used to initialize the instance. It ***SHOULD RECIEVE NO ARGUMENTS*** at all,
because the prefered method of passing arugments to to constructor is by sending an object that contains all
the attributes needed for the class that the library automaticly appends. [Why we do this?](#)

### The ***this.__super__*** value ###
The ***this.__super__*** keyword is used to access the parents methods or values, it can come handy when we overwrite some methods in the child class but wan't to access the original value.

####SomeClass.alias( name, listOfAlises )####
    Creates aliases for some class methods, see examples.

## Some Examples ##

Let's create an ***Animal*** class. Each created animal can ***run*** with some ***speed***.
```javascript
var Animal = Object.extend({
    run: function() {
        console.log('running with speed', this.speed, 'km/h' );
    },
    
    speak: function() {
        console.log('i don\'t know how to speak');        
    }
});
```

***Extend*** the ***animal class*** and make a more specific implementation for ***dogs***.
```javascript
// creating a Dog class that extends the class Animal
var Dog = Animal.extend({
    init: function() {
        console.log('creating a new dog named', this.name );
    },
    
    speak: function() {
        console.log('wuf wuf');
    }
});
```

We want to be able to call the ***speak*** action with different names like ***bark*** or ***beFunny***. 
```javascript
// example of aliasing
Dog.alias('speak', ['bark', 'beFunny'] );
```

Create a ***new instance*** of the ***dog*** class and make it do some things.
```javascript
var mike = new Dog({speed: 5, name: 'mike'})

mike.run();   // print out 'running with speed 5 km/h'
mike.speak(); // prints out 'wuf wuf'
mike.bark();  // is the same thing as the above call, prints out 'wuf wuf'
```

##The MIT License (MIT)##

Copyright (c) 2013 Igor Sarcevic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
