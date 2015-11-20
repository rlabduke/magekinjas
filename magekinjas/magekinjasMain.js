//magekinjasMain.js 20141203
//alert('20141203 clear alert by OK or return key');
  var LreplaceKin = true;
  var CURSOR = 2048;
  var CURSORgrup = 0;
  var LCursorOn = false;
  var LmovingCursor = false; 
  var xcursor = 0; ycursor = 0;
  var Lpicked = false;
  var Lpickon = false;
  var LmarkersOn = false;
  var LmeasuresOn = false;
  var Nmeasure = 0;
  var Lanimate = false;
  var pickerr = 10;
  var pickerrenhance = 5;
  var pickregion = 0;
  var xpick=0; ypick=0;
  var x2Datmpicked=0; 
  var y2Datmpicked=0;
  var z2Datmpicked=0;
  var xoff=0; yoff=0;
  var pickindex = -1;
  var distance = 0;
  var angle = 0;
  var dihedral = 0;
  var cP = new Array();//colorP

  var Lthinline = false;
  var Lonewidth = false;
  var Ldetail = true;


 var IsiPhoneOS = false;
 var IsiPhone = navigator.userAgent.indexOf("iPhone") != -1 ;
 var IsiPod = navigator.userAgent.indexOf("iPod") != -1 ;
 var IsiPad = navigator.userAgent.indexOf("iPad") != -1 ;
 var IsMac = navigator.userAgent.indexOf("Macintosh") != -1 ;
 var IsAndroid = navigator.userAgent.indexOf("Android") != -1 ;

   var timeold = 0;
   var time = 0;
   var deltime = 0;

  var r11=1,r12=0,r13=0,r21=0,r22=1,r32=0,r31=0,r32=0,r33=1;
  var Lnewrock = 0;
  var rockangle = 0;
  var Lrockpositive = true;
  var cycles = 0;
  
  var delta = 0;
  var deltaold = 0;
  var bkgtool = 'WhtBkg';
  var bkgtool_default = 'WhtBkg';
  var viewvalue = 1;
  var viewvalue_default = 1;
  var marknumber = 1;
  var marknumber_default = 1;
  var BW = 1;
  var LautoRockOn = false;
  var myinterval ="";
  var LPickCtrOn = false;
  var xctr=0; yctr=0; zctr=0;

  var RAWSIZE = 800;
  var canvas;
  var context;
  var drawingcanvas;
  var drawingcontext;
  var CURSORcanvas;
  var CURSORcontext;
  var canvasGeom; 
  var width=0; height=0;
  var Lmousedown = false;
  var mouseMode = 0; /* 0: xy, 1: z */ 
  var scalekin = 1.0;
  var zoom = 1.0;
  var zoomMin = 0.1;
  var zoomMax = 50.0;
  var dampen = 1.0; //finger motion
  var xold=0; 
  var yold=0;
  var x2old=0; 
  var y2old=0;

  var touchdownx=0; touchdowny=0; touchupx=0; touchupy=0;
  var touchdowntime=0; touchuptime=0; gesturetime=0; movetime=0;

  var xscrn=0; yscrn=0; zscrn=0; //screen ctr


  var NBins = 500;
  var Zdepth = new Array(NBins);
  var ZBinthick = 0;
  var ZRange = 0;
  var zclipDefault = RAWSIZE/2; //reconcile with zscrn below
  var zclip = zclipDefault;
  var zlimit = zclip; //zclip or default when zclip ==0
  var zclipMin = 0;
  var zclipMax = RAWSIZE;

 //setConditions
  var pointID = undefined;
  var oldptx = null;
  var oldpty = null;
  var oldptz = null;
  var newptx = null;
  var newpty = null;
  var newptz = null;

  var Nanimate = 0; //counter for number of animate groups
//  var NG=0, NS=0, NL=0, NP=0, NV=0; // working indices

//assign global storage now, later use function clearKinemage()
  var grup = new Array(); //similar to Mage linked lists
  var sgrp = new Array(); //all levels are continuous
  var list = new Array(); //with connections to appropriate subsets
  var pont = new Array(); //to simulate a hierarchy using simple arrays
  var grupID = new Array(); //everything else can be coded or flagged
  var sgrpID = new Array();
  var listID = new Array();
  var pontID = new Array();

  var view = new Array();   //20101230
  var viewID = new Array(); //20101230

  var masters = new Array();   //20101230
  var mastersID = new Array(); //20101230

  var Sn = new Array();

window.onload = function()
{
  IsiPhoneOS = IsiPhone || IsiPad || IsiPod ; 
  if(IsMac) {delay = 10; pickerrenhance = 10; xoff=0; yoff=0; xdrawCorner=0; ydrawCorner=0;}
  else if(IsiPad)  {delay = 100; pickerrenhance = 100; xoff=0; yoff=0; xdrawCorner=21; ydrawCorner=175;}
  else if(IsiPhone){delay = 100; pickerrenhance = 100; xoff=0; yoff=0; xdrawCorner=21; ydrawCorner=175;}
  else if(IsAndroid){delay = 100; pickerrenhance = 100; xoff=0; yoff=0; xdrawCorner=21; ydrawCorner=175;}
  else   {delay = 10; pickerrenhance = 10; xoff=0; yoff=0; xdrawCorner=0; ydrawCorner=0;}
 
  pickregion = Math.sqrt(pickerr * pickerrenhance);


  init();
  function init()
  {//init

    canvas = document.getElementById('drawArea');
    context = canvas.getContext('2d');

    if(IsMac) //really need choice between mouse and touch machines
    {
       canvas.addEventListener('mousemove'    , ev_mousemove, true);
       canvas.addEventListener('mousedown'    , ev_mousedown, true);
       canvas.addEventListener('mouseup'      , ev_mouseup,   true);
       //alert('got mousers');
    }
    else
    {
       canvas.addEventListener("touchstart"   , touchHandler, true);
       canvas.addEventListener("touchmove"    , touchHandler, true);
       canvas.addEventListener("touchend"     , touchHandler, true);
       canvas.addEventListener("touchcancel"  , touchHandler, true);    
    }

    //canvasGeom = canvas.getBoundingClientRect(); //fails on iPhone
    //width = canvas.getBoundingClientRect().width;
    //height = canvas.getBoundingClientRect().height;

    width  = RAWSIZE + 2;//margin
    height = RAWSIZE + 2;
    xscrn = width/2;
    yscrn = height/2;
    zscrn = yscrn;
    zclip = zscrn;
    
    setZclipDepths(zclip); //zlimit,ZBinthick,ZRange

    //mouse and finger on canvas, drawing canvas offscreen
    drawingcanvas = document.createElement("canvas"); //offscreen
    drawingcanvas.width = drawingcanvas.height = RAWSIZE; // Set its size
    drawingcontext = drawingcanvas.getContext('2d');
    //CURSOR canvas added in front to regular canvas    

    CURSORcanvas = document.createElement("canvas"); //offscreen
    CURSORcanvas.width = CURSORcanvas.height = RAWSIZE+2; // Set its size
    CURSORcontext = CURSORcanvas.getContext('2d');

    var activateCursorMove = document.getElementById("cursored");
    activateCursorMove.addEventListener("click", ev_CursorMoveActive, false);

    var zoominput = document.getElementById("zoomin");
    zoominput.addEventListener("change", ev_zoominput, false);

    var zclipinput = document.getElementById("zclipin");
    zclipinput.addEventListener("change", ev_zclipinput, false);

    var viewtool_select = document.getElementById('viewtool');
    //viewtool_select : [object HTMLSelectElement] is "this" in event handler
    viewtool_select.addEventListener('change', ev_viewtool_change, false);
    viewtool_select.value = viewvalue_default;

    var bkgtool_select = document.getElementById('bkgtool');
    bkgtool_select.addEventListener('change', ev_bkgtool_change, false);
    bkgtool_select.value = bkgtool_default;

    var activatePickCtr = document.getElementById("pickctr");
    activatePickCtr.addEventListener("click", ev_PickCtrActive, false);

    var marktool_select = document.getElementById('marktool');
    marktool_select.addEventListener('change', ev_marktool_change, false);
    marktool_select.value = marknumber_default;

    var animate = document.getElementById("animate");
    animate.addEventListener("click", ev_animate, false);

    var kintool_select = document.getElementById('kintool'); //110205
    //kintool_select : [object HTMLSelectElement] is "this" in event handler
    kintool_select.addEventListener('change', ev_kintool_change, false);
    //choices are hard coded in html file
//    kintool_select.value = kinvalue_default;
    kinvalue = kintool_select.value;


    var testor = document.getElementById("testbutton");     //110205
    testor.addEventListener("click", ev_testbutton, false);

    var onoffs = document.getElementById("onoff");
    onoffs.addEventListener("click", ev_button, false);


    rockEventor();

   

var corner = canvas.getBoundingClientRect();
var parent = canvas.offsetParent;
var offsetx = parent.offsetLeft;
var offsety = parent.offsetTop;
    //var text = document.getElementById("text");
    //text.innerHTML = ('corner left,top '+corner.left+', '+corner.top+' offset left,top '+offsetx+' , '+offsety );
    ydrawCorner = offsety;
    xdrawCorner = offsetx;
    if(IsiPhoneOS || IsAndroid)
    {
       yoff = offsety;
       xoff = offsetx;
    }


  setupNewKinemage(); //setPalette, setMarkers
//  var Sn = new Array(" ");
//  var lineizeSn = new Array();
//  lineizeSn = Sn.split('\n');
//  inputVanillaKin(lineizeSn,grup,sgrp,list,pont,view);  //110205 default
  inputVanillaKin(Sn,grup,sgrp,list,pont,view);
  finishNewKin(); //centerNscale == setupData
  adjustKinemage(); //resetButtons, setCursor



    drawkin();

  }//init

  function ev_mousedown (ev)
  {//mousedown

    ev.stopPropagation();
    if(ev.button == 0)
    {//left button
       var x=0, y=0;
       if      (ev.layerX  || ev.layerX  == 0) {x = ev.layerX ; y = ev.layerY ;}
       else if (ev.offsetX || ev.offsetX == 0) {x = ev.offsetX; y = ev.offsetY;}
      
       xold = x;
       yold = y;
       xpick = x;
       ypick = y;
       z2Datmpicked = -9999; //far back
       Lpicked = false;
       pickindex = -1;
       Lpickon = true;
       Ldetail = true;
       if(LautoRockOn) {autoRockToggle();}
       LmovingCursor = false;
          //if(y < (canvasGeom.bottom - canvasGeom.top)/6) 
          //if(y > ydrawCorner+height-50)
          if(y > yoff+height-50)
             {mouseMode = 2;}
          else if(y < (height)/6) 
             {mouseMode = 1;}
          else
             {mouseMode = 0;}
          Lmousedown = true;
      
       drawkin();
    }//left
  }//mousedown

  function ev_mousemove (ev)
  {//mousemove   in document space
    var x =0; 
    var y =0; 
    var delx =0; 
    var dely =0;
    dampen = 1;
    ev.stopPropagation();
    if      (ev.layerX  || ev.layerX  == 0) {x = ev.layerX;  y = ev.layerY ;}
    else if (ev.offsetX || ev.offsetX == 0) {x = ev.offsetX; y = ev.offsetY;}

    delx = x - xold;
    dely = y - yold;
    dely = -dely;
    xold = x;
    yold = y;
    if(delx != 0 || dely != 0)
    {//moved
      if(Lmousedown)
      {
         LmovingCursor = false;
         Lpickon = false;
         pickindex = -1;
         if(mouseMode == 2)
         {zoomAction(-delx);}
         else if(LCursorOn) 
           {moveCURSOR(delx,dely);} //sets LmovingCursor
         else
         {
            Ldetail = false;
            getrotMatrix(delx,dely,mouseMode,dampen);
         }
         drawkin();
      }
    }//moved
  }//mousemove

  function zoomAction(delzoom)
  {
      zoom = zoom - 12*delzoom/RAWSIZE;
      if(zoom < zoomMin) {zoom = zoomMin;}
      else if(zoom > zoomMax) {zoom = zoomMax;}
      drawkin();
  }

  function ev_mouseup (ev)
  {//mouseup
    var x, y;
    ev.stopPropagation();
    if      (ev.layerX  || ev.layerX  == 0) {x = ev.layerX ; y = ev.layerY ;}
    else if (ev.offsetX || ev.offsetX == 0) {x = ev.offsetX; y = ev.offsetY;}

    context.strokeStyle ="black";
    Lmousedown = false;
                 
    if(LCursorOn) 
      {xplace = xcursor+xscrn; yplace = -ycursor+yscrn;}
    else
      {xplace = xpick; yplace = ypick;}

      LmovingCursor = false;

       Lpickon = false;
       if(pickindex >= 0) 
       {
          if(pontID[pickindex]){pointID = pontID[pickindex];}
          var xdata =  Math.round(x2Datmpicked);
          var ydata =  Math.round(y2Datmpicked);
          var zdata =  Math.round(z2Datmpicked);
          var xadd =  xdata+xoff;
          var yadd =  ydata+yoff;
          Ldetail = true;
          drawkin();
       }
       else if(!Ldetail)
       {
          Ldetail = true;
          drawkin();
       }
  }//mouseup

  function touchHandler(event)
  {//touchHandler
    event.preventDefault();
    var date = new Date();
    pickerrenhance = 100;
    var x=0; y=0; x2=0; y2=0;
    var touches = event.changedTouches;
    var first  = touches[0];
    var second = touches[1];
    var type = "";
    x = first.pageX;
    y = first.pageY;
    if(second) x2 = second.pageX;
    if(second) y2 = second.pageY;
    var Lfirst = true;
    var Lsecond = true;
    if(first) {Lfirst = true;} else {Lfirst = false;}
    if(second) {Lsecond = true;} else {Lsecond = false;}

    if(event.type == "touchstart")
    {//like mousedown
       xold = x;
       yold = y;
       xpick = x;
       ypick = y;
       z2Datmpicked = -9999; //far back
       Lpicked = false;
       pickindex = -1;
       Lpickon = true;
       LmovingCursor = false;   
       Ldetail = true;
       if(LautoRockOn) {autoRockToggle();}

       deltaold = 0;  //reset to force gesture to have one dummy cycle

       if(y > yoff+height-50) {mouseMode = 2;}
       else if(y < (height)/3) {mouseMode = 1;}
       else {mouseMode = 0;}
       touchdownx = x;
       touchdowny = y;
       touchdowntime = date.getTime();
       //drawkin(); only draw on touch up or touchmove
    }//much like mousedown


    else if(event.type == "touchmove")
    {
       var delx =0; 
       var dely =0;
       dampen = 1;
       if( (Math.abs(x - xold) < 100) && (Math.abs(y - yold) < 100) )
       {//avoid big jumps, maybe next event will have settled down
          delx = x - xold;
          dely = y - yold;
          dely = -dely;
       }
       xold = x;
       yold = y;
       LmovingCursor = false;

       if((delx != 0 || dely != 0))
       {//touch has moved
          dampen = 1;

          if(Lfirst && Lsecond)
          {//pseudo gesture
             //inhibit period and 2nd touch detection
             gesturetime = date.getTime();
             if(  (gesturetime > touchuptime + delay)
                &&(x2 != 0 && y2 != 0) 
               ) 
             {//OK to gesture

                delta = Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y));

                if(deltaold > 0 && delta > 0 && delta < RAWSIZE) 
                //deltaold 0 dummy cycle
                {//both first and second touch changed
                  // if(delta >= deltaold) 
                  // {
                  //    scaly = 1 + (delta - deltaold)/RAWSIZE;
                  // }
                  // else if(delta < deltaold)
                  // {
                  //    scaly = 1 - (deltaold - delta)/RAWSIZE;
                  // }
                   scaly = 1 + (delta - deltaold)/RAWSIZE;
                   zoom = scaly * zoom;
                   if(zoom < zoomMin) {zoom = zoomMin;}
                   else if(zoom > zoomMax) {zoom = zoomMax;}

                   drawkin();
                }
                deltaold = delta;
             }//OK to gesture
          }//pseudo gesture
          else /* ONE TOUCH MOVE */
          {//only one touch
             //inhibit period and 2nd touch detection
             movetime = date.getTime();

             if(  (movetime > (touchuptime + delay))
                &&(movetime > (gesturetime + delay))
                &&(x2 == 0 && y2 == 0) 
                &&(delx < 100 && dely < 100) 
               ) 
             {//OK to move
                if(mouseMode == 2) 
                   { zoomAction(-delx); }
                else if(LCursorOn) 
                   { moveCURSOR(delx,dely);} //sets LmovingCursor
                else
                {
                   Ldetail = false;
                   //reset global matrix elements a11,...,a33
                   getrotMatrix(delx,dely,mouseMode,dampen);                 }
                Lpickon = false;
                drawkin();
             }//OK to move
          }//only one touch
       }//touch has moved
    }//much like mousemove with mousedown still true


    else if(event.type == "touchend" || event.type == "touchcancel")
    {//like mouseup 
       mouseMode = 0;
       touchupx = x;
       touchupy = y;
       touchuptime = date.getTime();

      Ldetail = true;
      LmovingCursor = false;                 
    if(LCursorOn) 
      {xplace = xcursor+xscrn; yplace = -ycursor+yscrn;}
    else
      {xplace = xpick; yplace = ypick;}

       if(  (Math.abs(touchdownx - touchupx) < 2)
          &&(Math.abs(touchdowny - touchupy) < 2)
          &&(Math.abs(touchdowntime - touchuptime) < 100) ) //tenth second
       {//true tap of the finger, maybe too sensitive!
          Lpickon = true;
          drawkin(); //and maybe never get back to this routine????
       }

       Lpickon = false;
       if(pickindex >= 0) 
       {
          if(pontID[pickindex]){pointID = pontID[pickindex];}
          var xdata =  Math.round(x2Datmpicked);
          var ydata =  Math.round(y2Datmpicked);
          var zdata =  Math.round(z2Datmpicked);
          var xadd =  xdata+xoff;
          var yadd =  ydata+yoff;
          Ldetail = true;
          drawkin();
       }
       if(!Ldetail)
       {
          Ldetail = true;
          drawkin();
       }
    }//like mouseup
  }//touchHandler

  function ev_CursorMoveActive (ev)
  {
     LCursorOn = !LCursorOn;
     var temp = document.getElementById("cursored")
     if(LCursorOn) {temp.value = "CURSOR";} //for next pick 
     else {temp.value = "(cursor)";}
     drawkin();
  }

  function ev_zoominput (ev)
  {
     var temp = document.getElementById("zoomin")
     zoom = temp.value;  
     if(zoom < zoomMin) {zoom = zoomMin;}
     else if(zoom > zoomMax) {zoom = zoomMax;}
     drawkin();
  }

  function ev_zclipinput (ev)
  {
     var temp = document.getElementById("zclipin")
     zclip = temp.value;  
     setZclipDepths(zclip);
     drawkin();
  }

  function ev_viewtool_change (ev)
  {
    viewvalue = this.value; 
    // "this" : [object HTMLSelectElement], viewtool_select not referable here
    changeView(viewvalue);
//alert('viewvalue: '+viewvalue);

    drawkin();
  }

  function ev_bkgtool_change (ev)
  {
    bkgtool = this.value; 
    if(     bkgtool == 'BlkBkg') {BW = 0;}
    else if(bkgtool == 'WhtBkg') {BW = 1;}
    drawkin();
  }

  function ev_PickCtrActive (ev)
  {
     LPickCtrOn = !LPickCtrOn;
     var temp = document.getElementById("pickctr")
     if(LPickCtrOn) {temp.value = "loaded";} 
     else {temp.value = "pick center";}
  }

  function ev_marktool_change (ev)
  {
    marknumber = this.value; //string??
    changeMark(marknumber);
    drawkin();
  }

  function ev_animate (ev)
  {
     Lanimate = true;
     animateSettor();
     drawkin();
  }

  function ev_kintool_change (ev)  //110205
  {
    kinvalue = this.value; 
    // "this" : [object HTMLSelectElement], kintool_select not referable here
    changeView(kinvalue);
//alert('kinvalue: '+kinvalue);
    drawkin();
  }

  function ev_testbutton (ev) //ACTIVATE ONE SHOT TEST 110205
  {//testbutton == DOWNLOAD
    var filename = "/kinemage/magekinjas/"+kinvalue;

    //http://www.javascripter.net/faq/xmlhttpr.htm

//      alert('+self.location.hostname '+self.location.hostname);
//      alert('+filename '+filename);
//      alert('request: URL filename '+self.location.hostname+filename);

    var oRequest = new XMLHttpRequest();
    var sURL  = "http://"+self.location.hostname+filename;

    //oRequest.open("GET",sURL,false); NOT async
    oRequest.open("GET",sURL,true); //async
    //oRequest.setRequestHeader("User-Agent",navigator.userAgent);


   oRequest.onreadystatechange = function() 
   { // Define event listener
      // If the request is compete and was successful
      if (oRequest.readyState === 4 && oRequest.status === 200) 
      {
         var type = oRequest.getResponseHeader("Content-Type");

//alert('response type== '+type);
      //DESIRED: response type== text/plain
      //WEBSITE: response type== application/octet-stream
      //which seems to be the default if type is not determined, still could be text

//so for now jumper out the test and cross fingers 20141203
//         if (type.match(/^text/)) // Make sure response is text
         {
            importKinemage(oRequest.responseText); // Pass it to callback

         }
      }
   };
   oRequest.send(null);
  }//testbutton

   function importKinemage(stuff)
   {
//alert(stuff);
        var NEWin = new Array();
        //NEWin = oRequest.responseText.split('\n');
        NEWin = stuff.split('\n');
//alert('A grup sgrp list pont view '+grup.length+', '+sgrp.length+', '+list.length+', '+pont.length+', '+view.length);

        if(LreplaceKin)
        {
          clearKinemage();
          setupNewKinemage();
        }
//alert('A grup sgrp list pont view '+grup.length+', '+sgrp.length+', '+list.length+', '+pont.length+', '+view.length);

        inputVanillaKin(NEWin,grup,sgrp,list,pont,view);  //110205
//alert('Z grup sgrp list pont view '+grup.length+', '+sgrp.length+', '+list.length+', '+pont.length+', '+view.length);
        if(LreplaceKin)
        {
           finishNewKin();
        }
        adjustKinemage();
        drawkin();

   }


//    if (oRequest.status==200)
//    {
      // alert(oRequest.responseText);
//
//    }
//    else 
//    {
//      alert("Error executing XMLHttpRequest call!");
//    }


  function rockEventor()
  {
     var autoRock = document.getElementById("rocker");
     autoRock.addEventListener("click", ev_autoRock, false);
  }

  function ev_autoRock(ev)
  {//40 msec i.e. 24 frames/sec
     autoRockToggle();
  }

}//window.onloaded

