var cosrockang=1;
var sinrockang=0;
var rockextent=0;
var rockstepsize=0;
var rockstep=0;
var rockmin = -5;
var rockmax = +5;
var rocknumsteps = 40;
var rockstepNum = 0;
var rockcycle = 0;
var rockstepMAX = 0;
var rockImage = new Array();




function drawkin()
{
//alert('drawkin grup n== '+grup.length+', sgrp n== '+sgrp.length+', list n== '+list.length+', pont n== '+pont.length);
 Lpicked = false;
 var deep = 0;
 var RIBdeep = undefined;

 var pts2D = new Array();
 var kcount = 0; 
 var kt = 0; k = 0; //total kt, working k
 var Lanimatoggle = false;
 if(Lpickon)
 {//picking place corrections
    var xed = xoff;
    var yed = yoff;
    if(LCursorOn) 
    {//cursor lives in molecule space
       xplace = xcursor+xscrn; 
       yplace = -ycursor+yscrn;
       xed = 0;
       yed = 0;
    }
    else
    {//mice and fingers run in screen space
       xplace = xpick; 
       yplace = ypick;
    }
 }

 if(!LmovingCursor)
 {//full rotation calculations 
//alert('in drawkin, grup.length== '+grup.length);
   for(var Ng = 0; Ng < grup.length; Ng++)
   {
      if(grup[Ng][0] && Ng != CURSORgrup)
      {
         for(var Ms = grup[Ng][1]; Ms <= grup[Ng][2]; Ms++)
         {
//alert(' group '+Ng+' : subgroups '+grup[Ng][1]+', To '+grup[Ng][2]);
            if(sgrp[Ms][0])
            {
               for(var JL = sgrp[Ms][1]; JL <= sgrp[Ms][2]; JL++)
               {
                  if(list[JL][0])
                  {
                     for(var Kp = list[JL][1]; Kp <= list[JL][2]; Kp++)
                     {
//alert(' pont[Kp] == '+pont[Kp]);
         pts2D[kt] = new Array();
         pts2D[kt]= doRotation(pont[Kp],xctr,yctr,zctr,xscrn,yscrn,zscrn,zoom);
//alert(' pts2D[kt] == '+pts2D[kt]);
         if( (Lpickon && Ng > 0) && (list[JL][6] != CURSOR))
         {
           if(( (pts2D[kt][1]-(xplace-xed))*(pts2D[kt][1]-(xplace-xed))
                +(pts2D[kt][2]-(yplace-yed))*(pts2D[kt][2]-(yplace-yed))) 
               < pickerrenhance*pickerr)
           {
              if(pts2D[kt][3] > z2Datmpicked) 
              {//check z level
                 z2Datmpicked = pts2D[kt][3];
                 Lpicked = true;
                 pickindex = Kp;
                 x2Datmpicked = pts2D[kt][1];
                 y2Datmpicked = pts2D[kt][2];
              }
           }
         }//Lpickon

         kt++;
         kcount = kt;
                     }//points
                  }//list ON
               }//lists
            }//subgroup ON
         }//subgroups
      }//group ON
   }//groups

   if(Lpickon && Lpicked && (pickindex >= 0))
   {
      if(LPickCtrOn) 
      {
         xctr = pont[pickindex][1];
         yctr = pont[pickindex][2];
         zctr = pont[pickindex][3];
         LPickCtrOn = false; //single-shot
         var temp = document.getElementById("pickctr");
         temp.value = "pick center";
      }
      else //identify
      {
         if(pontID[pickindex]) {pointID = pontID[pickindex];}
         oldptx = newptx;
         oldpty = newpty;
         oldptz = newptz;
         newptx = pont[pickindex][1];
         newpty = pont[pickindex][2];
         newptz = pont[pickindex][3];

         if(oldptx != null)
         {
            distance = Math.sqrt( (newptx - oldptx)*(newptx - oldptx)
                                 +(newpty - oldpty)*(newpty - oldpty)
                                 +(newptz - oldptz)*(newptz - oldptz));
         }
         else {distance = 0;}

         moveMarkers(grup,sgrp,list,pont,pickindex);
         if(LmeasuresOn)
         {
            moveMeasures(grup,sgrp,list,pont,pickindex,Nmeasure);
            Nmeasure++;
         }
      }       
      Lpickon = false;
   }//Lpicked

   //load2D subsection of drawkin
   var ncount = 0; //drawable things
   var things = new Array();
   var LdoingPt = true;
   ncount = 0; //total drawable things
   var KthPt = 0; //points in List
   var NthList = -1; //current list
   var radius = undefined;
   var m = 0; //previous point m, which is first point of a vector to k point
   var n = 0; //point preceding point m, needed for triangles
//alert('at allpoints: kcount== '+kcount);
   allpoints: for(var k = 0; k < kcount; k++)
   {
      Nlist = pts2D[k][6];  
      if( Nlist >  NthList){NthList = Nlist; KthPt = 0;} 

      if(KthPt==0) 
           {m = k; n = k; KthPt++;} 
      else if(k==1)
           {m = k-1; n = k-1; KthPt++;}
      else
           {m = k-1; n= m-1; KthPt++;}

      type = pts2D[k][0]; //2D thing TYPE of k point, unless overridden

      if(Ldetail && list[Nlist][6] == 97) //TRIANGLE
      {
         if(KthPt < 3) {continue allpoints;}
         if(pts2D[k][0] == 256) {type = 65;}//PLP triangle
         else  {type = 97;}//LPL ribbon section
         deep = ( (pts2D[k][3] + pts2D[m][3] + pts2D[n][3])/3 );
      } 
      else if(type == 256 || type == 4 || type == 2 || type == 8192)
         {deep = pts2D[k][3]; m = k;} //single point, override m
      else if(type == 1)
         {deep = ( (pts2D[k][3] + pts2D[m][3])/2 );} //VECTOR uses k&m

      if(pts2D[k][4])
         {radius = pts2D[k][4];}
      else if(list[Nlist][4])
         {radius = (list[Nlist][4]);}
      else {radius = undefined;}  //110210 110209

      if(pts2D[k][5])
         {color= pts2D[k][5];}
      else if(list[Nlist][5])
         {color = (list[Nlist][5]);}
      else color = 23; //default Mage white


      if(radius && radius > 5 && color == 30)
      {//probably thick black behind narrower front color line
         if(pts2D[k][3] < pts2D[m][3]) {deep = pts2D[k][3] - 10*ZBinthick;}
         else {deep = pts2D[m][3] - 10*ZBinthick;}
      } 


      if(color == 30) {color = 0;}
      else if((color > 27 && color < 30) || color > 31 || color < 0)
         {color = 23;}//overrides
      //deadblack==30->0, deadwhite==26, black||white==27, no fill==31



      LdoingPt = true;
      while(LdoingPt) //spheres, arrows, etc. need more than one drawable
      {
        var parts = new Array();
        things[ncount] = parts;

        things[ncount][0] = deep; //position here for sort
        things[ncount][1] = pts2D[n][1];
        things[ncount][2] = pts2D[n][2];
        things[ncount][3] = pts2D[n][3];
        things[ncount][4] = pts2D[m][1];
        things[ncount][5] = pts2D[m][2];
        things[ncount][6] = pts2D[m][3];
        things[ncount][7] = pts2D[k][1];
        things[ncount][8] = pts2D[k][2];
        things[ncount][9] = pts2D[k][3];
        things[ncount][10] = type; 
        things[ncount][11] = radius;
        things[ncount][12] = color;
      //adjust deep to place wide black definitely behind narrow colored vector
      //  if(radius > 5)
      //  {
      //     if((things[ncount][0] < +zclip) && (things[ncount][0] > -zclip+5))
      //       {things[ncount][0] = things[ncount][0] - 5;} 
      //  }
        ncount = ncount + 1;
        LdoingPt = false; 
      }//doing stuff at this Point
   }//allpoints loop  

   //NOW Pointer can be pushed onto things array and placed wrt ctr

   var backToFront = new Array();
   for(var n=0; n<ncount; n++)
   {//load backtofront

      var nd = Math.ceil(((things[n][0]+zlimit)/ZRange)*NBins);
//alert('load backToFront: things['+n+'][0]== '+things[n][0]+', bin nd== '+nd);
      if(!backToFront[nd])
      {
          var depthlevel = new Array();
          backToFront[nd] = depthlevel;
      }

      if(things[n][0] < Zdepth[nd]) 
      { 
          if(nd == 0 && zclip > 0) {;}  //discard behind rear zclip  
          else
          {backToFront[nd].push(n);} 
      }
      else if(nd == (NBins-1) && zclip == 0)
      { //Zdepth[NBins-1] is effective front zclip
          backToFront[nd].push(n);//no clipping, add to front bin
      }
   }//load backtofront         

   //draw2D subsection of drawkin

   drawingcontext.clearRect(0,0,width,height); //refresh screen
   if(BW == 0)
   {
       drawingcontext.fillStyle = "#000";
       //drawingcontext.fillRect(0,0,canvasGeom.width, canvasGeom.height);
       drawingcontext.fillRect(0,0,width,height);
   }

   var wide = 0;
   var ndeep = 0;
   for(var nd = 0; nd<NBins; nd++)
   {//scan drawable things backToFront
     // LOK = true;
     // while(LOK)
     // {
         if(backToFront[nd])
         {//things are at this depth
//alert('backToFront['+nd+'].length == '+backToFront[nd].length);
           for(var nn=0; nn<backToFront[nd].length; nn++)
           {//at Zdepth nd
          //  var n = backToFront[nd].pop();
          //  if(n >= 0)
          //  {//things still defined for this depth
            var n = backToFront[nd][nn]; //index of a point is stored here
            color = things[n][12];

            ndeep = Math.floor(nd/100);
            if(ndeep > 4){ndeep = 4;}
            if(Lthinline)
               {wide = 2;}
            else if(Lonewidth)
               {wide=4;}
            else
               {wide = ndeep+2;}
            
//            if(radius && (things[n][10] == 1 || things[n][10] == 256))
            if(things[n][11] && (things[n][10] == 1 || things[n][10] == 256)) //110210 110209
            {//specific width override
               wide = things[n][11];
            }
            if(things[n][10] == 1) 
               {drawVector(n);}
            else if(things[n][10] == 256) 
               {drawDot(n);} //dot at start of vector or polyline
            else if(things[n][10] == 2) 
               {drawDot(n);} //actual isolated dot
            else if(things[n][10] == 4) 
               {drawBall(n);}
            else if(things[n][10] == 8192)
               {drawMark(n);}
            else if((things[n][10] == 65) || (things[n][10] == 97))
               {drawTriangle(n);}

           // }//things still defined for this depth
           }//at Zdepth nd
           // else{break;}
         }//things are at this depth   
        // else {LOK = false;}      
     // }//get things at this depth
   }//scan drawable things backToFront
   //draw the drawable things

   function drawTriangle(n)
   {
        var foo = new Array();

        //if(things[n][10] == 65 || !RIBdeep) //PLP, not LPL 
        {//get new RIBdeep
           foo = things[n];
           RIBdeep = retrievecolordepth(foo);
        }
        drawingcontext.beginPath(); //new path
        drawingcontext.moveTo(things[n][1], things[n][2]);
        drawingcontext.lineTo(things[n][4], things[n][5]);
        drawingcontext.lineTo(things[n][7], things[n][8]);
        drawingcontext.fillStyle = cP[RIBdeep][BW][color].toString();
        drawingcontext.lineWidth = 1;
        drawingcontext.lineCap = "round";
        drawingcontext.strokeStyle = cP[RIBdeep][BW][color].toString();
        drawingcontext.stroke(); //do the line stroke
        drawingcontext.closePath();
        drawingcontext.fill();
 
   }

   function drawVector(n)  //LineWidth NOT scale with zoom
   {
        drawingcontext.beginPath(); //new path
        drawingcontext.moveTo(things[n][4], things[n][5]);
        drawingcontext.lineTo(things[n][7], things[n][8]);
        //drawingcontext.fillStyle = cP[ndeep][BW][color].toString();
        drawingcontext.strokeStyle = cP[ndeep][BW][color].toString();
if(things[n][11]== 4)
{
//alert(' things['+n+'][0] '+things[n][0]+' things['+n+'][11] '+things[n][11]+', wide== '+wide+' ndeep== '+ndeep+', cP: '+drawingcontext.strokeStyle);
}
        if(things[n][11] < 0){wide = 1;}
        drawingcontext.lineWidth = wide;
        drawingcontext.lineCap = "round";
        //drawingcontext.strokeStyle ="#000"; //black
        drawingcontext.stroke(); //do the line stroke
        drawingcontext.closePath(); 
   }

   function drawDot(n)  //Shades of old PC, some OS need fake line
   {
        drawingcontext.beginPath(); //new path
        drawingcontext.moveTo(things[n][7], things[n][8]);
        drawingcontext.lineTo(things[n][7], things[n][8]);
        drawingcontext.strokeStyle = cP[ndeep][BW][color].toString();
        if(things[n][11] < 0){wide = 1;}
        drawingcontext.lineWidth = wide;
        drawingcontext.lineCap = "round";
        //drawingcontext.strokeStyle ="#000"; //black
        drawingcontext.stroke(); //do the line stroke
        drawingcontext.closePath(); 
   }

   function drawBall(n)  //radius scales with zoom
   {
        drawingcontext.strokeStyle ="#000"; //black
        if(things[n][11] > 0)
        {
           r = zoom*scalekin * things[n][11];
           drawingcontext.lineWidth = 2;
        }
        else if(things[n][11] == 0) 
        {
           r = 10 * zoom*scalekin;
           drawingcontext.lineWidth = 2;
        } 
        else 
          {
             //r = -things[n][11];
             r = -zoom*scalekin * things[n][11];
             drawingcontext.lineWidth = 1;
             if(BW == 0){drawingcontext.strokeStyle ="#fff";} //white
          }
        drawingcontext.beginPath(); //new path
        drawingcontext.arc(things[n][7], things[n][8], r+1, 0, 2*Math.PI, false);
        drawingcontext.closePath(); //circular place to draw
        //surrounding circumference 
        

        drawingcontext.stroke();
        drawingcontext.closePath(); 

        if(color != 31 ) //possible color code
        {//open disk of color
           drawingcontext.fillStyle = cP[ndeep][BW][color].toString();
           drawingcontext.fill();
        }
   }

   function drawMark(n)  //radius scales with zoom
   {

        if(BW == 0){drawingcontext.strokeStyle ="#fff";} //white
        else {drawingcontext.strokeStyle ="#000";} //black
        if(things[n][11] > 0)
          {r = zoom*scalekin * things[n][11];}
        else if(things[n][11] == 0) 
           {r = 10 * zoom*scalekin;} 
        else 
          {
             //r = -things[n][11];
             r = -zoom*scalekin * things[n][11];
          }
        if(things[n][11] < 0){wide = 1;}
        drawingcontext.lineWidth = wide;
        drawingcontext.lineCap = "round";

        //easiest to use radius as that of an inscribed circle
        // thus just back off r in both x and y to get upper left corner
        drawingcontext.strokeRect(things[n][7]-r, things[n][8]-r, 2*r, 2*r);
   }


   drawingcontext.strokeStyle ="green";
   drawingcontext.font = "12pt monospaced";
   if(BW==1){drawingcontext.fillStyle = "#000";}
   else     {drawingcontext.fillStyle = "#fff";}

   var text = document.getElementById("pickID");
   pickID.innerHTML = (pointID);
   var dist = Math.round(distance*1000)/1000;
   var text = document.getElementById("distID");
   distID.innerHTML = (dist);
   if(LmeasuresOn)
   {
      var angl = Math.round(angle*1000)/1000;
      var text = document.getElementById("angleID");
      var dhdl = Math.round(dihedral*1000)/1000;
      var text = document.getElementById("dhdrlID");
   }
   else
   {
      angl = " ";
      dhdl = " ";
   }
   angleID.innerHTML = (angl);
   dhdrlID.innerHTML = (dhdl);
   
   //Draw text info into drawArea using ancient stroked text
   //var ptID = "";
   //ptID = pointID.toString();
   //cycles = cycles + 1;
   //CanvasTextFunctions.enable(drawingcontext);
   //drawingcontext.drawTextRight("12pt monospaced",50,400,790,ptID);
   //drawingcontext.drawTextRight("12pt monospaced",32,790,790,dist.toString());  
   //drawingcontext.drawTextRight("12pt monospaced",32,600,790,cycles.toString());   
 
   var zoomer = 100+zoom;
   var zoomrd = Math.round(zoom);
   var fudge0 = 2.0;
   var fudge1 = 1.0 + Number(zoom);
   var zoomone = (100+100*Math.log(fudge0));
   drawingcontext.beginPath();
   drawingcontext.arc(100+100*Math.log(fudge1), 790, 10+2*zoom, 0, 2*Math.PI, false);
   drawingcontext.arc(zoomone, 790, 5, 0, 2*Math.PI, false);
   drawingcontext.closePath();
   drawingcontext.lineWidth = 2;
   drawingcontext.stroke();
   var temp = document.getElementById("zoomin")
   temp.value = zoom;  

  }//full rotation calculations 
  LmovingCursor = false; //always clear

  globalCompositeOperation = "source-over";

  context.clearRect(0,0,width,height); //clear onscreen canvas

  context.drawImage(drawingcanvas, 1, 1); //keep black border

  if(LCursorOn)
  {
     drawCursor(grup,sgrp,list,pont); //to CURSORcanvas
     context.drawImage(CURSORcanvas, 0, 0);
  }
  //canvas is now complete for this pass

  if(LautoRockOn)
  {//make a series of ImageData frames for later flipping through

    if(rockcycle == 0 && Lnewrock)
    {//write an Image for this step
//aaronmt.posterous.com/html5-canvasgetimagedata-and-the-nefarious
//    try 
//    {
//       var thisImage = context.getImageData(x, y, this.width, this.height);
//    } 
//    catch(e) 
//    {
//       netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
//       var thisImage = context.getImageData(x, y, this.width, this.height);
//    }

//In Firefox, type "about:config" into your address bar. Then use the search field to search //for "security.fileuri.strict_origin_policy". Double click this to set it to "false".

        var thisImage = context.getImageData(1, 1, 800, 800);
        rockImage[rockstepNum] = thisImage;
     }
  }
  Lanimate = false;
}//drawkin

function resetRock(LautoRockOn) //called by ev_autoRock(ev)
{
   if(LautoRockOn)
   {
      {/*reset current rocked state to current rotation matrix*/
         r11 = a11; r12 = a12; r13 = a13;
         r21 = a21; r22 = a22; r23 = a23;
         r31 = a31; r32 = a32; r33 = a33;
      }
      {/*archive current rotation matrix*/
         d11 = a11; d12 = a12; d13 = a13;
         d21 = a21; d22 = a22; d23 = a23;
         d31 = a31; d32 = a32; d33 = a33;
      }
      Lnewrock = 1; /*autorock to restart smoothly from mouse setting*/
   }
   else
   {
      {/*restore current rotation matrix from archive*/
         a11 = d11; a12 = d12; a13 = d13;
         a21 = d21; a22 = d22; a23 = d23;
         a31 = d31; a32 = d32; a33 = d33;
      }
   }
}//resetRock

function actualRock(LautoRockOn) //called by interval timer
{  
   if(Lrockpositive && rockstepNum < rockstepMAX) 
   {
      Lrockpositive = true; 
      rockstepNum++; 
   }
   else if(Lrockpositive)
   {/*reached end going positive*/
      Lrockpositive = false; //change
      rockstepNum = rockstepMAX //extra interval at MAX 
   }
   else if(!Lrockpositive && rockstepNum > 0) 
   {
      Lrockpositive = false;
      rockstepNum--;  
   }
   else if(!Lrockpositive)
   {/*reached end of going negative*/
      Lrockpositive = true; //change
      rockstepNum = 0; //extra interval at MAX 
   }
   context.putImageData(rockImage[rockstepNum], 1, 1);   

   var date = new Date();
   time = date.getTime();
   deltime = time -timeold;
   timeold = time;
}

function adjustrock() //called by startRocker
{//adjustrock
   // For a newrock, adjustrock called to do one sweep across rock extent 
   // drawkin routines used to make a set of ImageData shots
   // as fast as they can be drawn on present system
   // Then use interval timer to cycle through these images

   //globals remember settings for successive cyles
   rockextent = 0;
   rockstepsize = 0;
   rockstep = 0;
   rockmin = -6;
   rockmax = +6;
   rocknumsteps = 6;
   rockstepNum = 0; //global, track one whole cycle
   rockcycle = 0;

   rockextent = rockmax - rockmin; //stay < +- 90 so sign of sin cheat OK
   rockstepsize = rockextent/rocknumsteps;
   rockstep = rockstepsize;

   //rockstepsize is in degrees, getrot expects delta x-position numbers
   //this should be scaled by effective screen size and zoom level
   //as well as projection of effective motion cycle and postion in cycle

   // sin and cos of current delta angle of this axis 
   var rockangle = 0;
   Lrockpositive = true;
   
   sinrockang = Math.sin(2*3.14159*rockstep/360); //global, set + or -
   cosrockang = Math.cos(2*3.14159*rockstep/360); // + for + and - step
   //cos positive, sin +- for del angle < +- 90
   
   rockstepNum = 0;
   rockangle = rockmin;
   var delang = 0;
   if(rockangle < 0) {delang = rockangle;} //move to rockmin for initial step 

   while(rockangle <= rockmax)
   {//while make one set of ImageData shots
      
     sinrockang = Math.sin(2*3.14159*delang/360); //global, set + or -
     cosrockang = Math.cos(2*3.14159*delang/360); // + for + and - step

    {                                                                        
      r11 = (a11*cosrockang + a13*sinrockang);
      r12 = a12;
      r13 = (a11*(-sinrockang) + a13*cosrockang);
      r21 = (a21*cosrockang + a23*sinrockang);
      r22 = a22;
      r23 = (a21*(-sinrockang) + a23*cosrockang);
      r31 = (a31*cosrockang + a33*sinrockang);
      r32 = a32;
      r33 = (a31*(-sinrockang) + a33*cosrockang);
    }
      //reset working Matrix a...
    {
      a11 = r11; a12 = r12; a13 = r13;
      a21 = r21; a22 = r22; a23 = r23;
      a31 = r31; a32 = r32; a33 = r33;
    }
      if(rockstep < 0 ){rockstep = -rockstep;} //go in plus direction
      var date = new Date();
      time = date.getTime();
      deltime = time -timeold;
      timeold = time;
      
      rockstepMAX = rockstepNum;

      delang = rockstep;
      rockangle = rockangle + rockstep;
      drawkin();
      rockstepNum++; //index ImageData frames
   }//while make one set of ImageData shots

   Lnewrock = 0;
   startRocker();
}//adjustrock

function  startRocker()
{
   // var rocksteptime = 200; //40 msec i.e. 24 frames/sec
    myinterval = window.setInterval("doAutoRock()", 200); //calls actualRock
}

function stopRocker()
{
    window.clearInterval(myinterval); 
}

function autoRockToggle()
{
     LautoRockOn = !LautoRockOn; 
     var temp = document.getElementById("rocker");

     resetRock(LautoRockOn);
     if(LautoRockOn) 
     {
        temp.value = "ROCKING";    
        Lnewrock = true;
        adjustrock();    //startRocker();
     }
     else 
     {
        temp.value = "(rock)";
        stopRocker();
     }
}

function animateSettor() 
{
   var cycle = 0;
   var nold = -1;
   var nactive = -1;

   for(cycle = 0; cycle <3; cycle++)
   {//cycles
      for(Ng = 1; Ng < grup.length; Ng++)
      {//grups
         if(Ng == nactive)
         {
            break;
         } 
         else if(grup[Ng][3] == 1) 
         {//animate group
            if(grup[Ng][0] == 1)  //ON
            {//ON, turn OFF and hope for adjust button check
               grup[Ng][0] = 0;
               nold = Ng;
            }
            else if(grup[Ng][0] == 0 && nold > 0)
            {//first off group since started turning ONs to OFF
               grup[Ng][0] = 1; //turn ON
               nactive = Ng;
               nold = -1; 
            }
            else if(grup[Ng][0] == 0 && cycle==2)
            {
                grup[Ng][0] = 1; //turn ON
                nactive = Ng;
                break;
            }
         }//animate group
      }//grups
      if(nactive > 0)
      {
         break;
      } 
   }//cycles
   Lanimate = false;
   resetBUTTONSFromOnOff();
}
