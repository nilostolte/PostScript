
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


