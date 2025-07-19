%!PS
/q {quit} def

% 8E = 142, size = 05, compact string (token)
/str <8E 05 74 6F 6B 65 6E> token pop exch pop def

% 95 = 149, number array with 16 bits fixed points (r = 0-32 = 0-20), size 0004
% with 32-r fractional bits. Here r = 32, therefore this is an array of integers
% equivalent to [100 200 40 50 ]
/arr <95 200004 0064 00C8 0028 0032> token pop exch pop def

/sa <80 03002E 0500 000600000018 0500 00060000001E 0500 000600000024 74 6F 6B 65 6E 31 74 6F 6B 65 6E 32 74 6F 6B 65 6E 33> token pop exch pop def

<80 03002E 0500 000600000018 0500 00060000001E 0500 000600000024 74 6F 6B 65 6E 31 74 6F 6B 65 6E 32 74 6F 6B 65 6E 33> type

