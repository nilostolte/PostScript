%!PS-Adobe-3.1

%*******************************************************%
%														%
%					   FILE OUTPUT						% 
%														%
%*******************************************************%

% File declaration and opening
/outfile1 (D:\\Programming\\PostScript\\PS2 File\\translated path.txt) (w) file def
% even translation
% /x -.522344 def
% /y -.0248735 def
% odd translation
% /x -.124001 def
% /y -.30587 def

/x 1.65598 def
/y 0 def
/str 50 string	def							% string used to convert numbers 
/ws { outfile1 exch writestring } def			% function to write strings
/out { outfile1 exch str cvs writestring }def % function to write numbers
/mo	{ exch x add out ( ) ws y add out ( mo\n) ws } def
/li	{ exch x add out ( ) ws y add out ( li\n) ws } def
/cv { 	6 -1 roll x add out ( ) ws 
		5 -1 roll y add out ( ) ws 
		4 -1 roll x add out ( ) ws 
		3 -1 roll y add out ( ) ws 
		exch x add out ( ) ws y add out ( cv\n) ws
} def

%*******************************************************%
%														%
%					  	 PATH							%
%														%
%*******************************************************%

	142.798 47.2493 mo
	142.801 65.4343 157.545 80.1743 175.731 80.1713 cv
	193.915 80.1683 208.655 65.4243 208.652 47.2383 cv
	208.65 29.0543 193.905 14.3133 175.72 14.3163 cv
	157.535 14.3193 142.795 29.0633 142.798 47.2493 cv

outfile1 closefile
