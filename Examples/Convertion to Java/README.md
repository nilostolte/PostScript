
# Conversion To Java

The examples here concentrate in **converting Postscript vector graphics into Java**. The general principle here is to define a vector
graphics design in PostScript and to automatically generate the code in Java with the same vector graphics information. This is an original 
approach that is quite powerful because the programming aspects of the design are switched to PostScript, which is a 2D graphics
language much more flexible than Java, and that is able to define practically every aspect of the original design. The only
limitation of the technique are those of PostScript itself, that is, it lacks transparency and only accepts PostScript fonts 
(the defunct _Type 1_ and and _Type 3_ fonts). PDF would have been a much more adequate departing source for such a conversion but it is an extremely complex file format lacking all the programming power of PostScript. 

## ExclamationIcon

In this example, the icon below is 

![ExclamationIcon](https://user-images.githubusercontent.com/80269251/111082975-98bd8f80-84e1-11eb-8236-3de1841dba17.png)

https://github.com/nilostolte/PostScript/tree/main/Examples/Convertion%20to%20Java/ExclamationIcon
