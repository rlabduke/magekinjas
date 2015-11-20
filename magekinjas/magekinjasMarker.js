function setMarkers(grup,sgrp,list,pont)
{
 grupID[0] = "markers";
 grup[0] = new Array();

 grup[0][0] = 0;
 grup[0][1] = 0; //first sgrp
 grup[0][2] = 0; //last sgrp
 grup[0][3] = 0; //NOT animate
 grup[0][4] = 0; //NOT dominant
 grup[0][5] = 0; //master

 sgrpID[0] = "mks1n2";
 sgrp[0] = new Array();

 sgrp[0][0] = 1;
 sgrp[0][1] = 0;
 sgrp[0][2] = 2;
 sgrp[0][3] = 0; //parent group
 sgrp[0][4] = 0;
 sgrp[0][5] = 0;

 listID[0] = "marker1";
 list[0] = new Array();
 list[0][0] = 1;
 list[0][1] = 0;
 list[0][2] = 2;
 list[0][3] = 0; //parent
 list[0][4] = .2; //radius
 list[0][5] = 31; //color
 list[0][6] =  4; //type
 list[0][7] =  0; //master

 pontID[0] = "marker1";
 pont[0] = new Array();
 pont[0][0] =8192; //type
 pont[0][1] = 100; //x
 pont[0][2] = 100; //y
 pont[0][3] = 100; //z
 pont[0][4] = -.5; //radius in kinemage terms
 pont[0][5] = 31; //color
 pont[0][6] =  0; //parent

 pontID[1] = "marker1";
 pont[1] = new Array();
 pont[1][0] =   4;
 pont[1][1] = 100;
 pont[1][2] = 100;
 pont[1][3] = 100;
 pont[1][4] =-.45;
 pont[1][5] = 31;
 pont[1][6] =  0;

 pontID[2] = "marker1";
 pont[2] = new Array();
 pont[2][0] =8192;
 pont[2][1] = 100;
 pont[2][2] = 100;
 pont[2][3] = 100;
 pont[2][4] =-.35;
 pont[2][5] = 31;
 pont[2][6] =  0;


 listID[1] = "marker2";
 list[1] = new Array();
 list[1][0] = 1;
 list[1][1] = 3;
 list[1][2] = 5;
 list[1][3] = 0;
 list[1][4] = .2;
 list[1][5] = 31;
 list[1][6] =  4;
 list[1][7] =  0;

 pontID[3] = "marker2";
 pont[3] = new Array();
 pont[3][0] =8192;
 pont[3][1] = 100;
 pont[3][2] = 100;
 pont[3][3] = 100;
 pont[3][4] = -.35;
 pont[3][5] = 31;
 pont[3][6] =  1;

 pontID[4] = "marker2";
 pont[4] = new Array();
 pont[4][0] =   4;
 pont[4][1] = 100;
 pont[4][2] = 100;
 pont[4][3] = 100;
 pont[4][4] =-.45;
 pont[4][5] = 31;
 pont[4][6] =  1;

 pontID[5] = "marker2";
 pont[5] = new Array();
 pont[5][0] =8192;
 pont[5][1] = 100;
 pont[5][2] = 100;
 pont[5][3] = 100;
 pont[5][4] =-.35;
 pont[5][5] = 31;
 pont[5][6] =  1; 


 listID[2] = "measures";
 list[2] = new Array();
 list[2][0] = 1;
 list[2][1] = 6;
 list[2][2] = 9;
 list[2][3] = 0; //parent
 list[2][4] = 0;  //radius
 list[2][5] = 27; //color
 list[2][6] =  1; //type
 list[2][7] =  0; //master

 pontID[6] = "measure";
 pont[6] = new Array();
 pont[6][0] = 256;
 pont[6][1] = 100;
 pont[6][2] = 100;
 pont[6][3] = 100;
 pont[6][4] =   5; //radius
 pont[6][5] =  27; //color
 pont[6][6] =   2; //parent

 pontID[7] = "measure";
 pont[7] = new Array();
 pont[7][0] =   1;
 pont[7][1] = 100;
 pont[7][2] = 100;
 pont[7][3] = 100;
 pont[7][4] =   5;
 pont[7][5] =  27;
 pont[7][6] =   2;

 pontID[8] = "measure";
 pont[8] = new Array();
 pont[8][0] =   1;
 pont[8][1] = 100;
 pont[8][2] = 100;
 pont[8][3] = 100;
 pont[8][4] =   5;
 pont[8][5] =  27;
 pont[8][6] =   2;

 pontID[9] = "measure";
 pont[9] = new Array();
 pont[9][0] =   1;
 pont[9][1] = 100;
 pont[9][2] = 100;
 pont[9][3] = 100;
 pont[9][4] =   5;
 pont[9][5] =  27;
 pont[9][6] =   2;

}//setMarkers

function moveMarkers(grup,sgrp,list,pont,pickindex)
{
   var pt1 = list[1][1];
   for(var pt0 = list[0][1]; pt0 <= list[0][2]; pt0++)
   {
      pont[pt1][1] = pont[pt0][1];
      pont[pt1][2] = pont[pt0][2];
      pont[pt1][3] = pont[pt0][3];
      pt1++;
   }
   for(var pt0 = list[0][1] ; pt0 <= list[0][2]; pt0++)
   {
      pont[pt0][1] = pont[pickindex][1];
      pont[pt0][2] = pont[pickindex][2];
      pont[pt0][3] = pont[pickindex][3]; //maybe add in radius of picked thing??
   }
}   

function moveMeasures(grup,sgrp,list,pont,pickindex,Nmeasure)
{
  var pt0 = list[2][1];
  var pt1 = pt0 +1;
  var pt2 = pt0 +2;
  var pt3 = list[2][2];

  if(Nmeasure == 0)
  {
     pont[pt3][1] = pont[pt2][1] = pont[pt1][1] = pont[pt0][1] = pont[pickindex][1];
     pont[pt3][2] = pont[pt2][2] = pont[pt1][2] = pont[pt0][2] = pont[pickindex][2];
     pont[pt3][3] = pont[pt2][3] = pont[pt1][3] = pont[pt0][3] = pont[pickindex][3];
     angle = 0;
     dihedral = 0;
  }
  else
  {
   pont[pt3][1] = pont[pt2][1];
   pont[pt3][2] = pont[pt2][2];
   pont[pt3][3] = pont[pt2][3];

   pont[pt2][1] = pont[pt1][1];
   pont[pt2][2] = pont[pt1][2];
   pont[pt2][3] = pont[pt1][3];

   pont[pt1][1] = pont[pt0][1];
   pont[pt1][2] = pont[pt0][2];
   pont[pt1][3] = pont[pt0][3];

   pont[pt0][1] = pont[pickindex][1];
   pont[pt0][2] = pont[pickindex][2];
   pont[pt0][3] = pont[pickindex][3];

   angle = angle3pt(pont[pt2][1], pont[pt2][2], pont[pt2][3]
                  , pont[pt1][1], pont[pt1][2], pont[pt1][3]
                  , pont[pt0][1], pont[pt0][2], pont[pt0][3] );
   dihedral = dihedral4pt(pont[pt3][1], pont[pt3][2], pont[pt3][3]
                        , pont[pt2][1], pont[pt2][2], pont[pt2][3]
                        , pont[pt1][1], pont[pt1][2], pont[pt1][3]
                        , pont[pt0][1], pont[pt0][2], pont[pt0][3] );
  }
}

function changeMark(Nmark)
{
   if(Nmark == 2)
   {
       LmarkersOn = true;
       LmeasuresOn = false;
       angle = 0;
       dihedral = 0;
       grup[0][0] = 1;
       list[2][0] = 0;//off
   }   
   else if(Nmark ==3)
   {
       Nmeasure = 0;
       angle = 0;
       dihedral = 0;
       LmarkersOn = true;
       LmeasuresOn = true;
       grup[0][0] = 1;
       list[2][0] = 1;//ON
   }
   else
   {
       LmarkersOn = false;
       LmeasuresOn = false;
       angle = 0;
       dihedral = 0;
       grup[0][0] = 0;
       list[2][0] = 0;//off
   }
   drawkin();
}

var dblx,dbly,dblz;
function angle3pt(p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z )
{
    var ax,ay,az,bx,by,bz;
    var amag,bmag,dot;
    var angle;
    
    //subtract middle point from two ends
    ax = p1x - p2x;
    ay = p1y - p2y;
    az = p1z - p2z;
    bx = p3x - p2x;
    by = p3y - p2y;
    bz = p3z - p2z;
    
    dot = dotproduct(ax,ay,az,bx,by,bz);
    amag = Math.sqrt(ax*ax + ay*ay + az*az);
    bmag = Math.sqrt(bx*bx + by*by + bz*bz);
    if(amag*bmag <0.0001){angle = 0.0;} 
    else angle = Math.acos( dot/(amag*bmag) );
    angle = angle*360.0/(2*3.14159);
    return(angle);
}

function crossproduct( ax, ay, az, bx, by, bz)
{
    dblx = (ay)*(bz) - (az)*(by);
    dbly = (az)*(bx) - (ax)*(bz);
    dblz = (ax)*(by) - (ay)*(bx);
}

function dotproduct( ax, ay, az, bx, by, bz )
{
    var answer = ax*bx + ay*by + az*bz;
    return(answer);
}

function dihedral4pt( p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z, p4x, p4y, p4z)
{
   var angle,angledhdrl,dot,dmag,emag,fmag;
   var ax,ay,az,bx,by,bz,cx,cy,cz;
   var dx,dy,dz,ex,ey,ez;
   var fx,fy,fz;

   /* a,b,c 3 vectors between 4 points, */
   /* d,e   2 crossproduct vectors referenced as pointers*/
   /* f     a crossproduct vector  referenced as pointer */
   /* if d = a x b and e = b x c, then d orth a & b, e orth b & c */
   /* d & e both perpendicular to b */
   /* so d dot e is the dihedral, that is */
   /*   same angle as a to c if a & c were projected on a plane*/

   /* angle defined between two vectors with a common base*/
   /* so subtract middle point from the two end points */
   ax = p1x - p2x;
   ay = p1y - p2y;
   az = p1z - p2z;
   bx = p3x - p2x;
   by = p3y - p2y;
   bz = p3z - p2z;

   /* d = a x b */
   crossproduct(ax,ay,az,bx,by,bz); /*return vector is dblx,dbly,dblz */
   dx = dblx;
   dy = dbly;
   dz = dblz;

   /* angle defined between two vectors with a common base*/
   /* so subtract middle point from the two end points, */
   /* redefining b for cross product around third point (b = -b)*/
   bx = p2x - p3x;   /* -b as far as d is concerned */
   by = p2y - p3y;
   bz = p2z - p3z;
   cx = p4x - p3x;
   cy = p4y - p3y;
   cz = p4z - p3z;

   /* e = b x c */
   crossproduct(bx,by,bz,cx,cy,cz); /*return vector is dblx,dbly,dblz */
   ex = dblx;
   ey = dbly;
   ez = dblz;

   /*Now for d dot e  pass values to dotproduct()*/
   dot = dotproduct(dx,dy,dz,ex,ey,ez);
   /*normalization factors*/
   dmag = Math.sqrt( (dx)*(dx) + (dy)*(dy) + (dz)*(dz) );
   emag = Math.sqrt( (ex)*(ex) + (ey)*(ey) + (ez)*(ez) );
   if(dmag*emag <0.0001)
   {
       angle = 0.0;
   }
   else angle = Math.acos( dot/(dmag*emag) );
   angledhdrl = angle*360.0/(2*3.14159);

   /* Now, need to establish correct handedness */
   /* d x -b is vector pointing in same sort of direction as orig a */
   /* f = d x -b = d x b as b was redefined for e calculation */
   crossproduct(dx,dy,dz,bx,by,bz); /*return vector is dblx,dbly,dblz */
   fx = dblx;
   fy = dbly;
   fz = dblz;

   /*Now for f dot e  pass values to dotproduct()*/
   dot = dotproduct(fx,fy,fz,ex,ey,ez);
   /*normalization factors*/
   fmag = Math.sqrt( (fx)*(fx) + (fy)*(fy) + (fz)*(fz) );
   if(fmag*emag <0.0001)
   {
       angle = 0.0;
   }
   else angle = Math.acos( dot/(fmag*emag) );
   angle = angle*360.0/(2*3.14159);
   if(angle > 90.0) angledhdrl = -angledhdrl;
   return(angledhdrl);
}
