
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

```postscript
count 1 eq {
	dup type /booleantype eq { /ps exch def }
	{
	   dup type /integertype eq { /sca exch def } if
	} ifelse
} if
```

If the program is launched by clicking on the shortcut as stated [here](https://github.com/nilostolte/PostScript/blob/main/Examples/Convertion%20to%20Java/README.md#using-windows-shortcuts-to-call-ghostscript)

And if the shortcut has a **-c false** as its first flag after **"-dNOSAFER"**, then the boolean **false** will be pushed to the 
stack before the control is passed to the _PostScript_ program. Then the command **"count"** will return 1 and 
the variable **"/ps"** will be initiallied with whatever was pushed on the stack. In this case it is with the boolean **false**. This 
will indicate the program that what we want is to convert the design to _Java_. If the file is opened in another way (by double clicking the
_PostScript_ file or opening it with a different application, for example), the design is displayed by _GhostScript_ or by another application 
with which the _PostScript_ file was opened. Therefore it is this varibale that controls how the program is going to behave. The change can be 
done by hand in other systems different then Windows. However, the shortcut method is far more faster when doing adjustments in the _Java_ version. 
Notice that most of the _Java_ code is automatically generated, but never completely. 

### Structuring The File

It was found that the conversions here mentioned were much easier to be accomplished after structuring the file, but at the start it might look  
a bit harder to code since it requires some discipline. Afterwards, though, the same structure is used again and again, thus simplifying the
development of other conversions.

The file is structured thanks to two functions: **/psdefinitions** and **/javadefinitions**. In both functions it is the 
function **/draw** that is called, and that uses other functions, to build the design. This function is the one that contains the
command **showpage** that actually shows the page in _PostScript_ mode. Using an analogy with _Java_, it ressembles the _main_ function, the entrypoint
of the program. In the _Java_ converted class, **/draw** corresponds to the function **paintComponent**, since the class is inherited from **JPanel**.
Some of the other functions used in **/draw** are developed by the user because they have to do with the design. Other functions 
are **"libraries"** that these functions, or declaration statements outside of them, can use to build the design. In 
**/psdefinitions** all the commands for displaying the file in _PostScript_ are defined, whereas in **/javadefinitions** 
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
One function defines circles in a clockwise manner, another in anticlockwise manner. These functions can be called 
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
that the disc with the warning sign is in relief against the color background. The intesting aspect of gradients here is that colors can be 
defined with integer values, but then it is interpreted that the color values vary from 0 to 255. If the colors are given by 
floating point values, the values are assumed to vary between 0.0 to 1.0. This means that colors are interpreted in the way they are 
interpreted in _Java_. However, mixing values types in the same color may lead to impredictable results.

For simplicity it is assumed that all gradients are stored as arrays. This is done to facilitate menus items processing.

Radial gradients are simply delared with an array with the initial color, the end color and an array with two sets of three coordinates:
the initial origin and radius followed the end origin and radius. This is what is shown in the code.

The last item in the file is a call to **draw** function as it was explained previously.

### Metalanguage

The metalanguage is the collection of commands that are only valid in the context of this file and that can either be interpreted in terms
of _PostScript_ commands, in order to be displayed, or in _Java_ commands, for a conversion to _Java_. In other words, their definitions
are accomplished in the function **/psdefinitions**, when they will function as PostScript commands, or in **/javadefinitions**, when they will
generate the _Java_ class. Thus, the metalanguage commands are the ones that are defined in **/psdefinitions** and in **/javadefinitions**

In the case of **/psdefinitions** (_PostScript_) we can see these commands in our example:
```postscript
	/m { moveto } bind def
	/l { lineto } bind def
	/c { curveto } bind def
	/h { closepath } bind def
	/f { fill } bind def
	/np {newpath} def
	/rg { setrgbcolor } bind def

	/d { def } def
	/g { def } def
```
The commands **m**, **l**, **c**, **h**, etc. are commands of the metalanguage in PostScript. We can see that all these commands, are simply redefining prexisting _PostScript_ commands. The command **rad** (to create radial gradients) is actually a function that translates the internal
radial gradient definition (which is used for _Postscript_ and for _Java_) to a radial gradient in PostScript. The commands **f**, **np** and **rg** are
not part of the metalanguage, since they only exist inside **/psdefinitions**.

On the other hand in **/javadefinitions** the same commands are defined in order to transform them into a _Java_ class:

```postscript
	/outfile1 (C:\\Users\\Java\\ExclamationIcon\\src\\com\\ExclamationIcon.java) (w) file def
	/st 50 string	def				% string used to convert numbers 
	/ws { outfile1 exch writestring } def		% function to write strings
	/out { outfile1 exch st cvs writestring }def	% function to write numbers
	
	/mo { (      p.moveTo\() ws exch out (f,) ws out (f\);\n) ws } def
	/li { (      p.lineTo\() ws exch out (f,) ws out (f\);\n) ws } def
	/cv { (      p.curveTo\() ws
		6 -1 roll out (f,) ws 
		5 -1 roll out (f,) ws 
		4 -1 roll out (f,) ws 
		3 -1 roll out (f,) ws 
		exch out (f,) ws out (f\);\n) ws 
	} def
	
	/cp { (      p.closePath\(\);\n) ws } def
	
	/m { mo } bind def
	/l { li } bind def
	/c { cv } bind def
	/h { cp } bind def
		
	/d { % defines a path as a java function returning a path
		 (   static private Path2D.Float ) ws exch ws 
		 (\(\) {\n      Path2D.Float p = new Path2D.Float\(\);\n) ws
		 exec % interprets path commands to output path commands in java
		 (      return p;\n   }\n) ws
	} def
	
	/g {
		(   static private Paint ) ws 
		exch ws ([] = {\n) ws
		{
			aload pop (      ) ws ws
		} forall
		(   };\n) ws
	} def 
```

Here we can see that the basic functions **mo**, **li**, **cv**, and **cp**, actually only write **moveTo**, **lineTo**, **curveTo** and
**closePath** for a given path **p** into the file **/outfile1**, by using the functions **/ws** and **/out**, respectively to write
strings and numbers. These functions are directed mapped to the metalanguage commands **m**, **l**, **c**, and **h**, and they correspond 
to the same commands used in _PostScript_. The file **/outfile1** is opened for writting and it corresponds to the file _ExclamationIcon.java_,
the converted _Java_ code that can be compiled and executed.

Now the metalanguage command **d** corresponds to a function that actually writes a _Java_ function that returns the path **p** created by the
basic functions above. The command **g** creates a  _Java_ array of gradients.

As we can see, these are just libraries that are used to define the different aspects of the design.


### Programming the Design

Once the structure of the files is explained, now it still remains to be seen how is the design programmed. As we have seen, some parts of it 
were clearly defined with shapes and gradients declarations. It was also seen how external libraries (libraries defined to be called in PostScript
that explicitly generates either _PostScript_ or _Java_ commands) can be used to define shapes. Now it is time to see how to manage specific 
functions that work exclusively in _PostScript_ or _Java_. Some of them are internal libraries as the metalanguage commands explained above.

The heart of the programming of the design is the function **/draw** as explained earlier. 

In _PostScript_ this function is defined as:

```postscript
	/draw {
		(white_circle) userdict exch get exec 1 setgray f
		0 (ring_shade) (color_ring) drawfillshade
		(exclam) userdict exch get exec 0.8627 0.0784 0.2353 rg f
		showpage
	} def
```

The first line only draws **white_circle** and fills (**f**) it with white color (1 setgray. The code `userdict exch get exec` is just
a boilerplate code to draw a shape giving the name under which it was defined.

The second line is a bit more complex. It passes the index of the gradient, the gradient and the shape to the function **drawfillshade**
that is a library function that actually fills the shape with the gradient.

The third line just draws **exclam** (the exclamation point) and fills it with the RGB color with components 0.8627, 0.0784, and  0.2353.

Finally the fourth line is the _PostScript_ command **showpage**, which is required in _Ghostscript_.

For _Java_ class generation, the draw function is more verbose, but it just writes the function **paintComponent** as commented earlier:

```postscript
	/draw {
		(   ) ws draw_type ws ( void paintComponent(Graphics g1) {\n) ws
		(      Graphics2D g = (Graphics2D) g1;\n) ws
		(      g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);) ws
		(      AffineTransform matrix;\n) ws
		(      matrix = g.getTransform();\n) ws
		(      g.scale(sca, sca);\n) ws
		(      ) (white_circle_path) (Color.white) drawpath
		(      ) (0) (ring_shade) (color_ring_path) drawfillshade
		(      ) (exclam_path) (exclam_color) drawpath
		(      g.setTransform(matrix);\n) ws
		(   }\n) ws
		(}\n) ws
		outfile1 closefile
	} def
```
Most of it is just boilerplate code like function prototype, setting **Graphics2D** variable **g**, setting antialiasing, defining a 
transformation matrix (that is not even used in this example), and applying the scale. The only three important lines are just equivalent to the
ones found in _PostScript_ with just some formatting for a better appearence in file **/outfile1**. The last command of the program is
**outfile1 closefile**, which closes **/outfile1**. This command is exactly equivalente to last command **showpage** in _PostScript_ since 
one is required to close the file in order to the contents to be actually saved in the file, in the same way that **showpage** is required
by _Ghostview_ to dispay the design.

### Initializations

As mentioned earlier, **draw** is the last function to be executed. Following its definition a series of initializations appear either in
**/psdefinitions** or in **/javadefinitions**.

In the case of **/psdefinitions**, it is only about setting the page size, which is automatically done using the scale (**sca**) and the
size of the drawing bounding box, and reversing the image on the _y_ direction (because in _PostScript_, the origin is in the page 
lower left corner, whereas the design is supposed to be defined as if the origin would be in the upper left corner). Since in the case 
of this example the _"drawing"_ is a circular shape, the values of the bounding box are the same for _x_ and _y_. In this example, both 
values are 32, and they appear _hardcoded_ in the file, either in the definition of the variable **yoff** in the beginning of the file 
(at line 22) or at the end of **/psdefinitions**, when defining the page size. **These values must be altered to match the bounding box 
of a new design**.

In the case of **/javadefinitions**, all the _Java_ declarations, starting with **package** and **imports**, followed by class
declaration, and variable declarations, are all written to _ExclamationIcon.java_ prior to everything else. **These items should be
changed according to the design being converted**. The variables and their initializations should be quite obvious on simple
inspection. They are just boilerplate code to map the generated definitions to their actual use in **paintComponent**, and they are 
simply providing storage for these definitions.

## File ExclamationIcon.jar

This is the _Java_ executable produced by the project in _Java_. When downloaded the code the whole hierarchy of files and directories will
be supplied to correctly compile the code and execute it. This executable is only provided for testing and for confort.

## ExclamationIcon _Java_ Project

The _Java_ project to display the _ExclamationIcon_ on the screen is the absolute goal of the conversion of the design to _Java_. However,
to do that the _ExclamationIcon.java_ must be compiled with the Java environment and other libraries to deal with the window. This is done by 
the file _Window.java_.

### Project Hierarchy

The project is structured in Eclipse fashion, that is, with _src_ and _bin_ directories. Here, the _bin_ directory is ommited because one cannot
compile (yet) a project on GitHub. However, when the code is downloaded, it comes with the hierarchy at least with source files. The intention
in this project is to keep it as simple as possible. In _Java_ it is necessary to explicitly write the directory where the source or compiled 
code is located in the hierarchy form the _root_ of the project, which is normally the _src_ or _bin_ directory. This is done through the 
declaration **package** in the source file. Following the **package** command, one should put all the directories separated by period (".") 
from the _root_ until the directory where the source file is located. Thus, since _ExclamationIcon.java_ declares **package com;**, it must be
sotred at the directory _com_ where just below _src_ directory. Source files in the same _package_ (in the same directory) don't need to be
_"imported"_ to be able to share their definitions. Therefore, the file _Window.java_ is also the directory com. In more complex projects this
is not always desirable because we normally group in the same directoriy only parts of the software that share common functionalities.

### Creating and Running the Project

For this project to integrate with the Postscript code conversion, and if creating a project with Eclipse, when opening Eclipse,
it will be asked which _Workspace_ one is wanting to use. As exlained in this same window, a workspace is the directory where one
want to store the project. One should type _C:\Users\Java\_ and click _Launch_.

Probably the simplest way to create a project is to use Eclipse. This is done by clicking on _File > New > Java Project_. In the new window
one can copy and paste _ExclamationIcon_ in the _Project Name_. Once this is done, one click on _Next_ and we uncheck the box
_Create module-info.java file_. This is actually not needed. Then one should click on _Finish_. Right after, right clicking on _src_ in the 
newly created project a menu appears and one should choose _New > Package_ and a new window appears where one should type _com_ in the
box _Name:_. Right after that, one should right click on newly the created package _com_ and a new window appears where one should type
(or copy and paste) _ExclamationIcon_ in the box _Name:_. This creates the file _ExclamationIcon.java_. By clicking twice in the file the 
file opens for editing. Simply erase everything and paste the content of the file _ExclamationIcon.java_ supplied here. Repeat the operation for
_Window.java_ and your project is ready. Just compile and run it (click green button with a white _play_ icon right above the project) and
here we go your project show run perfectly.

This is not the smartest way to construct a project, but it is by far the simplest.

### Files ExclamationIcon.gs and PS2JavaExclamationIcon.lnk

Once the project is created one should copy the file _ExclamationIcon.gs_ to the directory _C:\Users\Java\ExclamationIcon_. Now, one should
create a shortcut to **ExclamationIcon.gs** as described in:

https://github.com/nilostolte/PostScript/blob/main/Examples/Convertion%20to%20Java/README.md#using-windows-shortcuts-to-call-ghostscript

Here this shortcut was renamed _PS2JavaExclamationIcon.lnk_.

Make sure GhostScript is istalled in your system and test file _ExclamationIcon.gs_ by making it opening always with _Ghostscript_. Double click
file _ExclamationIcon.gs_ to test _Ghostscript_. The icon should be displayed by _Ghostscript_.

Now the file _ExclamationIcon.java_ should be renamed to, for example, _ExclamationIcon.java.bak_. Once this done test the the shortcut 
_PS2JavaExclamationIcon.lnk_ by clicking twice on it. Once _Ghostscript_ is run, a new _ExclamationIcon.java_ file will appear in
the directory _C:\Users\Java\ExclamationIcon\src\com_. This is the _Java_ file produced by _Ghostscript_. Compile and run the project again
and it should run fine.

This completes the project. For another design, the same steps above should be repeated to create a new project. 
