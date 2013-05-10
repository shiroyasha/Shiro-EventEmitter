(function() {

    var EventEmitter = Object.extend({
        init: function() {
            this._events = {};
            this._maxListeners = 10;
        },

        /*
         *  Set maximum number of listeners
         */
        setMaximumListeners: function(num) {
            this._maxListeners = num;
        },

        getMaximumListeners: function() {
            return this._maxListeners;
        },

        /*
         *  Adding events
         */
        once: function(name, listener, context) {
            if( !this._events[name] ) this._events[name] = [];
            if( this._events[name].length >= this._maxListeners ) return;
            this._events[name].push( { listener: listener, context: context, once: true });
        },
        on: function(name, listener, context) {
            if( !this._events[name] ) this._events[name] = [];
            if( this._events[name].length >= this._maxListeners ) return;
            this._events[name].push( { listener: listener, context: context, once: false });
        },

        /* 
         *  Removing an event listener
         */
        remove: function( name, listener ) {
            if( !this._events[name] ) return;

            for( var i = 0; i < this._events[name].length; i++) {
                if( this._events[name][i].listener === listener ) {
                    this._events[name].splice( i, 1 );
                    break;
                }
            }
        },
        /*
         *  Removing all event listeners
         */
        removeAll: function( name ) {
            this._events[name] = null;
        },

        /* 
         *  Emitting events
         */
        emit: function() {
            var name = [].shift.apply( arguments );

            if( !this._events[name] ) return;

            for( var i = 0; i < this._events[name].length; i++ ) {
                this._events[name][i].listener.apply( this._events[name][i].context || window, arguments );
                if( this._events[name][i].once ) {
                    this._events[name].splice(i, 1);
                }
            }
        }

    // set up alliases for some methods
    });

    EventEmitter.alias('on', ['addListener', 'addEventListener'] )
                .alias('remove', ['off', 'removeListener', 'removeEventListener'])
                .alias('removeAll', ['offAll', 'removeAllListeners', 'removeAllEventListeners'])
                .alias('emit', ['fire', 'signal']);


    // set up event emitter class
    window.Shiro = window.Shiro || {};
    window.Shiro.EventEmitter = EventEmitter;
}());