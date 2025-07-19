% static Path2D.Float J() {
% Path2D.Float p = new Path2D.Float();
% m(p,-12f, 385f);
% l(p,-12f, 385f);
% q(p,-106f, 385f, -160f, 358f);
% l(p,-160f, 358f);
% l(p,-160f, 213f);
% q(p,-89f, 233f, -12f, 233f);
% l(p,-12f, 233f);
% q(p,87f, 233f, 138.5f, 173f);
% q(p,190f, 113f, 190f, 0f);
% l(p,190f, 0f);
% l(p,190f, -1462f);
% l(p,360f, -1462f);
% l(p,360f, -14f);
% q(p,360f, 176f, 264f, 280.5f);
% q(p,168f, 385f, -12f, 385f);
% cp(p);
% return p;
% };

<< /PageSize [ 170 450 ]
>> setpagedevice

80 180 translate
0.2 -0.2 scale


/vsub {
   3 -1 roll exch sub 3 -2 roll sub exch
}def

/vadd {
   3 -1 roll add 3 -2 roll add exch
}def

/vmul {
	/fact exch def
	fact mul exch fact mul exch
} def

/quadto {
	/P2 [ 4 -2 roll ] cvx def
	/P1 [ 4 -2 roll ] cvx def
	/P0 [ currentpoint ] cvx def
	P1 P0 vsub 2 3 div vmul P0 vadd 
	P1 P2 vsub 2 3 div vmul P2 vadd  
	P2 curveto
} def

-12 385 moveto
-106 385 -160 358 quadto
-160 213 lineto
-89 233 -12 233 quadto
87 233 138.5 173 quadto
190 113 190 0 quadto
190 -1462 lineto
360 -1462 lineto
360 -14 lineto
360 176 264 280.5 quadto
168 385 -12 385 quadto

fill

showpage

