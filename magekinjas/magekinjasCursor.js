function setCursor(grup,sgrp,list,pont)
{
   var MtrG = grup.length;
   var MtrS = sgrp.length;
   var MtrL = list.length;
   var MtrP = pont.length;
 grupID[MtrG] = "CURSOR";
 grup[MtrG] = new Array();

 grup[MtrG][0] = 1; //on
 grup[MtrG][1] = MtrS;
 grup[MtrG][2] = MtrS;
 grup[MtrG][3] = 0; //NOT animate
 grup[MtrG][4] = 1; //dominant
 grup[MtrG][5] = 0; //master

 CURSORgrup = MtrG;

 sgrpID[MtrS] = "CURSOR";
 sgrp[MtrS] = new Array();

 sgrp[MtrS][0] = 1;
 sgrp[MtrS][1] = MtrL;
 sgrp[MtrS][2] = MtrL;
 sgrp[MtrS][3] = MtrG;
 sgrp[MtrS][4] = 0;
 sgrp[MtrS][5] = 0;

 listID[MtrL] = "CURSOR";
 list[MtrL] = new Array();
 list[MtrL][0] = 1;
 list[MtrL][1] = MtrP;
 list[MtrL][2] = MtrP;
 list[MtrL][3] = MtrS;
 list[MtrL][4] =    2; //radius
 list[MtrL][5] =   27; //white-black
 list[MtrL][6] = CURSOR; //type
 list[MtrL][7] =    0; //master 
 
 pontID[MtrP] = "ctr";
 pont[MtrP] = new Array();
 pont[MtrP][0] = 256; //type
 pont[MtrP][1] =   0; //x
 pont[MtrP][2] =   0; //y
 pont[MtrP][3] =   0; //z
 pont[MtrP][4] =  -1; //radius
 pont[MtrP][5] =  27; //color
 pont[MtrP][6] =MtrL; //parent
 MtrP++;
 pontID[MtrP] = "x0";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   1;
 pont[MtrP][1] =  25;
 pont[MtrP][2] =   0;
 pont[MtrP][3] =   0;
 pont[MtrP][4] =  -1;
 pont[MtrP][5] =  27;
 pont[MtrP][6] =MtrL;
 MtrP++;
 pontID[MtrP] = "0-y";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   1;
 pont[MtrP][1] =   0;
 pont[MtrP][2] = -25;
 pont[MtrP][3] =   0;
 pont[MtrP][4] =  -1;
 pont[MtrP][5] =  27;
 pont[MtrP][6] =MtrL;
 MtrP++;
 pontID[MtrP] = "0+y";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   1;
 pont[MtrP][1] =   0;
 pont[MtrP][2] =  25;
 pont[MtrP][3] =   0;
 pont[MtrP][4] =  -1;
 pont[MtrP][5] =  27;
 pont[MtrP][6] =MtrL;
 MtrP++;
 pontID[MtrP] = "-x0";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   1;
 pont[MtrP][1] = -25;
 pont[MtrP][2] =   0;
 pont[MtrP][3] =   0;
 pont[MtrP][4] =  -1;
 pont[MtrP][5] =  27;
 pont[MtrP][6] =MtrL;
 MtrP++;
 pontID[MtrP] = "ctr";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   1;
 pont[MtrP][1] =   0;
 pont[MtrP][2] =   0;
 pont[MtrP][3] =   0;
 pont[MtrP][4] =  -1;
 pont[MtrP][5] =  27;
 pont[MtrP][6] =MtrL;
 MtrP++;
 pontID[MtrP] = "crc";
 pont[MtrP] = new Array();
 pont[MtrP][0] =   4;
 pont[MtrP][1] =   0;
 pont[MtrP][2] =   0;
 pont[MtrP][3] =   0;
 pont[MtrP][4] = -pickregion; //radius < 0 : not scaled
 pont[MtrP][5] =  31; //color: no fill
 pont[MtrP][6] =MtrL;

 list[MtrL][2] = MtrP; //last pont
}//setCursor

function moveCURSOR(delx,dely)
{
    LmovingCursor = true;
    var  CG = CURSORgrup;
    var  CS = grup[CG][1];
    var  CL = sgrp[CS][1];
    var CP1 = list[CL][1];
    var CP2 = list[CL][2];

    for(var Npt = CP1; Npt <= CP2; Npt++)
    {
        pont[Npt][1] = pont[Npt][1] + delx;
        pont[Npt][2] = pont[Npt][2] + dely;
    }
   xcursor = pont[CP1][1];
   ycursor = pont[CP1][2];
}

function drawCursor(grup,sgrp,list,pont)
{//drawCursor
    var LdoingPt = true;
    var nthings = 0;
    var k = 0;
    var m = 0;
    var  CG = CURSORgrup;
    var  CS = grup[CG][1];
    var  CL = sgrp[CS][1];
    var CP1 = list[CL][1];
    var CP2 = list[CL][2];

    CURSORcontext.clearRect(0,0,RAWSIZE,RAWSIZE); //with transparent black

    var cthings = new Array;
    for(var Npt = CP1; Npt <= CP2; Npt++)
    {   
        if(k==0 || pont[Npt][0] == 4 ||  pont[Npt][0] == 256) 
             {m = Npt;} 
        else 
             {m = Npt-1;}
        k++;
        deep = Zdepth[NBins-1];
        type = pont[Npt][0];
        Nlist = pont[Npt][6];
        if(pont[Npt][4])
           {radius = pont[Npt][4];}
        else if(list[Nlist][4])
           {radius = (list[Nlist][4]);}
        else radius = 0.2;

        if(pont[Npt][5])
           {color= pont[Npt][5];}
        else if(list[Nlist][5])
           {color = (list[Nlist][5]);}
        else color = 23;

        LdoingPt = true;
        while(LdoingPt)
        {
          var parts = new Array();
          cthings[nthings] = parts;

          cthings[nthings][0] = deep;
          cthings[nthings][1] = pont[m][1] + xscrn;
          cthings[nthings][2] = -pont[m][2] + yscrn;
          cthings[nthings][3] = deep;
          cthings[nthings][4] = pont[Npt][1] + xscrn;
          cthings[nthings][5] = -pont[Npt][2] + yscrn;
          cthings[nthings][6] = deep;
          cthings[nthings][7] = type; 
          cthings[nthings][8] = radius;
          cthings[nthings][9] = color;

          if(cthings[nthings][7] == 1 || cthings[nthings][7] == 256) 
             {drawVectorCURSOR(nthings);}
          else //(cthings[nthings][7] == 4) 
             {drawBallCURSOR(nthings);}

          nthings = nthings + 1;
          LdoingPt = false; 
        }
     }

      function drawVectorCURSOR(n)
      {
           CURSORcontext.beginPath(); //new path
           CURSORcontext.moveTo(cthings[n][1], cthings[n][2]);
           CURSORcontext.lineTo(cthings[n][4], cthings[n][5]);
           CURSORcontext.strokeStyle = cP[4][BW][color].toString();
           CURSORcontext.lineWidth = 1; //thin lines for Cursor
           CURSORcontext.lineCap = "round";
           CURSORcontext.stroke(); //do the line stroke
           CURSORcontext.closePath(); 
      }

      function drawBallCURSOR(n)
      {
           r = -cthings[n][8];
           if(BW == 0){CURSORcontext.strokeStyle ="#fff";} //white
           else {CURSORcontext.strokeStyle ="#000";} //black

           CURSORcontext.beginPath();
           CURSORcontext.arc(cthings[n][4], cthings[n][5], r+1, 0, 2*Math.PI, false);
           CURSORcontext.closePath();
           
           CURSORcontext.lineWidth = 2;
           CURSORcontext.stroke();
           CURSORcontext.closePath(); 
      }
      /*_____________________________________________________________________*/

   return;
}//drawCursor

