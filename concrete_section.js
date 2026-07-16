RENDER["concrete"]=function(){
var h='<h2>CONCRETE & MORTAR CALCULATOR</h2>';
h+='<div style="display:flex;gap:4px;margin:10px 0;flex-wrap:wrap">';
h+='<button id="cbCalc" class="btn btn-sm" style="background:#ff9f0a;color:#000" onclick="cTab(\'calc\')">Calculator</button>';
h+='<button id="cbRef" class="btn btn-sm btn-secondary" onclick="cTab(\'ref\')">Mix Reference</button>';
h+='<button id="cbTest" class="btn btn-sm btn-secondary" onclick="cTab(\'test\')">Field Tests</button>';
h+='<button id="cbAdmix" class="btn btn-sm btn-secondary" onclick="cTab(\'admix\')">Admixtures</button>';
h+='</div>';
h+='<div id="cCalc"><div class="card"><label>Mix Type:</label><select id="cmt" onchange="cUp()"><option value="concrete">Concrete (Structural)</option><option value="mortar">Mortar (Blockwork/Plaster)</option></select></div><div class="card"><h4>Calculator</h4><label>Structure:</label><select id="cct" onchange="cDim()"><option value="slab">Slab / Floor</option><option value="beam">Beam</option><option value="column">Column</option><option value="footing">Footing / Pad</option><option value="wall">Wall</option><option value="cylinder">Circular Column</option></select><div id="ccd"></div><label>Grade:</label><select id="ccg" onchange="cCalc()"></select><label>Wastage:</label><select id="ccw" onchange="cCalc()"><option value="1">0%</option><option value="1.05" selected>5%</option><option value="1.1">10%</option></select><div id="ccr" style="margin-top:10px;padding:10px;background:#111;border-radius:8px"></div></div></div>';
h+='<div id="cRef" style="display:none"><h3>Concrete Mixes (per m3)</h3><div id="cRefC"></div><h3 style="margin-top:15px">Mortar Mixes (per m3)</h3><div id="cRefM"></div><div class="card" style="font-size:12px"><h4>Batching Guide</h4><p><b>1 bag cement</b> = 50kg = 0.035 m3</p><p><b>1 wheelbarrow</b> = ~0.065 m3 (65 litres)</p><p><b>1 bucket (20L)</b> = 0.02 m3</p></div></div>';
h+='<div id="cTest" style="display:none"><div class="card" style="font-size:12px"><h4>Slump Test (Workability)</h4><p><b>Equipment:</b> Slump cone 300mm, tamping rod 16mm, base plate</p><p><b>Target:</b> 50-100mm for normal RC | 25-50mm pavements | 100-150mm pumped</p><p><b>Procedure:</b> Fill cone in 3 equal layers, rod each 25 times, strike off top, lift cone vertically in 5 seconds, measure drop</p><p><b>Fail if:</b> Collapses (too wet), shears off (no cohesion), zero slump (too dry)</p></div><div class="card" style="font-size:12px"><h4>Cube Test (Compressive Strength)</h4><p><b>Mould:</b> 150mm x 150mm x 150mm steel</p><p><b>Sample:</b> Cast minimum 3 cubes per batch</p><p><b>Curing:</b> Submerge in clean water at 20-25C until testing</p><p><b>7-day:</b> 60-70% of design strength</p><p><b>28-day:</b> Full strength (C25 = 25 N/mm2 minimum)</p></div><div class="card" style="font-size:12px"><h4>Site Quick Tests</h4><p><b>Ball Test:</b> Squeeze concrete - should hold shape, not crumble or bleed</p><p><b>Trowel Test:</b> Pat surface - should float smooth, paste cover aggregate</p><p><b>Water Test:</b> Compact - no free water should rise to surface</p><p><b>Segregation:</b> Drop small amount - coarse aggregate stays mixed</p></div><div class="card" style="font-size:12px"><h4>Curing Requirements</h4><p><b>Normal:</b> Keep continuously wet for 7 days minimum</p><p><b>Ponding:</b> Best for slabs - create water pond</p><p><b>Hessian:</b> Cover with wet hessian, keep damp</p><p><b>Spraying:</b> Mist 3-4 times daily</p><p><b>Formwork:</b> Columns 2 days, beams/slabs 7-14 days</p><p><b>Hot (>30C):</b> Start within 30min | <b>Cold (<5C):</b> Protect 72hrs</p></div></div>';
h+='<div id="cAdmix" style="display:none"><div class="card" style="font-size:12px"><h4>Concrete Admixtures Guide</h4><p><b>Waterproofer (Liquid):</b> 200ml per 50kg bag</p><p><b>Waterproofer (Powder):</b> 1kg per 50kg bag</p><p><b>Accelerator:</b> 1-2L per 50kg bag (cold weather)</p><p><b>Retarder:</b> 0.5-1L per 50kg bag (hot weather)</p><p><b>Plasticiser:</b> 150ml per 50kg bag - reduces water 10-15%</p><p><b>Superplasticiser:</b> 0.5-1.5L per 50kg - flowing concrete</p><p><b>Bonding Agent (SBR):</b> 1:1 with water as primer, 1:4 in mix</p><p><b>Curing Compound:</b> Apply 1L per 4-5m2 after finishing</p><p><b>Air Entrainer:</b> 50-100ml per 50kg (freeze-thaw resistance)</p><p><b>Shrinkage Reducer:</b> 2-3L per m3 - reduces cracking</p><p><b>Corrosion Inhibitor:</b> 3-5L per m3 (marine/saline areas)</p><p><b>Colouring Pigment:</b> 2-5kg per 50kg bag</p><p><b>Fibres (Polypropylene):</b> 900g per m3 - reduces plastic cracking</p><p><b>Fibres (Steel):</b> 20-40kg per m3 (industrial floors)</p></div></div>';
setTimeout(function(){cUp();buildRef();},200);
return h;
};
var CONC_MIXES={"C15/20 Blinding":{r:"1:3:6",c:250,s:0.45,b:0.9,w:125,u:"Blinding, lean concrete"},"C20/25 Light Duty":{r:"1:2.5:5",c:300,s:0.44,b:0.88,w:150,u:"Light duty floors"},"C25/30 General RC":{r:"1:2:4",c:350,s:0.42,b:0.84,w:175,u:"Slabs, beams, columns"},"C30/37 Heavy Duty":{r:"1:2:3",c:400,s:0.40,b:0.80,w:200,u:"Heavy duty, water retaining"},"C35/45 Precast":{r:"1:1.5:3",c:450,s:0.38,b:0.76,w:200,u:"Precast elements"},"C40/50 High Strength":{r:"1:1.5:2.5",c:500,s:0.36,b:0.72,w:200,u:"Bridge works"}};
var CONC_MORTAR={"Blockwork 1:4":{r:"1:4",c:350,s:1.0,w:175,u:"Standard blockwork"},"Blockwork 1:3":{r:"1:3",c:450,s:0.95,w:200,u:"Heavy/retaining walls"},"Plaster 1:4 (Internal)":{r:"1:4",c:300,s:0.85,w:150,u:"Internal plaster"},"Plaster 1:3 (External)":{r:"1:3",c:400,s:0.80,w:180,u:"External rendering"},"Screed 1:3":{r:"1:3",c:450,s:0.90,w:200,u:"Floor screed 50mm"},"Tiling 1:2":{r:"1:2",c:600,s:0.60,w:280,u:"Tile bedding"},"Pointing 1:1":{r:"1:1",c:900,s:0.50,w:400,u:"Grouting/pointing"}};
var CONC_EXPLAIN={"C15/20 Blinding":"1 bag : 3 wheelbarrows sand : 6 ballast : 25L water","C20/25 Light Duty":"1 bag : 2.5 wheelbarrows sand : 5 ballast : 25L water","C25/30 General RC":"1 bag : 2 wheelbarrows sand : 4 ballast : 25L water","C30/37 Heavy Duty":"1 bag : 2 wheelbarrows sand : 3 ballast : 25L water","C35/45 Precast":"1 bag : 1.5 wheelbarrows sand : 3 ballast : 22L water","C40/50 High Strength":"1 bag : 1.5 wheelbarrows sand : 2.5 ballast : 20L water","Blockwork 1:4":"1 bag : 4 wheelbarrows sand : 25L water","Blockwork 1:3":"1 bag : 3 wheelbarrows sand : 22L water","Plaster 1:4 (Internal)":"1 bag : 4 wheelbarrows sand : 25L water","Plaster 1:3 (External)":"1 bag : 3 wheelbarrows sand : 22L water","Screed 1:3":"1 bag : 3 wheelbarrows sand : 22L water","Tiling 1:2":"1 bag : 2 wheelbarrows sand : 22L water","Pointing 1:1":"1 bag : 1 wheelbarrow sand : 22L water"};

function cTab(t){
var ids=["cCalc","cRef","cTest","cAdmix"];
for(var i=0;i<ids.length;i++){var el=document.getElementById(ids[i]);if(el)el.style.display="none";}
var show=document.getElementById(t==="calc"?"cCalc":t==="ref"?"cRef":t==="test"?"cTest":"cAdmix");
if(show)show.style.display="block";
["calc","ref","test","admix"].forEach(function(x){
var b=document.getElementById("cb"+x.charAt(0).toUpperCase()+x.slice(1));
if(b){b.style.background=x===t?"#ff9f0a":"#333";b.style.color=x===t?"#000":"#fff";}
});
if(t==="ref"){buildRef();}
}

function cUp(){
var t=document.getElementById("cmt").value;
var s=document.getElementById("cct");
if(t==="concrete"){s.innerHTML='<option value="slab">Slab</option><option value="beam">Beam</option><option value="column">Column</option><option value="footing">Footing</option><option value="wall">Wall</option><option value="cylinder">Circular Column</option>';}
else{s.innerHTML='<option value="wall_area">Wall Area (m2)</option><option value="floor_area">Floor Area (m2)</option><option value="volume">Volume (m3)</option>';}
var g=document.getElementById("ccg");
var data=t==="concrete"?CONC_MIXES:CONC_MORTAR;
var keys=Object.keys(data);
g.innerHTML='';for(var i=0;i<keys.length;i++){g.innerHTML+='<option>'+keys[i]+'</option>';}
cDim();
}

function cDim(){
var t=document.getElementById("cmt").value;
var s=document.getElementById("cct").value;
var d=document.getElementById("ccd");var h="";
if(t==="concrete"){
if(s=="slab")h='<div class="row"><div>Length (m):<br><input id="ccl" type="number" value="5" step="0.1" onchange="cCalc()"></div><div>Width (m):<br><input id="ccw" type="number" value="4" step="0.1" onchange="cCalc()"></div></div>Thickness (mm):<br><input id="cch" type="number" value="150" onchange="cCalc()">';
else if(s=="beam")h='Length (m):<br><input id="ccl" type="number" value="6" step="0.1" onchange="cCalc()"><div class="row"><div>Width (mm):<br><input id="ccw" type="number" value="230" onchange="cCalc()"></div><div>Depth (mm):<br><input id="cch" type="number" value="450" onchange="cCalc()"></div></div>';
else if(s=="column")h='<div class="row"><div>Width (mm):<br><input id="ccw" type="number" value="230" onchange="cCalc()"></div><div>Depth (mm):<br><input id="cch" type="number" value="230" onchange="cCalc()"></div></div>Height (m):<br><input id="ccl" type="number" value="3" step="0.1" onchange="cCalc()">';
else if(s=="footing")h='<div class="row"><div>Length (m):<br><input id="ccl" type="number" value="1.5" step="0.1" onchange="cCalc()"></div><div>Width (m):<br><input id="ccw" type="number" value="1.5" step="0.1" onchange="cCalc()"></div></div>Thickness (mm):<br><input id="cch" type="number" value="300" onchange="cCalc()">';
else if(s=="wall")h='Length (m):<br><input id="ccl" type="number" value="10" step="0.1" onchange="cCalc()"><div class="row"><div>Thickness (mm):<br><input id="ccw" type="number" value="200" onchange="cCalc()"></div><div>Height (m):<br><input id="cch" type="number" value="2.5" step="0.1" onchange="cCalc()"></div></div>';
else if(s=="cylinder")h='Diameter (mm):<br><input id="ccw" type="number" value="300" onchange="cCalc()">Height (m):<br><input id="ccl" type="number" value="3" step="0.1" onchange="cCalc()">';
}else{
if(s=="wall_area")h='Wall Area (m2):<br><input id="ccl" type="number" value="50" step="0.1" onchange="cCalc()">Thickness (mm):<br><input id="cch" type="number" value="150" onchange="cCalc()">';
else if(s=="floor_area")h='Floor Area (m2):<br><input id="ccl" type="number" value="20" step="0.1" onchange="cCalc()">Thickness (mm):<br><input id="cch" type="number" value="50" onchange="cCalc()">';
else if(s=="volume")h='Volume (m3):<br><input id="ccl" type="number" value="1" step="0.1" onchange="cCalc()">';
}
d.innerHTML=h;cCalc();
}

function cCalc(){
var t=document.getElementById("cmt").value;
var s=document.getElementById("cct").value;
var l=parseFloat((document.getElementById("ccl")||{}).value)||0;
var w=parseFloat((document.getElementById("ccw")||{}).value)||0;
var hh=parseFloat((document.getElementById("cch")||{}).value)||0;
var vol=0;
if(t==="concrete"){
if(s=="slab")vol=l*w*(hh/1000);
else if(s=="beam")vol=l*(w/1000)*(hh/1000);
else if(s=="column")vol=(w/1000)*(hh/1000)*l;
else if(s=="footing")vol=l*w*(hh/1000);
else if(s=="wall")vol=l*(w/1000)*hh;
else if(s=="cylinder")vol=Math.PI*Math.pow(w/2000,2)*l;
}else{
if(s=="wall_area"||s=="floor_area")vol=l*(hh/1000);
else vol=l;
}
var waste=parseFloat((document.getElementById("ccw")||{}).value)||1;vol*=waste;
var gr=document.getElementById("ccg").value;
var data=t==="concrete"?CONC_MIXES:CONC_MORTAR;
var mx=data[gr]||{};
var cem=mx.c||0;
var cb=Math.ceil((vol*cem)/50);
var sd=(vol*(mx.s||0)).toFixed(2);
var bl=mx.b?(vol*mx.b).toFixed(2):null;
var wt=Math.round(vol*(mx.w||0));
var r=document.getElementById("ccr");
var txt='<b style="color:#ff9f0a">RESULTS</b><br>Volume: <b>'+vol.toFixed(3)+' m3</b><br><br><b>Cement:</b> '+cb+' bags ('+(cb*50)+' kg)<br><b>Sand:</b> '+sd+' m3';
if(bl)txt+='<br><b>Ballast:</b> '+bl+' m3';
txt+='<br><b>Water:</b> ~'+wt+' litres<br><small style="color:#ff9f0a">'+mx.r+' | '+(CONC_EXPLAIN[gr]||"")+'</small>';
r.innerHTML=txt;
}

function buildRef(){
var rc="",rm="";
var ck=Object.keys(CONC_MIXES);
for(var i=0;i<ck.length;i++){var g=ck[i];var m=CONC_MIXES[g];
rc+='<div class="card"><b>'+g+'</b><br>Ratio: '+m.r+' | Cement: '+m.c+' kg | Sand: '+m.s+' m3 | Ballast: '+m.b+' m3<br>Water: '+m.w+'L | '+m.u+'<br><small style="color:#ff9f0a">'+(CONC_EXPLAIN[g]||"")+'</small></div>';}
var mk=Object.keys(CONC_MORTAR);
for(var i=0;i<mk.length;i++){var g=mk[i];var m=CONC_MORTAR[g];
rm+='<div class="card"><b>'+g+'</b><br>Ratio: '+m.r+' | Cement: '+m.c+' kg | Sand: '+m.s+' m3<br>Water: '+m.w+'L | '+m.u+'<br><small style="color:#ff9f0a">'+(CONC_EXPLAIN[g]||"")+'</small></div>';}
document.getElementById("cRefC").innerHTML=rc;
document.getElementById("cRefM").innerHTML=rm;
}
