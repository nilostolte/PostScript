%!PS-Adobe-3.1 EPSF-3.0

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%                                                                             %%%%%%
%%%%%% This program subdivides a cubic Bezier curve in 2 pieces, either supplying  %%%%%%
%%%%%% the "t" parameter for the subdivision point or the x coordinate of the      %%%%%%
%%%%%% subdivision point. In the example here, the x coordinate is given.          %%%%%%
%%%%%%                                                                             %%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

0 setgray
%0.15 setlinewidth
0.03 setlinewidth

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

%/r 0.25 def
/r 0.1 def

% /Bezier1 [ 51.0234 165.285 54.8442 151.567 52.6475 146.925 44.2583 142.846 ] Bezier/new get exec
/Bezier1 [  44.2583 142.846 52.6475 146.925 54.8442 151.567 51.0234 165.285 ] Bezier/new get exec

Bezier1 begin
%determine the translation vector
/xmin controlpoints 0 get def
/ymin controlpoints 1 get def
2 2 controlpoints length 1 sub { 
  dup controlpoints exch get dup xmin lt { /xmin exch def } { pop } ifelse
  1 add controlpoints exch get dup ymin lt { /ymin exch def } { pop } ifelse
} for
30 30 scale
%translate to the origin
r 2 mul xmin neg add r 2 mul ymin neg add translate
end


% display point of the curve with x = 48.333
%newpath 48.333 Bezier1 dup/gett get exec dup exch Bezier1 dup/function get exec r 0 360 arc fill

%/t exch def
/t 48.333 Bezier1 dup/gett get exec def


/nc { 3 index  1 t sub mul 2 index t mul add 
	  3 index  1 t sub mul 2 index t mul add
} def

gsave
%draw De Casteljeau subdivision lines
0 1 0 setrgbcolor
Bezier1 begin
/p1 [
  controlpoints dup 0 get exch 1 get
  controlpoints dup 2 get exch 3 get
  nc 6 2 roll  pop pop pop pop 
] def
/p2 [
  controlpoints dup 2 get exch 3 get
  controlpoints dup 4 get exch 5 get
  nc 6 2 roll  pop pop pop pop 
] def
p1 aload pop moveto p2 aload pop lineto stroke
/p3 [
  controlpoints dup 4 get exch 5 get 
  controlpoints dup 6 get exch 7 get
  nc 6 2 roll pop pop pop pop
] def
1 0.5 0 setrgbcolor
p2 aload pop moveto p3 aload pop lineto stroke
/p4 [ p1 aload pop p2 aload pop nc 6 2 roll  pop pop pop pop ] def
/p5 [ p2 aload pop p3 aload pop nc 6 2 roll  pop pop pop pop ] def
0 0.5 1 setrgbcolor
p4 aload pop moveto p5 aload pop lineto stroke
end
grestore

%draw Bezier curve
% Bezier1 dup/plot get exec
% stroke

gsave
% draw control points and converx hull
0.9 0.44 0.29 setrgbcolor
Bezier1 begin
controlpoints dup 0 get exch 1 get moveto
controlpoints dup 2 get exch 3 get lineto 
controlpoints dup 4 get exch 5 get lineto
controlpoints dup 6 get exch 7 get lineto
stroke
controlpoints 0 get controlpoints 1 get r 0 360 arc fill
controlpoints 2 get controlpoints 3 get r 0 360 arc fill
controlpoints 4 get controlpoints 5 get r 0 360 arc fill
controlpoints 6 get controlpoints 7 get r 0 360 arc fill
end
grestore

1 0 0 setrgbcolor

%first subdivided part
Bezier1 begin
controlpoints dup 0 get exch 1 get moveto
p1 aload pop
p4 aload pop
end
t Bezier1 dup/function get exec
curveto
stroke

%second subdivided part
Bezier1 begin
p5 aload pop
p3 aload pop
controlpoints dup 6 get exch 7 get
end

t Bezier1 dup/function get exec moveto
curveto
stroke

0 setgray
t Bezier1 dup/function get exec r 0 360 arc fill