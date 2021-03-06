# Conversion To _Java_

## ExclamationIcon

In this [example](https://github.com/nilostolte/PostScript/tree/main/Examples/Convertion%20to%20Java/ExclamationIcon), the icon displayed in _Figure 1_ is constructed in PostScript and converted to _Java_. When in display mode the resulting
graphics is proof the that the design is correct. Thus, the phase to convert to _Java_ can start from that point. A detailed decription showing how to do the convertion and the code in PostScript is available [here](https://github.com/nilostolte/PostScript/tree/main/Examples/Convertion%20to%20Java/ExclamationIcon).

![ExclamationIcon](https://user-images.githubusercontent.com/80269251/111082975-98bd8f80-84e1-11eb-8236-3de1841dba17.png)
<br>_Figure 1: ExclamationIcon_

## Overview
The examples here concentrate in **converting Postscript vector graphics into _Java_**. The general principle here is to define a vector
graphics design in _PostScript_ and to automatically generate the code in _Java_ with the same vector graphics information. This is an original 
approach that is quite powerful because the programming aspects of the design are switched to _PostScript_, which is a 2D graphics
language much more flexible than _Java_, and that is able to define practically every aspect of the original design. The only
limitation of the technique are those of _PostScript_ itself, that is, it lacks transparency and only accepts _PostScript_ fonts 
(the defunct _Type 1_ and and _Type 3_ fonts). PDF would have been a much more adequate departure point for such a conversion 
but it is an extremely complex file format, lacking all the programming power of _PostScript_. Here, two extremely powerful characteristics 
of _PostScript_ are exploited:

1. Vector graphics capabilities
2. Natural rapid prototyping capabilities

The second characteristic is a much less known aspect of _PostScript_ language. It allows to easily redefine commands and functions
on the fly, which is a feature that helps avoiding to write a whole compiler and obtain practically the same result, particularly
when decoding or translating from one format to another as in the case here.

The use of other types of fonts, particularly TrueType fonts, is a limitation that has been circunvented in another way. It can be 
dealt using fonts which are available on the sytem via _Java_ fonts. But this solution is a little cumbersome and it is tied to the
system where _Java_ is running. In addition, in this solution, the whole font has to be processed entirely before it can be used. 
Actually, a more practical solution is to read the font offline and transform it into a _Java_ class, a process that is similar
to what is accomplished here with _PostScript_. This is an entirely different project that will appear here in GuitHub soon.

Transparency exists in _Java_, so this problem can easily be solved in _Java_ itself, once the shape is converted to _Java_. But in doing 
that one loses the advantage of defining everything in _PostScript_ (which is a kind of a matrix, a substrate, a departing ground from where 
the final code is obtained) and deriving the _Java_ code automatically. Thus, the solution may be to use a pseudo language in _PostScript_
to express the trasnsparency that may be visible in _Java_ only, or displayed using GhostScript transparency capabilities.

Anyhow, the choice of using Ghostscript for the generation of code was adopted for its additional features like, for example, 
transmitting information from the command line to the _PostScript_ program. This has been done with the use of shortcuts in
Windows, which allows converting the file simply double clicking the shortcut. This is explained next.

## Using Windows Shortcuts to call GhostScript

For practical reasons, the _PostScript_ files are defined with a _".gs"_ extention which in turn is associated with the Ghostcript 
application. In this way, the _".ps"_ can be processed by other applications.

However, the use of shortcuts improves a lot the interactivity with GhostScript in Windows. When applicable, a pertinent shortcut 
(a file with a _".lnk"_ extention) will be present in this repository even though it is very probable its not going to work in your
system. This indicates that one should generate the shortcut in the following way. Let's take the **ExclamationIcon** example to 
illustrate that.

To create the shortcut one clicks the file _"ExclamationIcon.gs"_ with the **mouse right button**, and chose the option 
_"Create shortcut"_. Once the shortcut is created, one clicks it with the mouse right button, and choose the option _"Properties"_.
In this example the shortcut itself was renamed to _"PS2JavaExclamationIcon"_ and this is what should be done:

![shortcut](https://user-images.githubusercontent.com/80269251/111086187-34a2c780-84f1-11eb-8a7a-4d2279e7ebb8.png)

In **Target**, it should be typed the following information (**with the quotes**):

**"C:\Program Files\gs\gs9.52\bin\gswin64.exe" -dNOSAFER -c false -Y  "C:\Users\Java\ExclamationIcon\ExclamationIcon.gs"**

_**Caution:**_ <br>
1. _You will probably install another version of Ghostscript. Please substitute **"C:\Program Files\gs\gs9.52\bin\gswin64.exe"**
by the correct path of your Ghostview applicaton._
2. _**-dNOSAFER** is a flag that allows writting files in Ghostscript._
3. _**-c false** pushes the boolean value **"false"** on the top of the stack._
4. _**-Y** is a flag to indicate the end of all flags. It causes a warning in Ghostscript messaging window, just ignore it._

In **Start in**, it should be typed this or the corresponding path of _Ghostscript_ in your system (**with the quotes**):

**"C:\Program Files\gs\gs9.52\bin"**

For simplicity, the chosen storage directory is **"C:\Users\Java\ExclamationIcon"** because only complete paths work
in shortcuts and inside the _PostScript_ code. This allows to have shorter paths and makes it easier to make the example work 
in any Windows machine.

