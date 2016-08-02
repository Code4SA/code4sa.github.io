---
layout: post
title: Ward Councillors, a community-driven effort
date: 2016-08-02
excerpt: In the run-up to the election, many people were complaining that they were unable to get information on the parties and councillors standing in their wards. So, a week ago, Adi Eyal, hacked a quick tool to help people do just that and posed a challenge to the wider community, to contribute and improve on this tool. Kgothatso rose to the challenge - this is his story.
image: http://code4sa.org/images/blog/candidates-app.jpg
author: Kgothatso Ngako 
---

<img src="/images/blog/candidates-app.jpg" width="100%">
I’ve had an interest in open source software for a while and have put together a [Twitter list](https://twitter.com/KPANgako/lists/open-source-south-africa/members) of South African and African people and organisations that appeared to be driving open source projects.

The list is both informative and entertaining and supplies me with a constant stream of rich and well-researched articles.
Because Code for South Africa and some of the people who work there were on the list, I got to see some of the projects the organisation had worked on. I really like the idea of information being made available to all citizens it affected, so that they could make informed decisions.
Early on Sunday morning I checked the Twitter list and saw the "Who are you voting for?" web app, along with a challenge to improve it. 

It was quite plain and it didn't resolve queries from outside Cape Town, so I checked out the link to the Github repo for it and decided I wanted to do an Android version of the app. 

I've had a lot more experience with Android dev as that’s what I mostly do in the [cmore](http://cmore.co.za/site/) team at the CSIR, where I work. I also chose Android because it allowed more controlled use of the Google Map or Places APIs from my side. 
Once I got the Android app running, I set out to fix the mapping results for all South African addresses. 

I quickly learned that Code4SA has a lot of powerful and nicely implemented repos. The one that I found really interesting and useful was [Mapit](https://github.com/Code4SA/mapit-za). It returns data regarding a specific ward and I just had to pass an address or latitude and longitude co-ordinates. 
As a test, I passed Mapit my coordinates and used the ward number it returned to validate the data set contained in the [Code for South Africa webapp](http://wardcandidates.code4sa.org/). 

The moment I found the candidates of my ward I knew I could get the app to work. I then restructured the android app to pass the lat/long which Google automatically converted from user provided addresses, and used the Mapit ward number to get candidates. 
I then deployed an edited version of the Code4SA candidates web app on my own server because I was working over the weekend and had to go to my “real” work on Monday, I couldn’t wait for a pull request for my changes to be approved and deployed  by Code4SA. 

Everything worked fine and to give users extra insights into the candidates I added the ability to search for information about them on Google, Twitter and Facebook.
All I had to do then was to submit the pull request with my most recent changes and the strength of open source development would have completed its metamorphic cycle - until someone else introduces the next changes to improve the idea.

I believe the Code4SA repos will be extended and drive a lot of interesting projects as soon as more people get enlightened to the treasure that is there. 

I know myself and friends I work with on the side at [E-REGARDLESS](http://eregardless.co.za/)  will be pitching projects in the future. 

_Kgothatso Ngako is a 23 year old developer who works at the CSIR, while also studying towards his BSc (Hons) in Computer Science at the University of Pretoria. Follow him on [Twitter on @KPANgako](https://twitter.com/KPANgako)_
