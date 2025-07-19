
% File declaration and opening
/outfile1 (D:\\Programming\\PostScript\\Tools\\rewriteps.txt) (w) file def

/x 0 def
/y 0 def
/str 50 string	def							% string used to convert numbers 
/ws { outfile1 exch writestring } def			% function to write strings
/out { outfile1 exch str cvs writestring }def % function to write numbers
/mo	{ exch x add out ( ) ws y add out ( moveto\n) ws } def
/li	{ exch x add out ( ) ws y add out ( lineto\n) ws } def
/cv { 	6 -1 roll x add out ( ) ws 
		5 -1 roll y add out ( ) ws 
		4 -1 roll x add out ( ) ws 
		3 -1 roll y add out ( ) ws 
		exch x add out ( ) ws y add out ( curveto\n) ws
} def


0.05 setlinewidth

0 300 translate
5 5 scale

25.5115 84.2638 -1 mul 90 add moveto
-33.5555 65.5378 -1 mul 90 add 42.3025 -23.5732 -1 mul 90 add 63.8126 6.83577 -1 mul 90 add curveto
stroke

25.5115 84.2638 -1 mul 90 add mo
-33.5555 65.5378 -1 mul 90 add 42.3025 -23.5732 -1 mul 90 add 63.8126 6.83577 -1 mul 90 add cv

outfile1 closefile

showpage