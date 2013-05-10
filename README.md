## Shiro EventEmitter - Observer pattern for Javascript##

This is a simple implementation of the observer pattern for javascript. It is based upon jquery trigger, and backbone event model. It supports creating custom not DOM related events for javascript objects.

It is aimed to be lightweight and independent of big libraries. The only dependicies it requires are 

1. [underscore.js](http://underscorejs.org/)
2. [Shiro-Class](https://github.com/shiroyasha/shiro-class)

## Method reference ##

### Extend and initialize ###
The easiest way to use the to use the EventEmitter is to extend it and in the initilizing process call the super's init method to setup the emitter correctly. See the examples to understand better.

### setMaximumListeners( num ) ###
Sets the maximum number of listeners for a particular event on the object. This is set as a security mechanism to stop accidental memory leaks.
    
### getMaximumListeners( num ) ###
Gets the current maximum number of listeners for an event.

### on(name, listener, [context] ) ###
Sets up a listener to event with the given name. The listeners are propogated in the order they are appended. The optonal argument context helps to keep the pointer for ***this*** in object oriented code.

Aliases: ***addListener***, ***addEventListener***

### once(name, listener, [context] ) ###
Sets up a listener which is automatically removed after first usage. The arguments behave like on the ***on*** method.

### once(name, listener, [context] ) ###
Sets up a listener which is automatically removed after first usage. The arguments behave like on the ***on*** method.

### remove(name, listener) ###
Removes a listener that listens to an event with a given name.

Aliases: ***off***, ***removeListener***, ***removeEventListener***

### removeAll(name, listener) ###
Removes all listeners that listens to an event with a given name.

Aliases: ***offAll***, ***removeAllListeners***, ***removeAllEventListeners***

### emit(name, arguments...) ###
Emits an event on the object with the given name. The listeners are them invoked in the order they were added. The optional arguments are sent to the listeners.

Aliases: ***fire***, ***signal***

## Some Examples ##

Let's create a ***Dog*** class. Every dog can have several friends that would like to be informed when something happens with their friend. Because of that we extend the EventEmitter class so that the signaling procces will be as easy as possible.

```javascript
var Dog = Shiro.EventEmitter.extend({
    init: function() {
        this.__super__.init(); // we must call the parent init to initialize the event emitter
        this.setMaximumListeners(100); // every dog should have lots of friends
    },
    
    kill: function() {
        console.log('oooh no, I am dying, better inform all my friends');
        
        this.emit('died');
    }
});
```

Now we want to create a new pal for our friends, let's name him Mike.
```javascript
var mike = new Dog({ name: 'mike' });
```

Now let's add some frined( functions that listens to events )
```javascript
mike.on('died', function() { console.log('i will miss you :\'-((( ' + this.name ); }, dog );
mike.on('died', function() { console.log('RIP my friend'); });
```

Now let's kill the dog ( muhahaha :D ) and let their friend hate us:
```javascript
mike.kill();
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
