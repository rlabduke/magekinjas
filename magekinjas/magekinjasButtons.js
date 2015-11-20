function makeButton(SetType, Nset, setID)
{
   var Lon = true;
   var ana = " ";
   if(SetType == 1) 
   {
      Lon = grup[Nset][0]; 
      anim =grup[Nset][3]; 
      ID = grupID[Nset];
      if(anim==1) {ana = "*";} else {ana = " ";}
      if(Lon && Nanimate > 1) {Lon = false;}
   }
   else if(SetType == 2)
   {
      Lon = sgrp[Nset][0]; 
      ana = "   "; //spacing 
      ID = sgrpID[Nset];
   }
   else if(SetType == 3)
   {
      Lon = list[Nset][0]; 
      ana = "     "; //spacing 
      ID = listID[Nset];
   }
   else if(SetType == 4)
   {
      Lon = masters[Nset][0]; 
      ana = ": "; //spacing 
      ID = mastersID[Nset];
   }

   var onoffs = document.getElementById("onoff");
   var parent2 = onoffs.parentNode;
   var c = document.createElement("input");
   c.type = "checkbox";
   c.value =("BOX");
   c.checked = Lon;
   c.name = "setts";
   c.id=SetType;
   c.label = Nset;
   c.addEventListener("click", ev_button, false);
   parent2.appendChild(c);

   var d = document.createElement("input");
   d.type = "text";
   d.value = (ana+ID);
   d.name = "setts";
   d.id=SetType;
   d.label = Nset;
   d.addEventListener("click", ev_button, false);
   parent2.appendChild(d);
}

function ev_button(ev)
{
   resetOnOffFromBUTTONS();
 
   resetOnOffFromMasters();

   resetBUTTONSFromOnOff();

   drawkin();
}

function removeBUTTONS()
{
   var select = document.forms.sets.elements.setts;
   for(var nbutt = 1; nbutt <  select.length; nbutt++)
   {
      if(select[nbutt].value != "dummy")
      {
         select[nbutt].parentNode.removeChild(select[nbutt]);
      }
   }
}

function resetOnOffFromBUTTONS()
{//reset internal ON/OFF state by checkbox status
   var select = document.forms.sets.elements.setts;
   for(var nbutt = 1; nbutt <  select.length; nbutt++)
   {
      if(select[nbutt].value == "BOX")
      {
         Lonoff = select[nbutt].checked;
         if(select[nbutt].id == 1) 
            {grup[(select[nbutt].label)][0] = Lonoff;}
         else if(select[nbutt].id == 2) 
            {sgrp[(select[nbutt].label)][0] = Lonoff;}
         else if(select[nbutt].id == 3) 
            {list[(select[nbutt].label)][0] = Lonoff;}
         else if(select[nbutt].id == 4) 
            {masters[(select[nbutt].label)][0] = Lonoff;}
      }
      else {select[nbutt].blur();}//drop focus to avoid text keyboard routines
   }
   return;
}//resetOnOffFromBUTTONS

function resetBUTTONSFromOnOff()
{//reset checkbox status from internal ON/OFF state
   var select = document.forms.sets.elements.setts;
//alert(' select== '+select+', length== '+select.length);
   for(var nbutt = 1; nbutt <  select.length; nbutt++)
   {
      if(select[nbutt].value == "BOX")
      {
//alert(' select['+nbutt+'].value== '+select[nbutt].value);
         if(select[nbutt].id == 1) 
            {select[nbutt].checked = grup[(select[nbutt].label)][0];}
         else if(select[nbutt].id == 2)
            {select[nbutt].checked = sgrp[(select[nbutt].label)][0];}
         else if(select[nbutt].id == 3)
            {select[nbutt].checked = list[(select[nbutt].label)][0];}
         else if(select[nbutt].id == 4)
            {select[nbutt].checked = masters[(select[nbutt].label)][0];}
      }
   }
}//resetBUTTONSFromOnOff

function resetOnOffFromMasters()
{//reset internal ON/OFF state from Master's state
   if(masters.length)
   {//there are masters
      var OF = 0;
      //masters identified by number, thus match simple indexing
      //masters of 0 means no masters set, so start index from 1
      for(var NM = 1; NM < masters.length; NM++)
      {
         OF = masters[NM][0]; //state of masters number NM
         if(grup && grup.length && grup[1])
         {//at least one group past markers
            for(var NG=1; NG <grup.length; NG++)
            {//scan over groups
               if(grup[NG][5] == NM) {grup[NG][0] == OF;}
               for(NS = grup[NG][1] ; NS <= grup[NG][2] ; NS++)
               {//scan over subgroups
                  if(sgrp[NS][5] == NM) {sgrp[NS][0] = OF;}
                  for(NL = sgrp[NS][1] ; NL <= sgrp[NS][2] ; NL++)
                  {//scan over lists
                     if(list[NL][6] != CURSOR)
                     {
                        if(list[NL][7] == NM) {list[NL][0] = OF;}
                     }
                  }//scan over lists
               }//scan over subgroups
            }//scan over groups
         }
      }//scan over masters
   }//there are masters
}//reset internal ON/OFF state from Master's state

function indexOfGrup(trialID)
{
   var NG;
   if(grup.length)
   {
      for(NG = 1; NG < (grup.length -1); NG++)
      {
         if(grupID[NG] == trialID) {return(NG);}   
      }
      NG = -1; //failed
   }
   return(NG);
}

function indexOfSgrp(trialID)
{
   var NS;
   if(sgrp.length)
   {
      for(NS = 1; NS < (sgrp.length -1); NS++)
      {
//alert('sgrpID['+NS+']: '+sgrpID[NS]+', ?== '+trialID);
         if(sgrpID[NS] == trialID) {return(NS);}   
      }
      NS = -1; //failed
   }
   return(NS);
}

function indexOfList(trialID)
{
   var NL;
   if(list.length)
   {
      for(NL = 1; NL < (list.length -1); NL++)
      {
         if(listID[NL] == trialID) {return(NL);}   
      }
      NL = -1; //failed
   }
   return(NL);
}

function indexOfMaster(trialID)
{
   var LneedsNewMaster = true;
   var NM;
   if(masters.length)
   {//are masters
      for(NM = 1; NM < masters.length; NM++)
      {
         if(mastersID[NM] == trialID)
         {
            LneedsNewMaster = false;
            break; //remembering NM as index
         }   
      }
   }
   if(LneedsNewMaster)
   {//need a new masters
      if(!masters.length)
      {//0 == no master
         masters[0] = new Array();
         masters[0][0] = 0;
      }
      NM = masters.length;
      masters[NM] = new Array();
      mastersID[NM] = trialID;
      masters[NM][0] = 1;
   }
   return(NM);
}

function changeView(Nview)
{
   if(Nview-1 < view.length)
   {//there is a corresponding view
      var NV = Nview-1; //selector numbered from 1, views indexed from 0
      zoom =  Number(view[NV][0]); //zoom
      zclip=  Number(2*view[NV][1]); //zslab based on Mage orig 400 width
      xctr =  Number(view[NV][2]); //xctr
      yctr =  Number(view[NV][3]); //yctr
      zctr =  Number(view[NV][4]); //zctr
      a11  =  Number(view[NV][5]); //matrix elements
      a12  =  Number(view[NV][6]);
      a13  =  Number(view[NV][7]);
      a21  =  Number(view[NV][8]);
      a22  =  Number(view[NV][9]);
      a23  =  Number(view[NV][10]);
      a31  =  Number(view[NV][11]);
      a32  =  Number(view[NV][12]);
      a33  =  Number(view[NV][13]);
      setZclipDepths(zclip);
      var temp = document.getElementById("zclipin")
      temp.value = zclip;  

      if(zoom < zoomMin) {zoom = zoomMin;}
      else if(zoom > zoomMax) {zoom = zoomMax;}

      var text = document.getElementById("viewlbl");
      text.innerHTML.id = viewID[NV];
      var text = document.getElementById("viewtool");
      text.text = viewID[NV];
      var viewtool_select = document.getElementById('viewtool');
      viewtool_select.value = viewID[NV];
      viewtool_select.text = viewID[NV];
      viewtool_select.options = viewID[NV];
   }
}

function setZclipDepths(zclip)
{
     if(zclip < zclipMin) {zclip = zclipMin;}
     else if(zclip > zclipMax) {zclip = zclipMax;}
     if(zclip == 0) {zlimit = zclipDefault;} //no zclipping
     else {zlimit = zclip;}
    for(var i=0; i<NBins; i++)
    {
       Zdepth[i] = -zlimit + (i+1)*(2*zlimit/NBins);
    }
    ZBinthick = (2*zlimit/NBins);
    ZRange = 2*zlimit;
}