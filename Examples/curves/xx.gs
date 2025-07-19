0.05 setlinewidth
350 50 translate

0 -30 moveto 0 600 lineto stroke
-300 0 moveto 200 0 lineto stroke

25 25 scale
0 1 moveto
0 0.01 2.95  {
	dup dup exp  lineto
} for
stroke

/pp{
	0.05 0 360 arc fill
} def
/pow {
	 dup dup neg 1 sub {
		1 index mul
	 } repeat
} def

-1 -1 -10  {
	pow 1 exch div pp
} for

showpage
