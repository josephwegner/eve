---
title: Welcome To Eve
layout: default
passage: John 3-4
---

Welcome to Eve.  Eve is a new platform built specifically for bible studies.  At least in my experience, I find that my most common way of writing up a bible lesson is to walk through a passage verse-by-verse; explaining, asking questions, and finding references as I go.  Unfortunately, there isn't a good platform out there for properly displaying a written lesson with easy-to-access bible references.  Until Eve, at least.

So here's how it works:

## Main Passage

Over on the right of this page you can see that there is a second block of text containing John 3-4.  This section is called the `main passage`.  This is supposed to contain the main block of text that you will be studying.  It is scrollable, and contains the entire passage so you can always see the context before and after the specific verses you are talking about.  Currently I'm loading in two chapters (John 3-4), but you could load in any selection you'd like.  John 3:14-19, John 3:2-4:15 - whatever you want.  You could even load in separate books, though that's probably a lot for one study.

## Passage Links

Now, having that main passage to the right is pretty useless unless there's a good way to direct your readers to look at the specific sub-passage that you are referencing.  As you go through your study, you will want the user to be scrolling through the main passage so they can see what you are talking about.  To make this easy, there's a feature called `passage links`.  Here's one for [you to try](John 3:16).

## Passage Embeds

Sometimes you may want to show the reader a reference to a passage that is somewhere else in the bible.  Perhaps there's a related verse in an entirely different book, but it would have been confusing to include all of that in the main passage.  To handle this, there's a feature called `passage embeds`.  A passage embed will load in the text from the passage into an inline section.  Here's an example, with 1 Corinthians 13:1-5

`passage=1 Corinthians 13:1-5`

## Markdown Powered

Eve uses a powerful tool called [markdown](http://daringfireball.net/projects/markdown/).  Markdown takes all of the difficult coding out of writing web documents, but still allows you to create great looking content.  There's some [pretty simple syntax](http://daringfireball.net/projects/markdown/syntax) to mark up the most common HTML elements.

### Eve-specific Markdown

In order to achieve the special eve formatting, there's some markdown overrides that we use.  They are as follows

#### Passage Links

Just like a regular link, you still use the standard \[text\]\(link\) format, but for a passage link you change the value in the parantheses to the passage you want to show.  For instance:  
 
 \[a verse\]\(John 3:16\).

#### Passage Embeds

Passage links use a little hack of the markdown code syntax.  Simply enough, you wrap `passage=<passage name>` in tildes.  It should look like this:  

\`passage=1 Corinthians 13:3-15\`