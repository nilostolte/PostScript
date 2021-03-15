
# ExclamationIcon

![ExclamationIcon](https://user-images.githubusercontent.com/80269251/111144000-db707d80-855c-11eb-8ff6-9491937cbb03.png)

## File ExclamationIcon.gs

This file contains the definition of the icon in PostScript and in Java. The goal when using this technique is to define the
vector graphics in such a way that it matches definitions in both languages, that is, the same definitions are shared for the
two languages. It is a kind of a metalanguage where the objects are defined and that can be easily displayed (in PostScript) or
transformed in Java using Java **cartouches**. This example is excelent to use as a prototype and to substitute the
graphics definitions by other graphics, and use as it a tool. It is a structured way to organize the definitions in a very
high level manner.

### Licence

This file has a **very permissive licence but with some restrictions** as follows. It is provided as is and can be copied, modified, or distributed with some restrictions. **Code snippets extracted from this file are authorized and are totally free EXCEPT for the code identified by the mentions "CODE RESERVED - CANNOT BE COPIED" and "END OF RESERVED CODE"**. This code cannot be used outside the context of this file and is copyrighted by Nilo Stolte. When the entire file is used as is, or if several snippets of it are used to assemble another file with the same purpose as this one, all modifications must be commented with the proper credit under the "Modified by" section below the licence comment **EXCEPT** when the modification is just a different vector art (in this case the current vector design of the warning sign with exclamation point can be substituted by another design with the purpose to convert that design into Java). Following the credit, a brief description of the modification must be stated to differentiate from original code. Package information, comments, changing variables names and other changes that do not modify or do not add any functionality are not considered modifications and don't need to be commented. Authorized snippets can be used without the licence comment, no credits are needed, provided that once assembled in a file they do not perform the same functionality.

### The Dual Purpose And How To Switch From One To Another

After the licence comment, the first actual line of the code has the following statement:

**count 1 eq {/ps exch def } {/ps true def} ifelse**

If the program is launched by clicking on the shortcut as stated in:

https://github.com/nilostolte/PostScript/blob/main/Examples/Convertion%20to%20Java/README.md#using-windows-shortcuts-to-call-ghostscript

And if the shortcut has a **-c false** as its first flag after **"-dNOSAFER"**

