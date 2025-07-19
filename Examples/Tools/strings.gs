
%*******************************************************************%
% 																	%
%	THIS FILE CONTAINS VARIOUS UTILITIES TO DEAL WITH APPENDING		%
%	SUBSTRINGS TO AN EXISTING STRING. CLEARLY POSTSRCRIPT LACKS		%
%	A CONCATENATION FUNCTION AND THESE UTILITIES SUPPLY SOLUTIONS	%
%	FOR THIS. OBVIOUSY THE LAST OPTION, A DICTIONARY CALLED LINE,	%
%	WHICH IS IN REALITY A COMPREHENSIVE LIBRARY TO DEAL WITH THIS	%
%	PROBLEM, IS THE BEST CHOICE OVER BINARY CONCATENATION.			%
% 																	%
%*******************************************************************%


	%**************************************************%
	%  OLD VERSIONS THAT ARE KEPT HERE TO DEMONSTRATE  %
	%  HOW TO COPY STRINGS CHARACTER BY CHARACTER, BUT %
	%  THEY ARE TOO CUMBERSOME, COMPLEX AND SLOW TO BE %
	%  USED IN PRACTICE. LINE DICTIONARY BELOW WAS     %
	%  PREFERED FOR ITS CLEAR FLEXIBILITY AND SPEED    %
	%**************************************************%
	/str 50 string	def	
	% copy a string to a new string n characters bigger
	% leaving the original string in the stack
	% Ex: (123) 2 cps --> (123) (123\000\000)
	/cps {
		1 index length add string  
		0 1 3 index length 1 sub {
			dup 3 index exch get 
			2 index 3 1 roll put 
		} for
	} def
	
	% concatenate two strings in the stack into one new string
	% Ex: (123) (4567) cs -->  (1234567)
	/cs {
		exch 1 index length cps exch length 0 1 4 index length 1 sub {
			dup 2 index add exch 4 index exch get 3 index 3 1 roll put
		} for
		pop exch pop
	} def
	
	% transforms object to string and add an f (102) at the end
	/fs { str cvs 1 cps exch length 102 2 index 3 1 roll put } def
	
	% transforms object to string and add an f and a comma at the end
	% Ex: 123 -> (123f,)
	/fsc { 
		str cvs 2 cps exch length 102 2 index 3 1 roll put
		dup dup length 1 sub 44 put 
	} def
	
	
	%**************************************************%
	%  NEW VERSIONS WHERE cps DOES NOT LEAVE ORIGINAL  %
	%  STRING IN THE STACK							   %
	%**************************************************%
	
	% short and faster version of cps
	% copy a string to a new string n characters bigger
	% Ex: (123) 2 cps --> (123\000\000)
	/cps {
		1 index length add string dup 3 1 roll copy pop
	} def
	%(123) 2 cps jjjj
	
	% transforms object to string and add an f (102) at the end
	/fs { str cvs dup length exch 1 cps dup 3 -1 roll 102 put } def
	%123 fs ffff
		
	% transforms object to string and add an f and a comma at the end
	% Ex: 123 -> (123f,)
	/fsc { 
		str cvs dup length exch 2 cps dup 3 -1 roll 102 put
		dup dup length 1 sub 44 put 
	} def
	%123 fsc ffff

	%**************************************************%
	%			- BINARY CONCATENATION -			   %
	%  NEW VERSION THAT DOES NOT USE cps, USING COPY   %
	%  AND PUTINTERVAL. SHORTER AND SUPPOSEDLY FASTER  %
	%**************************************************%
	
	% concatenate two strings in the stack into one new string
	% Ex: (123) (4567) cs -->  (1234567)
	/cs {
		exch 1 index length 1 index length add string dup dup 5 2 roll copy length
		exch putinterval
	} def
	%(123) (4567) cs jjj
	
	%******************************************************%
	%						- LINE -					   %
	%  ULTIMATE STRING GENERATION LIBRARY IN A DICTIONARY  %
	%  USING ONE CHARACTER COMMANDS TO APPEND STRINGS TO   %
	%  AN EXISTING STRING. VERY FLEXIBLE, SIMPLE AND MUCH  %
	%  FASTER THAN USING STANDARD CONCATENATION PRIMITIVES %
	%******************************************************%
	
	% constructs a string composed of substrings appended one by
	% one with operator +. Operator = copies it to a new string in
	% the stack. Operator ° resets the size to zero. # appends any
	% object, notably a number
	% Ex: line begin ° 1234 # (56789) + = end ->  (123456789)
	/line <<
		/str 128 string
		/num 20 string
		/i 0
		/+ {
			str i 2 index putinterval length /i exch i add def
		}
		/= { str 0 i getinterval i string copy }
		/° { /i 0 def }
		/# { num cvs + }
	>> def
	line begin ° 1234 # (56789) + = end jjjj
	