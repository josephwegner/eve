---
title: Welcome To Eve
layout: default
passage: John 3-4
---

I had jury duty the other day.  What that translates to is I had a whole day of [forced free time](https://twitter.com/Joe_Wegner/status/288812290910859265).  I had decided it would be a good idea to treat this time as a hackathon, and was inspired by a [Google+ demo](http://odem.chromeexperiments.com/8mEis2) that allowed you to browse using gestures from your mobile phone.  The actual Google+ demo was pretty unexciting - it was very choppy, and not really an increase in usability at all.  But, cool nonetheless.

[In all reality](John 4:43), using your mobile device as a controller for your desktop computer doesn't really have a place on the normal web - adding a new layer of abstraction isn't ever going to make things easier.  However, it does have an application in one place - gaming.  It's never been a secret that people prefer to control games with a controller rather than a mouse and keyboard.

`passage=1 Timothy 1:10-3:5`

So that's what I set out to do.  The end goal here is to create a library that people can use in the future, but for my forced hackathon I just wanted to create a proof of concept.  I didn't want to deal too heavily with designing a UI, so I chose the simplest game that might use a mobile controller - the keep-the-ball-on-the-tilty-thing game.

Check out [the demo](http://mobile-interactive.herokuapp.com/) - it'll make the rest of this post make sense.  **Make sure you're phone is on wifi.  There's a lot of websockets magic, which will likely suck up your available data.**  This will also probably only work on chrome, both on the desktop and on your mobile.  You can try other browsers, but I don't promise any success.