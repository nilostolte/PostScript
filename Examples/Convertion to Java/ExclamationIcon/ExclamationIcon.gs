%!PS-Adobe-3.1

% Author: Nilo Stolte
%
% License: this file is provided as is and can be copied, modified, or distributed with some restrictions.  **Code snippets extracted from this file are authorized and are totally free EXCEPT for the code identified by the mentions "CODE RESERVED - CANNOT BE COPIED" and "END OF RESERVED CODE"**. This code cannot be used outside the context of this file and is copyrighted by Nilo Stolte. When the entire file is used as is, or if several snippets of it are used to assemble another file with the same purpose as this one, all modifications must be commented with the proper credit under the "Modified by" section below EXCEPT when the modification is just a different vector art (in this case the current vector design of the warning sign with exclamation point can be substituted by another design with the purpose to convert that design into Java). Following the credit, a brief description of the modification must be stated to differentiate from original code. Package information, comments, changing variables names and other changes that do not modify or do not add any functionality are not considered modifications and don't need to be commented. Authorized snippets can be used without this comment, no credits are needed, provided that once assembled in a file they do not perform the same functionality. 
%
% Modified by:

% This statement works only when Ghostview is called with the shortcut that
% pushes a false to the stack. If it is called in any other way, it displays
% the file
/ps true def
/sca 12 def
count 1 eq {
	dup type /booleantype eq { /ps exch def }
	{
		dup type /integertype eq { /sca exch def } if
	} ifelse
} if

% yoff: offset separating each item
/yoff 32 sca mul  def

% Function containing definition for PostScript displaying
/psdefinitions {

	/m { moveto } bind def
	/l { lineto } bind def
	/c { curveto } bind def
	/h { closepath } bind def
	/f { fill } bind def
	/np {newpath} def
	/rg { setrgbcolor } bind def

	/d { def } def
	/g { def } def
	
	/c255 { 
	  [ exch {  dup type /integertype eq { 255 div } if  } forall ]
	} def
	
	/rad {
		<<
		/ShadingType 3
		/ColorSpace [ /DeviceRGB ]
		/Coords  7 -1 roll
		/Function
		<<
		/FunctionType 2
		/Domain [ 0 1 ]
		/C0 16 -1 roll c255 
		/C1 17 -1 roll c255
		/N 1
		>>
		/Extend [ false false ]
		/AntiAlias true
		>>
	} def
	
	% index <shade> <path>
	/drawfillshade {
		gsave
			userdict exch get exec
			clip np
			userdict exch get exch get aload pop 
			shfill
		grestore
	} def
	

	/draw {
		(white_circle) userdict exch get exec 1 setgray f
		0 (ring_shade) (color_ring) drawfillshade
		(exclam) userdict exch get exec 0.8627 0.0784 0.2353 rg f
		showpage
	} def

	/pagedict << /PageSize [ 32 sca mul  yoff ]
	   /Orientation 0
	>> def

	pagedict setpagedevice

	1 -1 scale 0 pagedict /PageSize get 1 get neg translate

} def

% Function containing definitions for Java generation
/javadefinitions {
	/imports {
	   (package com; \n\n) ws
	   (import java.awt.geom.Path2D;\n) ws
	   (import java.awt.geom.AffineTransform;\n) ws
	   (import java.awt.Graphics2D;\n) ws
	   (import java.awt.Color;\n) ws
	   (import java.awt.Paint;\n) ws
	   (import java.awt.RadialGradientPaint;\n) ws
	   % (import java.awt.GradientPaint;\n) ws
	   (import java.awt.RenderingHints;\n) ws
	   (import java.awt.Graphics;\n) ws
	   (import java.awt.geom.Point2D;\n) ws
	   (\nimport javax.swing.JPanel;\n\n) ws
	} def


	% D:\Programming\PostScript\Convertion to Java\Emblem important\Java
	% File declaration and opening
	/outfile1 (C:\\Users\\Java\\ExclamationIcon\\src\\com\\ExclamationIcon.java) (w) file def
	/st 50 string	def							  % string used to convert numbers 
	/ws { outfile1 exch writestring } def		  % function to write strings
	/out { outfile1 exch st cvs writestring }def % function to write numbers
	
	/mo { (      p.moveTo\() ws exch out (f,) ws out (f\);\n) ws } def
	/li { (      p.lineTo\() ws exch out (f,) ws out (f\);\n) ws } def
	/cv { (      p.curveTo\() ws
		6 -1 roll out (f,) ws 
		5 -1 roll out (f,) ws 
		4 -1 roll out (f,) ws 
		3 -1 roll out (f,) ws 
		exch out (f,) ws out (f\);\n) ws
    } def
	/cp { (      p.closePath\(\);\n) ws } def
	
	/m { mo } bind def
	/l { li } bind def
	/c { cv } bind def
	/h { cp } bind def
		
	/d { % defines a path as a java function returning a path
		 (   static private Path2D.Float ) ws exch ws 
		 (\(\) {\n      Path2D.Float p = new Path2D.Float\(\);\n) ws
		 exec % interprets path commands to output path commands in java
		 (      return p;\n   }\n) ws
	} def
	
	/g {
		(   static private Paint ) ws 
		exch ws ([] = {\n) ws
		{
			aload pop (      ) ws ws
		} forall
		(   };\n) ws
	} def 
	
	
	% CODE RESERVED - CANNOT BE COPIED
	% Author: Nilo Stolte
	% This code cannot be copied in any other context besides for
	% the purpose of converting PostScript files into Java
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
	% END OF RESERVED CODE
	
	/rad {
		% declares radii array 
		(   static private float[] ) ws 5 index ws (_radii = { ) ws 
		dup aload pop 3 index 1 index div out (f, 1f };\n) ws 
		line begin ° (new RadialGradientPaint\( new Point2D.Float\() + 
			5 index # (f, ) + 4 index # (f\), ) + # (f, ) +
			pop pop pop pop pop pop 4 index + (_radii, ) +
			% declares colors array
			(   static private Color[] ) ws 4 index dup ws + (_colors\)\n) +
			(_colors = { new Color\() ws 
            exch 	dup 0 get dup type exch out /realtype eq {(f) ws } if (, ) ws 
					dup 1 get dup type exch out /realtype eq {(f) ws } if (, )ws 
						2 get dup type exch out /realtype eq {(f) ws } if (\), ) ws
			(new Color\() ws 
			dup 0 get dup type exch out /realtype eq {(f) ws } if (, ) ws 
			dup 1 get dup type exch out /realtype eq {(f) ws } if (, ) ws 
				2 get dup type exch out /realtype eq {(f) ws } if (\) };\n) ws =
		end 
	} def
	
	/drawfillshade {
		exch
		3 index  ws (g.setPaint\() ws ws ([) ws exch ws (]\);\n) ws	% set the paint with gradient
		exch ws (g.fill\() ws ws (\);\n) ws			% fill with outline
	} def
	
	/drawpath {
		2 index  ws (g.setColor\() ws ws (\);\n) ws
		exch ws (g.fill\() ws  ws (\);\n) ws				% fill with outline
	} def
	
	/draw {
		(   ) ws draw_type ws ( void paintComponent(Graphics g1) {\n) ws
		(      Graphics2D g = (Graphics2D) g1;\n) ws
		(      g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);\n) ws
		(      AffineTransform matrix;\n) ws
		(      matrix = g.getTransform();\n) ws
		(      g.scale(sca, sca);\n) ws
		(      ) (white_circle_path) (Color.white) drawpath
		(      ) (0) (ring_shade) (color_ring_path) drawfillshade
		(      ) (exclam_path) (exclam_color) drawpath
		(      g.setTransform(matrix);\n) ws
		(   }\n) ws
		(}\n) ws
		outfile1 closefile
	} def
	
	%*******************************************************%
	%														%
	%	 	Write file header, class name and variables		%
	%														%
	%*******************************************************%

	imports
	
	(@SuppressWarnings("serial")\n) ws
	
	class_name ws ( {\n\n) ws

	%variables
	(   public final double sca = 12.;\n\n) ws
	
	% initialize static immutable path and Color variables
	(   static private Color exclam_color = new Color\(0.8627f, 0.0784f, 0.2353f\);\n) ws
	(   static public Color get_color() { return exclam_color; }\n) ws
	(   static private Path2D.Float  white_circle_path = white_circle\(\);\n) ws
	(   static private Path2D.Float exclam_path = exclam\(\);\n) ws
	(   static private Path2D.Float color_ring_path = color_ring\(\);\n) ws
	
} def

%*******************************************************%
%														%
%	 	DEFINE INTERNAL LIBRARY AND DRAW FUNCTION 		%
%														%
%*******************************************************%

/class_name (class ExclamationIcon extends JPanel) def
/draw_type (public) def

% choice between displaying drawing in PostScript or converting it to java
ps //psdefinitions //javadefinitions ifelse

%*******************************************************%
%														%
%					EXTERNAL LIBRARY					%
%														%
%*******************************************************%

%parametrable paths to approximate a circle for a given corner and length

/k0 0.55191502449 def % constant to approximate circles by cubic bezier curves

(circle_anti) { % anticlowise circle
	/len exch def
	/y0 exch def
	/x0 exch def
	/r len 0.5 mul def
	/k k0 r mul def
	/x1 x0 len add def
	/y1 y0 len add def
	/mx x0 r add def
	/my y0 r add def
	/lmx mx k sub def
	/rmx mx k add def
	/umy my k sub def
	/dmy my k add def	
	x1 my m
    x1 umy rmx y0 mx y0 c
    lmx y0 x0 umy x0 my c
	x0 dmy lmx y1 mx y1 c
	rmx y1 x1 dmy x1 my c	
} def

(circle_clock){ % clockwise circle
	/len exch def
	/y0 exch def
	/x0 exch def
	/r len 0.5 mul def
	/k k0 r mul def
	/x1 x0 len add def
	/y1 y0 len add def
	/mx x0 r add def
	/my y0 r add def
	/lmx mx k sub def
	/rmx mx k add def
	/umy my k sub def
	/dmy my k add def	
	x1 my m
    x1 dmy rmx y1 mx y1 c
    lmx y1 x0 dmy x0 my c
    x0 umy lmx y0 mx y0 c
    rmx y0 x1 umy x1 my c
} def


%*******************************************************%
%														%
%					PATH DEFINITIONS					%
%														%
%*******************************************************%


sca sca scale

(white_circle) {
	0.2 0.2 32 0.4 sub circle_anti
} d

(color_ring) {
	0 0 32 circle_anti
	3 3 32 6 sub circle_clock
} d

(exclam) {
	13.816 7.68 m
	13.719 7.68 13.641 7.813 13.641 7.969 c 
	14.438 18.801 l
	14.438 18.957 14.52 19.086 14.613 19.086 c
	14.613 19.086 15.246 19.098 15.766 19.086 c
	15.938 19.086 15.988 19.102 16.145 19.086 c
	16.664 19.098 17.293 19.086 17.293 19.086 c
	17.391 19.086 17.469 18.957 17.469 18.801 c
	18.27 7.969 l 
	18.27 7.813 18.188 7.703 18.094 7.703 c
	16.156 7.703 l
	16.148 7.703 16.152 7.68 16.145 7.68 c 
	h
	17.715 22.543 m
	17.715 23.496 16.941 24.27 15.988 24.27 c 
	15.031 24.27 14.258 23.496 14.258 22.543 c
	14.258 21.59 15.031 20.816 15.988 20.816 c
	16.941 20.816 17.715 21.59 17.715 22.543 c 
} d

%*******************************************************%
%														%
%				GRADIENT/SHADE ARRAYS					%
%														%
%*******************************************************%

(ring_shade) 
	[
		[
			[ 0.8627 0.0784 0.2353]
			[ 255 0 0 ]
			[16 16 13 16 16 16] rad
		]
	]
 g

%*******************************************************%
%														%
%						RUN PROGRAM						%
%														%
%*******************************************************%

draw
