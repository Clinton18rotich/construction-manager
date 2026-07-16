function nav(){
var h="";for(var i=0;i<NAV.length;i++){h+='<button class="'+(NAV[i].id===current?"active":"")+'" onclick="go(\''+NAV[i].id+'\');toggleMenu()">'+NAV[i].label+'</button>';}
document.getElementById("sidebar").innerHTML=h;
var gdp=document.getElementById("globalDatePicker");if(gdp){gdp.value=globalDate;gdp.max=today();}
var gdl=document.getElementById("globalDateLabel");if(gdl)gdl.textContent=fmtGlobalDate();
}
function toggleMenu(){
var s=document.getElementById("sidebar");var o=document.getElementById("overlay");
if(s.classList.contains("open")){s.classList.remove("open");o.classList.remove("show");}
else{s.classList.add("open");o.classList.add("show");}
}
