
/pagedict << /PageSize [ 200 500 ]
   /Orientation 0
>> def
pagedict setpagedevice
0.2 setflat

% determine le max x du grand cercle de
% 2128190_10 pour calculer la BB

% ajuste a une taille et a une position apropriee 
10 10 translate
/sca 40 def
sca sca scale
0.5 sca div setlinewidth

-88.8245 -36.5068 translate

% Example de tracer la courbe en utilisant les points de maniere
% traditionnelle
%
% 92.1585 48.4689 moveto
% 94.5415 44.2448 93.0486 38.8889 88.8245 36.5068 curveto
% stroke

% voici le format pour ce programme (+ simple)
/bzr [ 
  [ 92.1585 48.4689 ]
  [ 94.5415 44.2448 ]
  [ 93.0486 38.8889 ]
  [ 88.8245 36.5068 ]
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
92.1585 48.4689 mbzr
94.5415 44.2448 93.0486 38.8889 88.8245 36.5068 cbzr
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
% bzr sbv
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

% fonction pour determiner le plus grand x de tous les 
% points de la courbe en stockant le resultat en xgt
% c'est possible de faire la meme chose avec le y
/xgtr { 
  /xgt -1.0E+38 def 
  { 0 get dup xgt gt 
     { /xgt exch def } 
	 { pop }ifelse
  } forall
} def

% fonction recursive qui determine le point de maximum 
% x de la courbe utilisant sbv et xgtr. La fontion decide
% quelles des deux (left ou right)subdiviser davantage en 
% faisaint la soustraction entre les x maximums de left et
% de right. Si c'est zero la fonction arrete puisque les 
% deux cotes produisent le meme point de maximum x qui est, 
% donc, le point de maximum x de toute la courbe. Si le 
% resultat est negatif right est pris et left abandone.
% Sinon, l'oppose se passe. La sub-courbe choisi sera la
% nouvelle entree pour bxmax qui va repeter ce processus
% jusqu'a que la soustraction ait zero comme resultat.
% C'est possible de reecrire cette fonction pour traiter
% les y
/bxmax {
  sbv
  left xgtr xgt 
  right xgtr xgt 
  sub dup
  0 eq { pop }
  {
  0 lt { right bxmax }
	    { left bxmax } ifelse
  }ifelse
} def

%%%%%%%% not tested %%%%%%%%%%%
/ygtr { 
  /ygt -1.0E+38 def 
  { 1 get dup ygt gt 
     { /ygt exch def } 
	 { pop }ifelse
  } forall
} def

/bymax {
  sbv
  left ygtr ygt 
  right ygtr ygt 
  sub dup
  0 eq { pop }
  {
  0 lt { right bymax }
	    { left bymax } ifelse
  }ifelse
} def
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



% pour calculer le xmax substituer pop par exec
/xmax
{
bzr bxmax
xgt
} exec
def

% returns y coordinate when a x is found among the points
/xmaxcmp {
  /notfound exch
  { dup 0 get xmax eq 
     { 	exch pop 1 get /found exit } 
	 {	0 get xmax gt
		{ pop /greater exit } if
	 } ifelse
  } forall
} def

% methode alternative pour calculer le y du point minimal
% /by {
  % sbv
  % left xmaxcmp dup /found eq { pop } 
  % {  /notfound eq 
	% { right by }
    % { left by } ifelse
  % } ifelse
% } def

% xmax bzr by 5 40 div 0 360 arc fill

0 0.5 0 setrgbcolor
xmax left xmaxcmp pop 2.5 sca div 0 360 arc fill
showpage
