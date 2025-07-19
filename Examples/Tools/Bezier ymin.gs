% determine le min x du grand cercle de
% 2128190_10 pour calculer la BB

/pagedict << /PageSize [ 340 470 ]
   /Orientation 0
>> def
pagedict setpagedevice
0.2 setflat

% ajuste a une taille et a une position apropriee 

0 20 translate

/sca 5 def
sca sca scale
0.5 sca div setlinewidth


% Example de trace la courbe en utilisant les points de maniere
% traditionnelle
%
% 25.5115 84.2638 moveto
% -33.5555 65.5378 42.3025 -23.5732 63.8126 6.83577 curveto
% stroke

% voici le format pour ce programme (+ simple)
/bzr [ 
  [ 25.5115 84.2638 ]
  [ -33.5555 65.5378 ]
  [ 42.3025 -23.5732 ]
  [ 63.8126 6.83577 ]
] def

% fonctions substituant moveto et curveto pour remplir /bzr
/mbzr { bzr 0 [ 5 -2 roll ] put } def
/cbzr { 
  bzr 1 [ 9 -2 roll ] put
  bzr 2 [ 7 -2 roll ] put
  bzr 3 [ 5 -2 roll ] put
} def

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% COURBE BEZIER EN SUBSTITUANT moveto ET curveto PAR mbzr ET cbzr
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
25.5115 84.2638 mbzr
-33.5555 65.5378 42.3025 -23.5732 63.8126 6.83577 cbzr
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Definition des commandes pour pouvoir tracer 
% cette courbe dans ce format. Ils assument que
% les points sont d'abord mis dans la pile avec
% un "aload pop"

% moveto et curveto pour ce format
/mt { 4 -1 roll aload pop moveto } def
/ct { 
   exch aload pop 3 2 roll aload pop 
   5 -1 roll aload pop 6 2 roll curveto
} def

% trace la path
/draw {
  aload pop
  mt
  ct
} def

% met tous les points dans la pile
/dmp { { aload pop } forall } def

% test des commandes ci-dessus, ça fonctionne
%1 0 0 setrgbcolor
%bzr draw
%stroke

% fontion pour calculer le point au milieu
% d'une droite definite par deux points 
% represente par deux arrays de deux elements
/midpt {
  [ 
     2 index 0 get 2 index 0 get add 2 div 
	 4 -1 roll 1 get 4 -1 roll 1 get add 2 div
  ] 
} def

% fonction qui subdivise une bezier en deux courbes,
% left et right. mid est le point moitié dans le premier
% convex hull
/sbv {
/in exch def
/left [ 
  in 0 get
  in 0 get in 1 get midpt 
  /mid in 1 get in 2 get midpt def
  dup mid midpt
  in 2 get in 3 get midpt
  dup mid midpt exch
  2 index 2 index  midpt dup
  4 1 roll /right exch  [ exch 5 3 roll
  in 3 get ] def
  ] def
} def

% test pour verifier si sbv marche: reponse graphique,
% les deux courbes doivent couvrir la courbe d'origine
% mais avec leur couleurs respectives
bzr sbv
1 0 0 setrgbcolor
left draw
stroke
0.3 0 0.7 setrgbcolor
right draw
stroke

% fonction pour determiner le plus petit x de tous les 
% points de la courbe en stockant le resultat en xgt
% c'est possible de faire la meme chose avec le y
/ylsr { 
  /ylt 1.0E+38 def 
  { 1 get dup ylt lt 
     { /ylt exch def } 
	 { pop }ifelse
  } forall
} def

% fonction recursive qui determine le point de minimum 
% x de la courbe utilisant sbv et xlsr. La fontion decide
% quelles des deux (left ou right)subdiviser davantage en 
% faisaint la soustraction entre les x maximums de left et
% de right. Si c'est zero la fonction arrete puisque les 
% deux cotes produisent le meme point de minimum x qui est, 
% donc, le point de minimum x de toute la courbe. Si le 
% resultat est negatif left est pris et right abandone.
% Sinon, l'oppose se passe. La sub-courbe choisi sera la
% nouvelle entree pour bxmax qui va repeter ce processus
% jusqu'a que la soustraction ait zero comme resultat.
% C'est possible de reecrire cette fonction pour traiter
% les y
/bymin {
  sbv
  left ylsr ylt 
  right ylsr ylt 
  sub dup
  0 eq { pop }
  {
  0 lt { left bymin }
	   { right bymin } ifelse
  }ifelse
} def


% Le point minimum est montré comme un cercle 

0 0.5 0 setrgbcolor
bzr bymin
right 0 get aload pop 2.5 sca div 0 360 arc
fill
showpage
