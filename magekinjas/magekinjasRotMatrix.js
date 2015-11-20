var a11=1,a12=0,a13=0,a21=0,a22=1,a23=0,a31=0,a32=0,a33=1;
var b11=1,b12=0,b13=0,b21=0,b22=1,b23=0,b31=0,b32=0,b33=1;
var c11=1,c12=0,c13=0,c21=0,c22=1,c23=0,c31=0,c32=0,c33=1;
var d11=1,d12=0,d13=0,d21=0,d22=1,d23=0,d31=0,d32=0,d33=1;

function getrotMatrix(idelx,idely,Mode,dampen)
{/* xyz rotation around center */
 var fvalue=0;
 var sinang = 0;
 var cosang = 0;

 if(Mode == -1)
 {//archive original
       c11 = (a11); c12 = (a12); c13 = (a13);
       c21 = (a21); c22 = (a22); c23 = (a23);
       c31 = (a31); c32 = (a32); c33 = (a33);
    Mode = 0;
 }
 else if(Mode == 0) //lower canvas
 {//xy
  {//y
    fvalue = idelx*dampen;
    fvalue = fvalue/100.0;
    sinang = Math.sin(fvalue);
    cosang = Math.cos(fvalue);
    /*a11 a12 a13     cos   0   -sin
      a21 a22 a23  X    0   1      0
      a31 a32 a33     sin   0    cos
    */
    b11 = (a11*cosang + a13*sinang);
    b12 = a12;
    b13 = (a11*(-sinang) + a13*cosang);
    b21 = (a21*cosang + a23*sinang);
    b22 = a22;
    b23 = (a21*(-sinang) + a23*cosang);
    b31 = (a31*cosang + a33*sinang);
    b32 = a32;
    b33 = (a31*(-sinang) + a33*cosang);

    a11 = b11; a12 = b12; a13 = b13;
    a21 = b21; a22 = b22; a23 = b23;
    a31 = b31; a32 = b32; a33 = b33;
  }
  {//x
    fvalue = -idely*dampen;
    fvalue = fvalue/100.0;
    sinang = Math.sin(fvalue);
    cosang = Math.cos(fvalue);
    /* 1   0   0   
       0  cos sin
       0 -sin cos
    */
    b11 = a11;
    b12 = (a12*cosang - a13*sinang);
    b13 = (a12*sinang + a13*cosang);
    b21 = a21;
    b22 = (a22*cosang - a23*sinang);
    b23 = (a22*sinang + a23*cosang);
    b31 = a31;
    b32 = (a32*cosang - a33*sinang);
    b33 = (a32*sinang + a33*cosang);

    a11 = b11; a12 = b12; a13 = b13;
    a21 = b21; a22 = b22; a23 = b23;
    a31 = b31; a32 = b32; a33 = b33;
  }
 }//xy
 else if(Mode == 1)
 {//z: upper canvas
  fvalue = -idelx*dampen;
  fvalue = fvalue/100.0;
  sinang = Math.sin(fvalue);
  cosang = Math.cos(fvalue);
  /* cos sin 0
    -sin cos 0
      0   0  1 
  */
  b11 = (a11*cosang - a12*sinang);
  b12 = (a11*sinang + a12*cosang);
  b13 = a13;
  b21 = (a21*cosang - a22*sinang);
  b22 = (a21*sinang + a22*cosang);
  b23 = a23;
  b31 = (a31*cosang - a32*sinang);
  b32 = (a31*sinang + a32*cosang);
  b33 = a33;

  a11 = b11; a12 = b12; a13 = b13;
  a21 = b21; a22 = b22; a23 = b23;
  a31 = b31; a32 = b32; a33 = b33;
 }//z
}//xyz

function doRotation(pts3d,xctr,yctr,zctr,xscrn,yscrn,zscrn,zoom)
{
  var j = new Array();
  var x, y, z;
  //rot around ctr
  x = pts3d[1] - xctr;
  y = pts3d[2] - yctr; 
  z = pts3d[3] - zctr;
  var scalzoom = scalekin*zoom;
  j[0] = pts3d[0];

  j[1] = scalzoom*( x*(a11) + y*(a21) + z*(a31) ) + xscrn;
  j[2] = scalzoom*(-x*(a12) - y*(a22) - z*(a32) ) + yscrn;
  j[3] = scalzoom*( x*(a13) + y*(a23) + z*(a33) );

  j[4] = pts3d[4];
  j[5] = pts3d[5];
  j[6] = pts3d[6];
  return(j);
}

