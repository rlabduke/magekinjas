function clearKinemage()
{
  grup.length = 0;
  sgrp.length =  0;
  list.length =  0;
  pont.length =  0;
  grupID.length =  0;
  sgrpID.length =  0;
  listID.length =  0;
  pontID.length =  0;
  view.length =  0;
  viewID.length =  0;
  masters.length =  0;
  mastersID.length =  0;
  removeBUTTONS();
}

function setupNewKinemage()
{
  setPalette(cP);
  setMarkers(grup,sgrp,list,pont);
}


function finishNewKin()
{
    getrotMatrix(0,0,-1,1); //(dx,dy,Mode,dampen) Mode-1 initialize
    if(view.length > 0) {changeView(1);}
    setupData();
}

function adjustKinemage()
{
  resetBUTTONSFromOnOff();
  setCursor(grup,sgrp,list,pont);
  if(Lanimate) {animateSettor();}
}


    function setupData()
    {
     var minx=9999.0; maxx=-9999.0; miny=9999.0; maxy=-9999.0; minz=9999.0; maxz=-9999.0; 
     var numpoints = 0;
     xctr = 0.0; yctr = 0.0; zctr = 0.0;
     extentx = 0.0;
     extenty = 0.0;
     extentz = 0.0;
     extentmax = 0.0;
     if(grup && grup.length)
     {
//alert('setupData grup n== '+grup.length+', sgrp n== '+sgrp.length+', list n== '+list.length+', pont n== '+pont.length);
       if(grup[1])
       {
          for(var MG=1; MG < grup.length; MG++) //marker in 0
          {
//alert('grupID['+MG+'] '+grupID[MG]);
             if(grup[MG][3]) {Lanimate = true;}
             for(var MS = grup[MG][1] ; MS <= grup[MG][2] ; MS++)
             {
//alert('sgrpID['+MS+'] '+sgrpID[MS]);
                for(var ML = sgrp[MS][1] ; ML <= sgrp[MS][2] ; ML++)
                {
//alert('listID['+ML+'] '+listID[ML]);
                  if(list[ML][6] != CURSOR)
                  {
                    for(var MP = list[ML][1] ; MP <= list[ML][2] ; MP++)
                    {
//alert('pontID['+MP+'] == '+pontID[MP]);
                      if(pont[MP][1] < minx){minx = pont[MP][1];}
                      if(pont[MP][1] > maxx){maxx = pont[MP][1];}
                      if(pont[MP][2] < miny){miny = pont[MP][2];}
                      if(pont[MP][2] > maxy){maxy = pont[MP][2];}
                      if(pont[MP][3] < minz){minz = pont[MP][3];}
                      if(pont[MP][3] > maxz){maxz = pont[MP][3];}
                      numpoints++;
                    }//scan over points
                  }
                }
             }
          }
          var sumx = 0.0;
          var sumy = 0.0;
          var sumz = 0.0;
          sumx = Number(maxx)+Number(minx);
          sumy = Number(maxy)+Number(miny);
          sumz = Number(maxz)+Number(minz);

          xctr = sumx/2.0;
          yctr = sumy/2.0;
          zctr = sumz/2.0;

          extentx = maxx - minx;
          extenty = maxy - miny;
          extentz = maxz - minz;
          if(extentx > extenty) {extentmax = extentx;}
          else {extentmax = extenty;}
          if(extentz > extentmax) {extentmax = extentz;}
          scalekin = 0.7*RAWSIZE/extentmax;
       }
     }
//alert('setupData sets scalekin== '+scalekin+', for numpoints== '+numpoints);
    }

function resetConditions()
{
  var pointID = undefined;
  var oldptx = null;
  var oldpty = null;
  var oldptz = null;
  var newptx = null;
  var newpty = null;
  var newptz = null;

}

function inputVanillaKin(FILEin,grup,sgrp,list,pont,view)  //110205
{//inputVanillaKin

//alert('Begin: FILEin: '+FILEin.length+', grup: '+grup.length+', sgrp: '+sgrp.length+', list: '+list.length+', pont: '+pont.length+', view: '+view.length+', masters: '+masters.length);


   var LGdominated = false;
   var LSdominated = false;
   var SetType = 1; //1,2,3 grup,sgrp,list for buttons
 
  var flowSW = 0; //flow SWitch

  var neutSW = 1;
  var keywSW = 2;
  var grupSW = 3;
  var sgrpSW = 4;
  var listSW = 5;
  var pontSW = 6;
  var matrSW = 7;
  var viewSW = 8;
  var zoomSW = 9;
  var centerSW = 10;
  var zclipSW = 11;

  var vectorlist = 1;
  var balllist = 2;
  var marklist = 3;
  var subgroup = 4;
  var group = 5;
  var matrix = 6;
  var center = 7;
  var zoom = 8;
  var zslab = 9;
  var viewid = 10;
  var ribbonlist = 11;
  var ignore = 12;
  var dotlist = 13;
  var Lignore = false; //recognized section not able to be interpreted

  var NUMKEY = 0;
  var newView = -1;
  var NewGrupSgrpList = 0;
  var ListStart = true; //enforce moveTo
  var ListType = vectorlist; 

  var Lidn = 0;
  var Itype = 0;
  var Ix = 0;
  var Iy = 0;
  var Iz = 0;
  var j = 0;
  var point = new Array();
  var pointID = new Array();
  var nameID = new Array();
  var N = 0;
          
  var NG=0, NS=0, NL=0, NP=0, NV=0; // working indices

//  inputLoop: while( FILEin[N] ) //110205
  inputLoop: while( N < FILEin.length ) //110209
  {//input line by line, N lines
//alert('FILEin['+N+'] '+FILEin[N]);
     if(FILEin[N][0] == "@") {flowSW = keywSW;}
     else if(FILEin[N][0] == "{" || FILEin[N][0] == "P" ) {flowSW = pontSW;}
     else {N++; continue inputLoop;}
//alert(' flowSW== '+flowSW+', Lignore '+Lignore);
     var Line = FILEin[N];

     switchLoop: switch(flowSW)
     {//switch switchLoop


        case pontSW:  //uses common variables for each entry
           if(Lignore) {N++; continue inputLoop;} //can't interpret these points
           var i = 0; //beginning of Line
           var moveTo = 256;
           var drawTo = 1;
           var dot = 2;
           var ball = 4;
           var mark = 8192;
           var nameID = undefined;
           var type = undefined;
           var color = undefined;
           var colorcode = 0;
           var radius = undefined;
           var coord = new Array(); //to have x,y,z length=3
           var count = 0; //of coord inputed so far...

           var LOK = true; //status so far...

           var typeLook = 1;
           var colrLook = 2;
           var radiLook = 3;
           var cordLook = 4;
           var nmbrLook = 5;
           var fullLook = 6;

           //Magekinjas as of 20110105 requires pointID brackets
           if(Line[0] == "{") //}  20110113
           {
              var result = new Array();
              result[0] = 0;
              result[1] = undefined;
              result[2] = undefined;

              result = parseIdentifier(i,Line);

              if(result[1]) 
              {
                 nameID = result[1];
                 i = result[0]; //position in Line
                 i++; //set to look at next character
              }
              else continue inputLoop;//identifier failed
           }

             //look for Parameters
//alert(N+'th Line== '+Line);
             mode = typeLook;
             while(i < Line.length)
             {//Loop items of a point Line
                //i++; //look at next character
                if(mode==typeLook)
                {

                  if(ListType == balllist){type = ball;}
                  else if(ListType == dotlist){type = dot;}
                  else if(ListType == marklist){type = mark;}
                  else if(ListType == vectorlist || ListType == ribbonlist)
                  { //ribbon degrades to vectorlist
                    if(ListStart){type = moveTo;} else {type = drawTo;} //defaults

                    if(Line[i] == ' '||Line[i] == ',') {i++;} 
                    else if(Line[i]=='P'&&(Line[i+1]==' '||Line[i+1]==',')) {type = moveTo; i++;}
                    else if(Line[i]=='B'&&(Line[i+1]==' '||Line[i+1]==',')) {type = ball; i++;}
                    else if(Line[i]=='L'&&(Line[i+1]==' '||Line[i+1]==',')) {type = drawTo; i++;}
                    else if(Line[i]=='X'&&(Line[i+1]==' '||Line[i+1]==',')) {type = mark; i++;}
                  }
                   if(Line[i] == ' '||Line[i] == ',') {i++;} 
                   if(Line[i]=='r'&&(Line[i+1]=='=')) {mode = radiLook; i++; i++;}             
                   else if(isAdigit(Line[i])) {mode = cordLook;} //stay at i
                   else if(isAnAlph(Line[i])) {mode = colrLook;} //stay at i
                   else {mode = fullLook;}

                   if(type) {mode = fullLook;}
                }
//alert(' mode '+mode+', count '+count);
                if(mode==fullLook) //not specifically known yet what to expect next
                {
                   if(Line[i] == ' ' || Line[i] == ' ,') {i++;} //leading white space
                   else if(isAdigit(Line[i])) {mode = cordLook;}
                   else if(isAnAlph(Line[i])) {mode = colrLook;}
                }  
                if(mode==radiLook)
                {//enter with index that should be start of a radius value
                   var result = new Array();
                   result[0] = 0;
                   result[1] = undefined;
                   result[2] = undefined;
                   result = parseNumber(i,Line);
                   i = result[0]; //
                   if(result[1] != undefined)
                   {
                      radius = Number(result[1]);
                   }
                   mode = fullLook;
                }
                if(mode==colrLook) //overloaded to find width#
                {
                   var result = new Array();
                   result[0] = 0;
                   result[1] = undefined;
                   result[2] = undefined;
                   result = parseString(i,Line);
                   i = result[0];
                   if(result[2])
                   {//see if a width
                      if(result[1].localeCompare("width") )
                      {
                         radius = Number(result[2]);
                      }
                   }
                   else if(result[1])
                   {
                      color = result[1];
                      colorcode = numberofcolor(color); //crib from MAGECOLR.c
                   }
                   i++; //start looking again at next index
                   mode = fullLook;
                }
                if(mode==cordLook && count < 3)
                {//cordLook to read x,y,z coords
//alert('x,y,z count: '+count+', Line '+Line);
                   if(Line[i] == ' ' || Line[i] == ' ,') {i++;} //leading white space
                   var result = new Array();
                   result[0] = 0;
                   result[1] = undefined;
                   result[2] = undefined;
//var iold = i;
                   result = parseNumber(i,Line);
                   i = result[0];
//var inew = i;
//alert('x,y,z resulting number: '+result[1]+', in field char# '+iold+', '+inew);

                   if(result[1] != undefined)
                   {//read a coordinate value
                      coord[count] = result[1];

//alert('x,y,z coord['+count+']: '+coord[count]);

                      count++;
//alert('x,y,z count --> '+count);
                      if(count==3) //zero level success, not protected from errors
                      {//3 coordinates are in...
                         NP = pont.length; //previous points
                         //if(NP > 0)
                         //{
                         //   NL = pont[NP-1][6];
                         //}
                         //else {NL = 0;} //dummy list for this test
                         pont[NP] = new Array();
                         pontID[NP] = nameID; 
                         // 6 numbers : type, x, y, z, radius, colorcode
                         if(type == undefined) {type = 1;}
                         pont[NP][0] = type;
                         pont[NP][1] = coord[0];
                         pont[NP][2] = coord[1];
                         pont[NP][3] = coord[2];
                         pont[NP][4] = radius;
                         pont[NP][5] = colorcode;
                         NL = (list.length)-1; //current list
                         pont[NP][6] = NL; //parent list, for radius and color
                         list[NL][2] = NP; //currently the last pont in current list
//alert('x,y,z: pont['+NP+']: '+pont[NP]);
                         //break switchLoop;
                      }//3 coordinates are in...
                   }//read a coordinate value
                   i++; //look for next starting with next index
                }//cordLook to read x,y,z coords
             }//Loop items of a point Line
             ListStart = false; 
//alert(' END OF LINE: GO TO GET NEXT LINE');
        break switchLoop;

        case keywSW:
             var i = 0; //beginning of Line
             while(i < Line.length)
             {//Loop items of a keyword Line
                {//content
                   var result = new Array();
                   result[0] = 0;
                   result[1] = undefined;
                   result[2] = undefined;
                   result = parseKeyword(i,Line);
                   i = result[0]; //index of curent position 
                   if(result[1])
                   {//there is a keyword 
                      FLAG = result[1];
//alert(' keyword FLAG== '+FLAG);
                      if(result[2])
                      {//keyword has a number
                         NUMKEY = result[2];
                      }
                      else if(FLAG > 5 && FLAG < 11)
                      {//view component without start1ng NUMKEY
                         NUMKEY = 1; //first view
                      }
                      i++; //starting index of content
                      var theType;
                      Lignore = false; //optimistic presumption 
                      switchkey: switch(FLAG)
                      {//switchkey
                         case vectorlist:
                            ListType = vectorlist;
                            theType = "VECTOR";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case ribbonlist:
                            ListType = ribbonlist;
                            theType = "RIBBON";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case balllist:
                            ListType = balllist;
                            theType = "BALL";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case dotlist:
                            ListType = dotlist;
                            theType = "DOT";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case marklist:
                            ListType = marklist;
                            theType = "MARK";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case subgroup:
                            theType = "ASGRP";
                            parseFirstline(i,Line,theType);
                         break switchkey;
                         case group:
                            theType = "AGRUP";
                            parseFirstline(i,Line,theType);                         
                         break switchkey;

                         case matrix:
                            var matrixin = new Array();
                            var melement = 0;
                            while(melement < 9)
                            {
                               var result = new Array();
                               result[0] = 0;
                               result[1] = undefined;
                               result[2] = undefined;
                               result = parseNumber(i,Line);
                               if(result[1] != undefined)
                               {
                                  matrixin[melement] = result[1];
                                  melement++;
                                  i = result[0];
                                  i++;
                               }
                               if(melement == 9)
                               {
                                  if(newView != NUMKEY)
                                  {
                                     NV = view.length;
                                     view[NV] = new Array();
                                     newView = NUMKEY; //but NOT using NUMKEY as view number
                                  }
                                  else
                                  {
                                     for(var k=0; k<9; k++)
                                     {
                                        view[NV][k+5] = matrixin[k];
                                     }
                                  }
                               }
                            }
                         break switchkey;
                         case center:
                            var centerin = new Array();
                            var mctr = 0;
                            while(mctr < 3)
                            {
                               var result = new Array();
                               result[0] = 0;
                               result[1] = undefined;
                               result[2] = undefined;

                               result = parseNumber(i,Line);
                               if(result[1] != undefined)
                               {
                                  centerin[mctr] = result[1];
                                  mctr++;
                                  i = result[0];
                                  i++;
                               }
                               if(mctr == 3)
                               {
                                  if(newView != NUMKEY)
                                  {
                                     NV = view.length;
                                     view[NV] = new Array();
                                     newView = NUMKEY; //but NOT using NUMKEY as view number
                                  }
                                  for(var k=0; k<3; k++)
                                  {
                                     view[NV][k+2] = centerin[k];
                                  }
                               }
                            }
                         break switchkey;
                         case zoom:
                            var result = new Array();
                            result[0] = 0;
                            result[1] = undefined;
                            result[2] = undefined;
                            result = parseNumber(i,Line);
                            if(result[1] != undefined)
                            {
                               if(newView != NUMKEY)
                               {
                                  NV = view.length;
                                  view[NV] = new Array();
                                  newView = NUMKEY; //but NOT using NUMKEY as view number
                               }
                               view[NV][0] = Number(result[1]);
                            }
                         break switchkey;
                         case zslab:
                            var result = new Array();
                            result[0] = 0;
                            result[1] = undefined;
                            result[2] = undefined;
                            result = parseNumber(i,Line);
                            if(result[1] != undefined)
                            {
                               if(newView != NUMKEY)
                               {
                                  NV = view.length;
                                  view[NV] = new Array();
                                  newView = NUMKEY; //but NOT using NUMKEY as view number
                               }
                               view[NV][1] = Number(result[1]);
                            }
                         break switchkey;

                         case viewid:

                            var result = new Array();
                            result[0] = 0;
                            result[1] = undefined;
                            result[2] = undefined;
                            result = parseString(i,Line);

                            if(result[1])
                            {
                               if(newView != NUMKEY)
                               {

                                  NV = view.length;
                                  view[NV] = new Array();
                                  newView = NUMKEY; //but NOT using NUMKEY as view number
                               }
                               viewID[NV] = result[1];
//alert(' viewID['+NV+']== '+viewID[NV]);
                            }
                         break switchkey;

                         default:
                            Lignore = true;
                         break switchkey;
                      }//switchkey
                   }//there is a keyword 
                }//content
                i = Line.length; //end while loop
             }//Loop items of a keyword Line
        break switchLoop;
     }//switch switchLoop
     N++;
  }//input line by line, N lines
  if(masters.length)
  {
      Settype = 4; //masters
      for(var NM = 1; NM < masters.length; NM++)
      {
         makeButton(Settype, NM, mastersID[NM]);
      }
  }
//alert('Atend: FILEin: '+FILEin.length+', grup: '+grup.length+', sgrp: '+sgrp.length+', list: '+list.length+', pont: '+pont.length+', view: '+view.length+', masters: '+masters.length+', viewID['+NV+']: '+viewID[NV]);

}//inputVanillaKin

function parseFirstline(index,Line,theType)
{//parseFirstline
   var j = 0;
   var nameID = undefined;
   for(var i=index; i<Line.length; i++)
   {//look for identifier bracket
      if(Line[i] == "{")//}
      {
         var result = new Array();
         result = parseIdentifier(i,Line);
         if(result[1])
         {
            nameID = result[1];
            j = result[0]; //index of last char in nameID
            j++; //next starting index
         }
         break;
      }
   }//look for identifier bracket
   if(!nameID)
   {
      j = index; //start over
   }

   var temp = new Array();
   temp[0] = 1; //default ON
   for(var m=1; m<8; m++) {temp[m] = 0;}
   Lradius = false;
   Lcolor = false;
   Lmaster = false;
   Linstance = false;
   Ninstance = -1; //-1 Not an instance Number

   if(theType == "VECTOR") {temp[6] = 1;}
   else if(theType == "BALL") {temp[6] = 4; temp[4] = 0.2;} //incl default ball size
   else if(theType == "DOT") {temp[6] = 2;}
   else if(theType == "MARK") {temp[6] = 4;}
   else if(theType == "RIBBON") {temp[6] = 97;} 

   for(var i=j; i<Line.length; i++)
   {//look for param
      var param = undefined;
      var result = new Array();
      if(Lradius) {result = parseNumber(i,Line);}
      else if(Lmaster || Linstance) {result = parseIdentifier(i,Line);}
      else {result = parseString(i,Line);}
      if(result[1])
      {
         param = result[1];
         i = result[0]; //index of last char in string fragment
         //i++; //next starting index, for() does this
         
         if(Lradius) {temp[4] = result[1]; Lradius = false;}
         if(Lcolor)  
         {
            temp[5] = numberofcolor(result[1]); 
            Lcolor = false;
         }
         if(Lmaster)
         {
            if(theType=="ASGRP"||theType=="AGRUP"){temp[5] = indexOfMaster(result[1]);}
            else {temp[7] = indexOfMaster(result[1]);}
            Lmaster = false;
         }
         if(Linstance)
         {
//alert('Linstance== '+Linstance+', theType== '+theType);
            if(theType=="AGRUP") //SEARCH GRUP
            {
               Ninstance = indexOfGrup(result[1]);
            }
            else if(theType=="ASGRP") //SEARCH SGRP 
            {
               Ninstance = indexOfSgrp(result[1]);
            }
            else //SEARCH LIST 
            {
               Ninstance = indexOfList(result[1]);
            }
            Linstance = false;
         }
         //list Id ; OnOff , child1, child2, parent3, radius4, color5, type6, master7
         //"off","radius","color","type","master"; possible list attributes
         //sgrpID; OnOff, child1, child2, parent3, dominant4, master5
         //"off","dominant","master"]; //possible sgrp attributes
         //grupID; OnOff, child1, child2, animate3, dominant4, master5
         //"off","animate","dominant","master"]; //possible grup attributes
         //for numeric inputed attributes, value is in next location
       if(param.localeCompare)
       {
         if(!param.localeCompare("off") ) {temp[0] = 0;}
         if(!param.localeCompare("dominant") && (theType=="ASGRP"||theType=="AGRUP")) 
            {temp[4] = 1;}
         if(!param.localeCompare("animate") && (theType=="AGRUP")) 
            {temp[3] = 1;}

         if(!param.localeCompare("radius") ||!param.localeCompare("radius=") ) 
            {Lradius = true;}
         if(!param.localeCompare("color") ||!param.localeCompare("color=") ) 
            {Lcolor = true;}
         if(!param.localeCompare("master") ||!param.localeCompare("master=") ) 
            {Lmaster = true;}
         if(!param.localeCompare("instance") ||!param.localeCompare("instance=") ) 
            {Linstance = true;}

        }
      }//drop through: ignore string fragment
   }//look for param
   //PROBABLY SHOULD HAVE ERROR FILTER HERE
   if(theType=="AGRUP") {establishGroup(nameID,temp,Ninstance);}
   else if(theType=="ASGRP")  {establishSubgroup(nameID,temp,Ninstance);}
   else {establishList(nameID,temp,Ninstance);}
}//parseFirstline

function establishGroup(nameID,temp,Ninstance)
{//group
//alert(' Group== '+nameID);
      LGdominated = false;//reset at every group
      NewGrupSgrpList = 1; //reset at every group
      SetType = 1; //1,2,3 grup,sgrp,list for buttons
      NG = grup.length; //previous groups

      grup[NG] = new Array();
      grupID[NG] = nameID;
      grup[NG][0] = temp[0]; //OnOff
      grup[NG][1] = temp[1]; //1st sgrp
      grup[NG][2] = temp[2]; //last sgrp
      grup[NG][3] = temp[3]; //animate
      grup[NG][4] = temp[4]; //dominant
      grup[NG][5] = temp[5]; //master
      if(grup[NG][4] == 1) {LGdominated = true;}
      grup[NG][1] = sgrp.length; //index of next sgrp to be declared
      grup[NG][2] = grup[NG][1]; //for now
      //animate set would be a parent set for this grup
      if(grup[NG][3]) {Nanimate++;}
      if(Ninstance > 0)
      {
         grup[NG][1] = grup[Ninstance][1];
         grup[NG][2] = grup[Ninstance][2];
         NewGrupSgrpList = 2; //in effect this grup has a sgrp...
      }
      Settype = 1; //grup
      makeButton(Settype, NG, grupID[NG]);
}//group

function establishSubgroup(nameID,temp,Ninstance)
{//subgroup
//alert('subgoup: '+nameID+', Ninstance== '+Ninstance);
      LSdominated = false;//reset at every subgroup
      if(NewGrupSgrpList == 0)
      {//subgroup without group
         var blank = new Array();
         blank[0] = 1; 
         for(var i=1; i<6; i++) {blank[i] = 0;}
         establishGroup("dummy",blank);
      }
      NewGrupSgrpList = 2; //reset at every group
      SetType = 2; //1,2,3 grup,sgrp,list for buttons
      NS = sgrp.length; //previous groups
      sgrp[NS] = new Array();
      sgrpID[NS] = nameID;
      sgrp[NS][0] = temp[0]; //OnOff
      sgrp[NS][1] = temp[1]; //1st list
      sgrp[NS][2] = temp[2]; //last list
      sgrp[NS][3] = temp[3]; //parent
      sgrp[NS][4] = temp[4]; //dominant
      sgrp[NS][5] = temp[5]; //master
      if(sgrp[NS][4] == 1){LSdominated = true;}
      sgrp[NS][1] = list.length; //index of next list to be declared
      sgrp[NS][2] = sgrp[NS][1]; //for now
      NG = (grup.length)-1; //parent grup
      sgrp[NS][3] = NG; //parent grup
      grup[NG][2] = NS; //currently the last sgrp in current grup
      if(Ninstance > 0)
      {
         sgrp[NS][1] = sgrp[Ninstance][1];
         sgrp[NS][2] = sgrp[Ninstance][2];
         NewGrupSgrpList = 3; //in effect this sgrp has a list...
      }

      Settype = 2; //sgrp
      if(!LGdominated) {makeButton(Settype, NS, sgrpID[NS]);}
}//subgroup


function establishList(nameID,temp,Ninstance)
{//List
      if(NewGrupSgrpList < 2)
      {//list without subgroup
         var blank = new Array();
         blank[0] = 1; 
         for(var i=1; i<6; i++) {blank[i] = 0;}
         establishSubgroup("dummy",blank);
      }
      NewGrupSgrpList = 3; //reset at every group
      NL = list.length; //previous lists
      list[NL] = new Array();
      listID[NL] = nameID; //separate array
      list[NL][0] = temp[0]; //OnOff
      list[NL][1] = temp[1]; //1st pt
      list[NL][2] = temp[2]; //last pt
      list[NL][3] = temp[3]; //parent
      list[NL][4] = temp[4]; //radius
      list[NL][5] = temp[5]; //color
      list[NL][6] = temp[6]; //type
      list[NL][7] = temp[7]; //master
      list[NL][1] = pont.length; //index of next pont to be declared
      list[NL][2] = list[NL][1]; //for now
      NS = (sgrp.length)-1; //parent sgrp
      list[NL][3] = NS; //parent sgrp
      sgrp[NS][2] = NL; //currently the last list in current sgrp
      if(Ninstance > 0)
      {
         list[NL][1] = list[Ninstance][1];
         list[NL][2] = list[Ninstance][2];
         NewGrupSgrpList = 3; //in effect this list is OK...
      }
//if(temp[6] == 2) {alert(' dotlist: listID['+NL+']== '+listID[NL]+', list[NL]== '+list[NL]);}
      Settype = 3; //list
      ListStart = true;
      if(!LGdominated && !LSdominated) {makeButton(Settype, NL, listID[NL]);}
}//list

function parseIdentifier(index,Line) //return both IDentifier and index
{//parseIdentifier
//alert(' parseIdentifier: Line '+Line);
   var idenstr = null;
   var ncnt = 0;
   var result = new Array();
   result[0] = 0; //will be last index
   result[1] = undefined; //will be indenstr if successful
   for(var i=index; i<Line.length; i++)
   {
      result[0] = i; //tracks in any case
      if(Line[i] == "{")//}
      { 
          ncnt = 0;
      }//{
      else if(Line[i] == "}")
      {
         result[1] = idenstr; 
         return result;
      }
      else if( (ncnt == 0) && (Line[i] == ' ') )
      {
         ; //leading white space
      }
      else
      {
          if(ncnt==0) {idenstr = Line[i];}
          else {idenstr = idenstr+Line[i];}
          ncnt++;
      }
   }
   return result; //on fall-through result[1] is still undefined
}//parseIdentifier

function parseNumber(index,Line) //return both IDentifier and index
{//parseNumber
//alert('enter parseNumber');
   var numstr = null;
   var ncnt = 0;
   var result = new Array();
   result[0] = 0; //will be last index
   result[1] = undefined; //will be numstr if successful
   for(var i=index; i<Line.length; i++)
   {
      result[0] = i; //tracks index in any case
      if(isAdigit(Line[i]))
      {
         if(ncnt==0) {numstr = Line[i];}
         else {numstr = numstr+Line[i];}
         ncnt++;
      }

      if(Line[i] == " " || Line[i] == "," || Line[i] == "=" || (i + 1)== Line.length)
      { 
         if(ncnt == 0) 
         {
            ; //leading white space
         }
         else //end of the number field
         {
            result[1] = Number(numstr);
            return result;
         }
      }
   }
   return result; //on fall-through result[1] is still undefined
}//parseNumber

function parseString(index,Line) //return both IDentifier and index
{//parseString
   var thestr = undefined;
   var thenum = undefined;
   var ncnt = 0;
   var numcnt = 0;
   var result = new Array();
   result[0] = 0; //will be last index of the parsed string
   result[1] = undefined; //will be thestr if successful
   result[2] = undefined; //will be thenum if number found
   for(var i=index; i<Line.length; i++)
   {//loop
      result[0] = i; //tracks in any case
      if(ncnt == 0 && (Line[i] == " " || Line[i] == "," || Line[i] == "=" ) )
      {
         continue;
      }
      
      if((Line[i] != " ") && (isAnumber(Line[i])))
      {
         if(numcnt==0) {thenum = Line[i];}
         else {thenum = thenum+Line[i];}
         numcnt++;
         if( (i + 1)== Line.length){ result[1] = thestr; result[2] = thenum; return result;}
      }
      if((Line[i] != " ") && (isAnAlph(Line[i])))
      {
         if(ncnt==0) {thestr = Line[i];}
         else {thestr = thestr+Line[i];}
         ncnt++;
         if( (i + 1)== Line.length){ result[1] = thestr; result[2] = thenum; return result;}
      }
      if(Line[i] == " " || Line[i] == "," || Line[i] == "=" )
      {//end of the string field
         {
            result[1] = thestr;
            result[2] = thenum;
//if(ncnt==0 || ncnt==1) {alert('exit parseString  ncnt== '+ncnt+'  thestr:'+Number(thestr)+', i== '+i+' in Line '+Line);}
            return result;
         }
      }
   }//loop
   return result; //on fall-through result[1] is still undefined
}//parseString

function isAdigit(I)
{
   if(  I=='0'||I=='1'||I=='2'||I=='3'||I=='4'||I=='5'||I=='6'
      ||I=='7'||I=='8'||I=='9'||I=='-'||I=='+'||I=='.'||I=='-')
   {
      return true;
   }
   else
   {return false;}
} 

function isAnAlph(c)
{
   if(  c!='0'||c!='1'||c!='2'||c!='3'||c!='4'||c!='5'||c!='6'||c!='7'||c!='8'
      ||c!='9'||c!='='||c!='-'||c!='+'||c!='.'||c!=' '||c!=','||c!=';'||c!='\t'||c!='\n')
   {
      return true;
   }
   else
   {return false;}
} 
function isAnumber(I)
{
   if(  I=='0'||I=='1'||I=='2'||I=='3'||I=='4'||I=='5'||I=='6'
      ||I=='7'||I=='8'||I=='9')
   {
      return true;
   }
   else
   {return false;}
} 

function parseKeyword(index,Line) //return IDentifier, index, number
{//parseKeyword  of form @Nname, lead spaces OK, otherwise no breaks
//alert('enter parseKeyword');
   var rtn = 0;
   var thestr = undefined;
   var thenum = undefined;
   var ncnt = 0;
   var result = new Array();
   result[0] = 0; //will be last index of the parsed string
   result[1] = undefined; //will be thestr if successful
   result[2] = undefined; //will be thenum if successful
   for(var i=index; i<Line.length; i++)
   {
      result[0] = i; //tracks in any case
      if(Line[i] == "@" || Line[i] == " " || Line[i] == ",")
      { 
         if(ncnt == 0) 
         {
            ; //@ or leading white space
         }
         else //end of the string field
         {
            result[1] = thestr;
            result[2] = thenum;
if(thestr == "vectorlist") {rtn = 1;}
else if(thestr == "balllist") {rtn  = 2;}
else if(thestr == "marklist") {rtn  = 3;}
else if(thestr == "subgroup") {rtn  = 4;}
else if(thestr == "group") {rtn  = 5;}
else if(thestr == "matrix") {rtn  = 6;}
else if(thestr == "center") {rtn  = 7;}
else if(thestr == "zoom") {rtn  = 8;}
else if(thestr == "zslab") {rtn  = 9;}
else if(thestr == "viewid") {rtn  = 10;}
else if(thestr == "ribbonlist") {rtn  = 11;}
else if(thestr == "dotlist") {rtn  = 13;}
else if(thestr == "trianglelist") {rtn  = 11;}
else {rtn = 12;} //keyword not iterpretable
result[1] = rtn;
//alert('exit parseKeyword');
            return result;
         }
      }
      else
      {
         if( (ncnt == 0 || ncnt == 1) && isAnumber(Line[i]) )
         {
            if(ncnt==0) {thenum = Line[i];}
            else {thenum = thenum+Line[i];}
            ncnt++;
         }
         else if(isAnAlph(Line[i]))
         {
            if(!thestr) {thestr = Line[i];}
            else {thestr = thestr+Line[i];}
            ncnt++;
         }
         else
         {//not recognized, try to die gracefully?
//alert('exit parseKeyword');
            return result; //let calling function decide how to die
         }
      }
   }
//alert('exit parseKeyword');
   return result; //on fall-through result[1] & [2] still undefined
}//parseKeyword

