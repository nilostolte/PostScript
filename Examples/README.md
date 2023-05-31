
# Examples

Several examples of use of PostScript language are shown here. Some uses are quite unexpected and very useful.

## Conversion To Java

The examples here concentrate in converting Postscript vector graphics into Java:

https://github.com/nilostolte/PostScript/tree/main/Examples/Convertion%20to%20Java

## Egg

Egg as one of the most traditional food products has been attracting mathematicians’, engineers’ and biologists’
attention from analytical point of view since long ago. As a main operand in oomorphology, the shape of a bird’s
egg has, to date, escaped a universally applicable mathematical formulation. Analysis of all egg shapes can be
laid in four geometric figures: sphere, ellipsoid, ovoid, and pyriform (conical or pear-shaped). The first three have
a clear mathematical definition according to [Fritz Hügelschäffer](https://github.com/nilostolte/PostScript/blob/main/Examples/Egg/Egg%20article.pdf).

[This](https://github.com/nilostolte/PostScript/blob/main/Examples/Egg/egg.ps) is the PostScript code implementing
the shape using Fritz Hügelschäffer formula. Please check [Egg and Math: Introducing a Universal Formula for Egg Shape](https://github.com/nilostolte/PostScript/blob/main/Examples/Egg/Egg%20article.pdf) article for more details on the
parameters and for a more complete formula for pyriform egg shapes.

Fritz Hügelschäffer formula:<br>
<img src="https://github.com/nilostolte/PostScript/assets/80269251/515dd37c-e585-485c-b8d5-77e5805b7a56)" width="300" height="127" ><br>
Where B is the egg maximum breadth (on the Y axis), L is the egg length (on the X axis), and w is the parameter (in the image w= 2.5) 
that shows the distance between two vertical lines corresponding to the maximum breadth and the half length of the egg.

Below is an image produced by this code on GhostScript and [here](https://github.com/nilostolte/PostScript/blob/main/Examples/Egg/egg.pdf) the
file converted to [PDF](https://github.com/nilostolte/PostScript/blob/main/Examples/Egg/egg.pdf).

<kbd>
<img src="https://github.com/nilostolte/PostScript/assets/80269251/a30ef840-5650-4f74-8d09-b6ca4b14ed83" width="683" height="589" >
</kbd>

## Displaying Truetype Glyphs in PostScript

### Some Historic Background

**OpenType** fonts can be subdivided in two main categories: **TrueType** fonts and **Opentype PostScript** fonts. Fonts in the second category aren't actually PostScript fonts (that is, fonts that can be used in PostScript files), it's just that their Glyphs 
are defined in a similar way as **Type 1** fonts (fonts that can be really used inside PostScript files). **Type 1** fonts were
discontinued by Adobe. PostScript is somewhat deprecated and to be substituted by **PDF**. In reality that is not completely
true. **EPS** (Encapsulated PostScript) is still used in graphics design industry and it's still used in **Adobe Illustrator** and
**Adobe Acrobat Pro**. Since EPS is PostScript, PostScript wasn't actually completely abandoned.

The primary problem with PostScript is that it can't display transparency, but the strength of PostScript is its simple and
straighforward way do describe shapes. The language is completely dedicated to produce shapes in a programable way. Shapes with
lots of repetitions are compact and easily obtainable in PostScript, for example. In this context, fonts in PostScript can be seen
as practically hacks, even though **Type 1** fonts was a huge business in the past. This was like this because electronic
documents were all in PostScript. Type 1 fonts were highly protected and obfuscated because of strict copyrights. However, in the
the wake of OpenType, where fonts are to be considered most of the times *"open source"*, and PDF as the official format for
electronic documents, all these hindrances became rather inconvenient.

### Cubic and Quadratic Bezier curves in Glyphs

In **Opentype PostScript** fonts (and in **Type 1** fonts, for that score), curves in glyphs are described **only** with 
cubic Bezier curves. This is indeed a more economical way to represent glyphs, because it needs less points to express
complex shapes. Another particularity of these fonts is that the kerning information is stored in the GPOS table, while
in **TrueType** fonts this information is more compact and stored in a simpler kerning pairs table. What's clear is that
Adobe opted for higher quality fonts than **TrueType**, because in these fonts curves in glyphs are represented exclusively
with quadratic Bezier curves.

### Quadratic Bezier curves in PostScript

And this bring us to the heart of the problem this example is addressing: **PostScript only allows cubic Bezier curves**, not
quadratic. This is rather logical because quadratic Bezier curves can be considered as a particular case of cubic
Bezier curves.

Mathematically, this is explained by 
[these formulations](https://fontforge.org/docs/techref/bezier.html#converting-truetype-to-postscript):

<p align="center">
<img src="https://github.com/nilostolte/PostScript/assets/80269251/b02bcbf1-cd1e-4d18-becb-bac65bf13d27" width="683" height="393" >
</p>

Cubic curves (**C** above) have 4 control points (P0, P1, P2 and P3), whereas quadratic curves (**Q** above) have only 3 (P0, P1 and P2). 
Therefore, one can use this method to convert curves with 4 control points to 3 control points. This is done
[here](https://github.com/nilostolte/PostScript/blob/main/Examples/Quadratic%20Bezier%20curves/quadto.ps). Notice that
technically the beginning and end points of are not usually considered "control points", but just **CP1** and **CP2**, or **QP1**,
are formally "control points."

As can be seen in this [example](https://github.com/nilostolte/PostScript/blob/main/Examples/Quadratic%20Bezier%20curves/quadto.ps),
the conversion is done by this code:

```PostScript
/vsub {
   3 -1 roll exch sub 3 -2 roll sub exch
}def

/vadd {
   3 -1 roll add 3 -2 roll add exch
}def

/vmul {
	/fact exch def
	fact mul exch fact mul exch
} def

/quadto {
	/P2 [ 4 -2 roll ] cvx def
	/P1 [ 4 -2 roll ] cvx def
	/P0 [ currentpoint ] cvx def
	P1 P0 vsub 2 3 div vmul P0 vadd 
	P1 P2 vsub 2 3 div vmul P2 vadd  
	P2 curveto
} def
``` 
Instead of using the Postscript command **curveto**, which requires 4 control points (the **currentpoint** and 3 points
explicitly given before the command), one uses a function called **quadto**, which requires only 3 control points 
(the **currentpoint** and 2 points explicitly given before the function call). Behind the scenes (inside the quadto function), 
quadto only converts the 3 control points into 4 control points and calls **curveto** command. The function actually implements
the method shown above.

Notice in the code above that 3 functions simplify the conversion: **vsub**, **vadd**, and  **vmul**. These are the implementation
of **vector** subtraction, addition as well as the multiplication of a vector by a scalar, respectively. In **quadto** function
P0, P1 and P2 are arrays containing x and y coordinates of the points, based on the input as well as the **currentpoint**. In 
other words they are **QP0**, **QP1** and **QP2** represented as vectors. Notice that these arrays are converted to "executable" 
using the command **cvx**. In this way, their names actually call the procedure that pushes both coordinates to the stack. After 
all these operations are executed what remains in the stack is **CP1**, **CP2** and **CP3**, the arguments for the command **curveto**.

### Obtaining **TrueType** Glyphs

As shown in the above example, **TrueType** Glyphs were already given as is in the program. But where can we get them
from? Enters [**Glyph Inspector**](https://github.com/nilostolte/PostScript/tree/main/OpenType%20Fonts).

**Glyph Inspector** allows to examine glyphs of a font and convert the information to PostScript. Here one needs to
load any **TrueType** font file. For example, type in the address bar of any Explorer window on Windows: 
**C:\Windows\Fonts**:

<p align="center">
<kbd>
<img src="https://github.com/nilostolte/PostScript/assets/80269251/9225f5fa-e23a-482a-baa2-b2d0163591b6" width="683" height="501" >
</kbd>
</p><br>

Then double-click on **Verdana**, drag **"Verdana Regular"** to Downloads, and now open **verdana.ttf** on **Glyph Inspector** (by clicking on **Choose File**, opening Downloads directory, typing **verdana.ttf** in "File name:" box, and clicking **Open**):

<p align="center">
<kbd>
<img src="https://github.com/nilostolte/PostScript/assets/80269251/c3280f80-3cf5-4aac-bbb7-d970d1af60dd" width="683" height="384" >
</kbd>
</p><br>

By clicking on **PostScript** button the font is converted to PostScript. This is the procedure to obtain the example
[**verdana.ps**](https://github.com/nilostolte/PostScript#verdana).

