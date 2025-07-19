%!PS-Adobe-3.1 EPSF-3.0


0 setgray
0.15 setlinewidth


/Bezier
<<
/new { 
  <<>> exch 1 index
	begin
	  /controlpoints exch def
	  /equation controlpoints Bezier/coeficients get exec def
	  /function { begin equation end exch Bezier/evaluation get exec } def
	  /plot { 
		 gsave begin controlpoints end Bezier/graph get exec stroke grestore 
	  } def
	  /gett { 
	    begin equation end Bezier begin /equation exch def 0.5 dup gett end
	  } def
	end
  def
}
/graph { aload pop 8 -2 roll moveto curveto} 
/coeficients {
  /ps exch def
  /cx ps 2 get ps 0 get sub 3 mul def
  /cy ps 3 get ps 1 get sub 3 mul def
  /bxcx ps 4 get ps 2 get sub 3 mul def
  /bx bxcx cx sub def
  /bycy ps 5 get ps 3 get sub 3 mul def 
  /by bycy cy sub def
  /ax ps 6 get ps 0 get sub bxcx sub def
  /ay ps 7 get ps 1 get sub bycy sub def
  [ ax ay bx by cx cy ps 0 get ps 1 get ]
} 
/evaluation{
	/t exch def
	/t2 t t mul def
	/t3 t2 t mul def
	dup 0 get t3 mul 1 index 2 get t2 mul add 1 index
	4 get t mul add 1 index 6 get add
	exch
	dup 1 get t3 mul 1 index 3 get t2 mul add 1 index 
	5 get t mul add 1 index 7 get add
	exch pop 
}
%/plot { gsave currentdict exch get begin controlpoints end Bezier/graph get exec stroke  grestore }
%/function { currentdict exch get begin equation end exch Bezier/evaluation get exec }

/gett {
 25 {
	equation 2 index evaluation exch dup 5 index gt {
	  pop pop 2 div exch 1 index sub exch 
	}{ 
	  4 index sub abs 1.90735e-06 le { pop exit }
	  { pop 2 div exch 1 index add exch } ifelse
	}ifelse
  } repeat
  pop exch pop
}
>> def

/r 0.25 def

/Bezier1 [  349.458 141.17 339.921 148.645 361.024 163.754 357.18 180.334 ] Bezier/new get exec

Bezier1 begin
%determine the translation vector
/xmin controlpoints 0 get def
/ymin controlpoints 1 get def
2 2 controlpoints length 1 sub { 
  dup controlpoints exch get dup xmin lt { /xmin exch def } { pop } ifelse
  1 add controlpoints exch get dup ymin lt { /ymin exch def } { pop } ifelse
} for
18 18 scale
%translate to the origin
r 2 mul xmin neg add r 2 mul ymin neg add translate
end

Bezier1 dup/plot get exec
%newpath 0.8 Bezier1 dup/function get exec 1 0 360 arc fill
stroke


Bezier1 begin
controlpoints 0 get controlpoints 1 get r 0 360 arc fill
controlpoints 2 get controlpoints 3 get r 0 360 arc fill
controlpoints 4 get controlpoints 5 get r 0 360 arc fill
controlpoints 6 get controlpoints 7 get r 0 360 arc fill
end

gsave
1 0 0 setrgbcolor
% newpath 357.18 Bezier1 dup/gett get exec dup exch Bezier1 dup/function get exec r .1 add 0 360 arc fill
% newpath 356.752 Bezier1 dup/gett get exec dup exch Bezier1 dup/function get exec r .1 add 0 360 arc fill
newpath 357.309378 Bezier1 dup/gett get exec dup exch Bezier1 dup/function get exec r .1 add 0 360 arc fill
grestore

/t exch def
/nc { 3 index  1 t sub mul 2 index t mul add 
	  3 index  1 t sub mul 2 index t mul add
} def

Bezier1 begin

controlpoints 0 get controlpoints 1 get moveto controlpoints 2 get controlpoints 3 get lineto stroke
controlpoints 2 get controlpoints 3 get moveto controlpoints 4 get controlpoints 5 get lineto stroke
controlpoints 4 get controlpoints 5 get moveto controlpoints 6 get controlpoints 7 get lineto stroke

/p1 [controlpoints 0 get controlpoints 1 get controlpoints 2 get controlpoints 3 get nc 6 2 roll  pop pop pop pop ] def
/p2 [controlpoints 2 get controlpoints 3 get controlpoints 4 get controlpoints 5 get nc 6 2 roll  pop pop pop pop ] def
/p3 [controlpoints 4 get controlpoints 5 get controlpoints 6 get controlpoints 7 get nc 6 2 roll pop pop pop pop ] def
/p4 [ p1 aload pop p2 aload pop nc 6 2 roll  pop pop pop pop ] def
/p5 [ p2 aload pop p3 aload pop nc 6 2 roll  pop pop pop pop ] def

p1 aload pop moveto p2 aload pop lineto stroke
p2 aload pop moveto p3 aload pop lineto stroke
p4 aload pop moveto p5 aload pop lineto stroke

gsave 1 1 0 setrgbcolor p1 aload pop r 0 360 arc fill grestore
p2 aload pop r 0 360 arc fill 
p3 aload pop r 0 360 arc fill
gsave 0 1 0 setrgbcolor  p4 aload pop r 0 360 arc fill grestore
p5 aload pop r 0 360 arc fill
p4 aload pop p5 aload pop nc 6 2 roll pop pop pop pop r 0 360 arc fill


p4 aload pop p5 aload pop nc 6 2 roll  pop pop pop pop
p4 aload pop
p1 aload pop
controlpoints 0 get controlpoints 1 get

end




