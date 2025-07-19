
/pow 4 def
/inv-pow 1. pow div def
0 setlinewidth
350 600 translate

0 -200 moveto 0 200 lineto stroke
-300 0 moveto 300 0 lineto stroke

150 150 scale
0 1 moveto
0. 0.01 1. {
	dup pow exp 1 exch sub inv-pow exp lineto
} for
1 0 lineto
stroke
0 -1 moveto
0. 0.01 1. {
	dup pow exp 1 exch sub inv-pow exp neg lineto
} for
1 0 lineto
stroke

0 -1 moveto
0. 0.01 1. {
	dup neg exch pow exp 1 exch sub inv-pow exp neg lineto
} for
-1 0 lineto
stroke

0 1 moveto
0. 0.01 1. {
	dup neg exch pow exp 1 exch sub inv-pow exp lineto
} for
-1 0 lineto
stroke

1 0 0 setrgbcolor
0 0 1 0 360 arc stroke

showpage
