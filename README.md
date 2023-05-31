# PostScript
Contains PostScript code that can be used with any PostScript interpreter or converter (ex. Acrobat). I made a choice of using 
Ghostview  directly, because one can use some Ghostscript features using shortcuts in Windows.Ghostscript is a stable software
that will continue to be used as time passes by. 

## Examples

This [directory](https://github.com/nilostolte/PostScript/tree/main/Examples) contains code that are examples to use PostScript as a graphics script language. For example, details to convert Postscript to Java is given.

**Link: https://github.com/nilostolte/PostScript/tree/main/Examples**

## Opentype Fonts in PostScript

This [project](https://github.com/nilostolte/PostScript/tree/main/OpenType%20Fonts) is a modification of 
[**Glyph Inspector**](https://opentype.js.org/glyph-inspector.html) that generates a PostScript file with all
glyphs (all ASCII printable characters, in fact) and other information (width table - len array-, and kerning 
pairs table - kern array -) of the font file read with the program.

The program was written in JavaScript and it was added a button that triggers the convertion of the Opentype font file loaded
by the user. Once triggered, the browser tab where it was run becomes an html text file containing the font information of the
original Opentype font, but expressed in PostScript language. The file is not a PostScript font, but it has all elements to 
display texts using the glyphs of the original OpenType font (actually a font like structure can be contructed with it, but that
is out of the scope of this project). Copying the file to a text file and renaming it with a ".ps" becomes a PostScript
program able to display any of the converted glyphs of the font.<a name="verdana"></a>

### Example **verdana.ps**

As an example, [verdana.ps](https://github.com/nilostolte/PostScript/blob/main/OpenType%20Fonts/verdana.ps) was obtained by
loading **Verdana** font, converting it to PostScript, copying the resulting page to a text file, and adding the following 
lines at the end:

```PostScript
two
fill
showpage
```

This code simply displays the Verdana glyph for the number 2. Notice the reserved words **fill**, that indicates to fill
the glyph instead of stroking (use **stroke** to stroke only), and **showpage** that displays the page (necessary because it's not
an EPS file).

Notice that in the beginning of the file these commands respectivelly translates and scales the glyph:

```PostScript
50 110 translate
0.2 0.2 scale
```

These commands were generated by the convertion program for convenience. They can and should be moved to just before "two" function
call, in order to make it easier to modify the translation and scale, to, for example, write texts with.

This example is further discussed in 
[**Displaying Truetype Glyphs in PostScript**](https://github.com/nilostolte/PostScript/blob/main/Examples/README.md#displaying-truetype-glyphs-in-postscript).

## 3D Visualization Software

This [directory](https://github.com/nilostolte/Vector-Art/blob/main/Diamonds%20are%20Forever/README.md#diamonds-are-forever) contains an example generated with the 3D visualization software I have developped in PostScript.
