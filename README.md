# MultiScroll jQuery Plugin

Scroll a div by dragging, clicking, hovering, or mousewheel.


## Demo

- Visit http://bronson.github.com/multiscroll
- Or, if you've cloned locally, just `open doc/index.html`


## Installation

Add multiscroll.js to your page, maybe something like this:

    <script type="text/javascript" src="/js/jquery.mousewheel.js"/></script>
    <script type="text/javascript" src="/js/multiscroll.js"/></script>


### How to add to a Rails asset pipeline:

- Ignore the above instructions.  In your Gemfile:

```ruby
gem 'multiscroll', :git => 'git://github.com/bronson/multiscroll.git'
```

- And in app/assets/javascripts/application.js:

```javascript
//= require jquery.mousewheel
//= require multiscroll
```

- Now run `bundle install`.  You're now locked to that version of Multiscroll.
  If you want to update to a newer version, run `bundle update`.


## Acknowledgements

- http://rascarlito.free.fr/hoverscroll/
- http://www.smoothdivscroll.com/index.html

License: Pain-Free MIT (same as jQuery)
