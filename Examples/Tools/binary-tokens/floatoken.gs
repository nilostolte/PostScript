%!PS
/Helvetica findfont 30 scalefont setfont
/str 20 string def
/float <8A 3E AA AA AA> def

/hexasc { dup 10 ge { 7 add }if 48 add } def
/hexstring { 
   dup length dup 2 mul string 3 1 roll 1 sub 0 1 3 -1 roll { 
      2 index dup 3 -1 roll dup 1 bitshift dup 1 add 4 1 roll 5 index 3 -1 roll get dup
      16#0F and hexasc 4 1 roll
      -4 bitshift hexasc put put
   } for
   pop
}def

100 500 moveto
float token pop str cvs show
100 470 moveto
float hexstring show
showpage
