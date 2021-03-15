
# ExclamationIcon

![ExclamationIcon](https://user-images.githubusercontent.com/80269251/111219512-83fafd80-85ae-11eb-9834-d4a4e6049c99.png)


## File ExclamationIcon.gs

This file contains the definition of the icon in _PostScript_ and in _Java_. The goal when using this technique is to define the
vector graphics in such a way that it matches definitions in both languages, that is, the same definitions are shared for the
two languages. It is a kind of a metalanguage where the objects are defined and that can be easily displayed (in _PostScript_) or
transformed in _Java_ using _Java_ **cartouches**. This example is excelent to use as a prototype and to substitute the
graphics definitions by other graphics, and use as it a tool. It is a structured way to organize the definitions in a very
high level manner.

### Licence

This file has a **very permissive licence but with some restrictions** as follows. It is provided as is and can be copied, modified, or distributed with some restrictions. **Code snippets extracted from this file are authorized and are totally free EXCEPT for the code identified by the mentions "CODE RESERVED - CANNOT BE COPIED" and "END OF RESERVED CODE"**. This code cannot be used outside the context of this file and is copyrighted by Nilo Stolte. When the entire file is used as is, or if several snippets of it are used to assemble another file with the same purpose as this one, all modifications must be commented with the proper credit under the "Modified by" section below the licence comment **EXCEPT** when the modification is just a different vector art (in this case the current vector design of the warning sign with exclamation point can be substituted by another design with the purpose to convert that design into _Java_). Following the credit, a brief description of the modification must be stated to differentiate from original code. Package information, comments, changing variables names and other changes that do not modify or do not add any functionality are not considered modifications and don't need to be commented. Authorized snippets can be used without the licence comment, no credits are needed, provided that once assembled in a file they do not perform the same functionality.

### The Dual Purpose And How To Switch From One To Another

After the licence comment, the first two actual lines of the code set the variable **/ps** to true and **/sca** to 12. But then we find
the following lines:

```
count 1 eq {
	dup type /booleantype eq { /ps exch def }
	{
	   dup type /integertype eq { /sca exch def } if
	} ifelse
} if
```

If the program is launched by clicking on the shortcut as stated in:

https://github.com/nilostolte/PostScript/blob/main/Examples/Convertion%20to%20Java/README.md#using-windows-shortcuts-to-call-ghostscript

And if the shortcut has a **-c false** as its first flag after **"-dNOSAFER"**, then the boolean **false** will be pushed to the 
stack before the control is passed to the _PostScript_ program. Then the command **"count"** will return 1 and 
the variable **"/ps"** will be initiallied with whatever was pushed on the stack. In this case it is with the boolean **false**. This 
will indicate the program that what we want is to convert the design to _Java_. If the file is opened in another way (by double clicking the
_PostScript_ file or opening it with a different application, for example), the design is displayed by _GhostScript_ or by another application 
with which the _PostScript_ file was opened. Therefore it is this varibale that controls how the program is going to behave. The change can be 
done by hand in other systems different then Windows. However, the shorcut method is far more faster when doing adjustments in the _Java_ version. 
Notice that most of the _Java_ code is automatically generated, but never completely. 

### Structuring The File

It was found that the conversions here mentioned were much easier to be accomplished after structuring the file, but at the start it might look 
it is a bit harder to code since it requires some discipline. Afterwards, though, the same structure is used again and again, thus simplifying the
development of other conversions.

The file is structured thanks to two functions: **/psdefinition"** and **/javadefinitions**. In both functions it is the 
function **/draw** that is called, and that uses other functions, to build the design. This function is the one that contains the
command **showpage** that actually shows the page in _PostScript_ mode. In _Java_ it ressembles the function _main_, the entrypoint
of the program. Some of these other functions are developed by the user because they have to do with the design. Other functions 
are **"libraries"** that these functions, or declaration statements outside of them, can use to build the design. In 
**"/psdefinitions"** all the commands for displaying the file in _PostScript_ are defined, whereas in **/javadefinitions** 
the commands to generate the _Java_ class with the design are defined.

Finally, the line:

**ps //psdefinitions //javadefinitions ifelse**

Then chooses which definitions are to be used. If the value of **/ps** was initialized with **false**, as decribed above, it is
the **/javadefinitions** that is executed, otherwise it **"/psdefinitions"**. Notice that one can apply this same trick for
other uses. For example, when the value passed in the stack is **true** this might indicate to use _GhostScript_ transparency,
since we know that a true is when we want to visulize the design, and we know that it was called by _GhostScript_ through the
_shortcut_.  We can also use initial stack values as parameters to the program the same way the flags are used for calling programs 
in command prompts. Above, for example, when an integer is passed instead of a boolean it is interpreted that the scale is changed to 
the value passed. This was used to generate an image of greater size instead of displaying the _PostScript_. This was also done 
with the help of shortcuts. In this way, each different shortcut is used to produce a different output.

What follows next are basically declarations that are done this way to structure the information in a way that can be easily
converted to _Java_ without the need of explicitly programming in _Java_.

In this example, an _"external library"_ is presented to illustrate how one can program a function in _PostScript_ that actually can be 
used to define shapes in _Java_ automatically. This library is composed by two functions that aproximate a circle using
four cubic bezier curves (constant **k0** is part of the library and it is a kind of scale factor for the bezier control points). They
receive as parameters: the coordinates of the left upper corner of the square containing the circle and the diameter of the circle. 
One function defines circles in a clockwise manner, another in anticlockwise manner. Their use here is to These functions can be called 
for shape definitions and are conversible to _Java_ provided the metalanguage commands are used instead of _PostScript_ commands. The 
functions, however, must be  declared with an explicit **def** command. This means that the function itself is to be used in _PostScript_ 
but it will generate _Postscript_ or _Java_ definitions according to the context. In other words, once **/psdefinitions** or 
**/javadefinitions** is executed, everything that follows is valid for both languages **EXCEPT** explicit _PostScript_ commands which 
are interpreted by the _PostScript_ interpreter on the fly.

After this, what follows are _shape_ definitions, which are obviously defined by paths. Paths are the common ground between
_PostScript_ vector paths and _Java_ vector paths. This is summarized in:

https://github.com/nilostolte/ClockWidget#paths and https://github.com/nilostolte/ClockWidget#path-commands

The first _shape_ to be defined is **white_circle**, which is the background white circle over which the icon is drawn. Notice
the metalanguage **d** command used instead of **def**. Following it, we can find **color_ring** and **exclam**, which
respectively define the outside icon ring and the exclamation point in the middle of the icon. Due to the simplicity of the
design only these three shapes are defined. That's the reason this icon was chosen as an example, since most of the file is
actually setting the programming environment.

After the shape definitions, we can find gradient definitions. Here a radial gradient is used for **color_ring**. The effect is subtle 
and cannot be seen visualizing the supplied image files here in GitHub. The gradient is more noticiable when the supplied _ExclamationIcon.jar_
is executed or if _ExclamationIcon.pdf_ or _ExclamationIcon.png_ is dowloaded and visualized. This gradient gives the impression
that the disc with the warning sign is in relief against the color background. The intesting aspect of gradients here is that  
colors can be defined with integer values, but then it is interpreted that the color values vary from 0 to 255. If the colors are given by 
floating point values, the values are assumed to vary between 0.0 to 1.0. This means that colors are interpreted in the way they are 
interpreted in _Java_. However, mixing values types in the same color may lead to impredictable results.

For simplicity it is assumed that all gradients are stored as arrays. This is done to facilitate menus items processing.

Radial gradients are simply delared with an array with the initial color, the end color and an array two set of three coordinates:
the initial origin and radius followed the end origin and radius. This is what is shown in the code.

The last item in the file is a call to **draw** function.


 


