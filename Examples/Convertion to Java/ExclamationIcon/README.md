
# ExclamationIcon

![ExclamationIcon](https://user-images.githubusercontent.com/80269251/111144000-db707d80-855c-11eb-8ff6-9491937cbb03.png)

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

After the licence comment, the first actual line of the code has the following statement:

**count 1 eq {/ps exch def } {/ps true def} ifelse**

If the program is launched by clicking on the shortcut as stated in:

https://github.com/nilostolte/PostScript/blob/main/Examples/Convertion%20to%20Java/README.md#using-windows-shortcuts-to-call-ghostscript

And if the shortcut has a **-c false** as its first flag after **"-dNOSAFER"**, then the boolean **false** will be pushed to the 
stack before the control is passed to the _PostScript_ program. Then the command **"count"** will return 1 and 
the variable **"/ps"** will be initiallied with whatever was pushed on the stack. In this case it is with the boolean **false**. This 
will indicate the program that what we is to convert the design to _Java_. If the file is open in another way (by doule clicking the
_PostScript_ file or opening it with a different application, for example), the design is shown. Therefore it is this varibale that
controls how the program is going to behave. The change can be done by hand in other systems different thn Windows. However,
the shorcut method is far more faster when doing adjustments in the _Java_ version. Notice that most of the _Java_ code is automatically
generated, but never completely. 

### Structuring The File

Structuring the file was found to be much easier to accomplish these conversions, but at the start it might look is a bit harder 
to code since it requires a lot of discipline. Afterwards, though, the same structure is used again and again, thus simplifying the
development of other conversions.

The file is structured thanks to two functions: **"/psdefinitions"** and **/javadefinitions**. In both functions it is the function **/draw** that is called and that uses other functions to build the design. Some of these other functions are
developed by the user because they have to do with the design. Other functions are **"libraries"** that these
functions, or declaration statements outside of them, can use to build the design. In **"/psdefinitions"** all
the commands for displaying the file in _PostScript_ are defined, whereas in **/javadefinitions** the commands to generate the java class
with the design are defined.

Finally, the line:

**ps //psdefinitions //javadefinitions ifelse**

then chooses which definitions are to be used. If the value of **/ps** was initialized with **false**, as decribed above, it is
the **/javadefinitions** that is executed, otherwise it **"/psdefinitions"**.

What follows next are basically declarations that are done this way to structure the information in a way that can be easily
converted to _Java_ without the need of explicitly programming in _Java_.

In this example an "external library" is presented to illustrate how one can program a function in _PostScript_ that actually can be used
to define the same function in _Java_ automatically. 
