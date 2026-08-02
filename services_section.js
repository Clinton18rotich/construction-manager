// ============ SERVICES ============
var SERVICE_CATEGORIES={
"Plumbing - Supply":["HDPE main supply 25mm","HDPE main supply 32mm","HDPE main supply 50mm","PPR cold water 20mm","PPR cold water 25mm","PPR hot water 20mm","PPR hot water 25mm","Gate valve 25mm","Gate valve 50mm","Stop cock 15mm","Water meter","Pressure reducing valve","Booster pump","Water tank connection"],
"Plumbing - Drainage":["PVC soil pipe 110mm","PVC soil pipe 160mm","PVC waste pipe 50mm","PVC waste pipe 40mm","PVC waste pipe 32mm","Floor trap 50mm","Bottle gully","P-trap","S-trap","Vent pipe 50mm","Vent cowl","Inspection chamber 450x450","Inspection chamber 600x450","Manhole cover - light duty","Manhole cover - heavy duty","Interceptor trap","Grease trap","Sump pump"],
"Plumbing - Roof Drainage":["Gutter UPVC 100mm","Gutter UPVC 150mm","Downpipe UPVC 100mm","Downpipe UPVC 150mm","Rainwater head","Shoe/Cap","Gutter bracket","Downpipe clip","First flush diverter","Rainwater harvesting tank"],
"Electrical - Power":["Main cable 16mm2","Main cable 25mm2","Sub-main cable 10mm2","Ring circuit 2.5mm2","Lighting circuit 1.5mm2","Cooker circuit 6mm2","Geyser circuit 4mm2","DB - Main panel","DB - Sub panel","MCB 10A","MCB 16A","MCB 20A","MCB 32A","RCD 40A 30mA","RCD 63A 30mA","Isolator 60A","Changeover switch","Earthing rod 1.5m","Earth wire 10mm2"],
"Electrical - Lighting":["LED downlight 10W","LED downlight 18W","LED panel 600x600","LED strip","Pendant light","Wall light","Bulkhead light","Emergency light","Exit sign","Sensor/PIR light","Garden light","Bollard light","Floodlight 50W"],
"Electrical - Containment":["PVC conduit 20mm","PVC conduit 25mm","PVC trunking 25x16mm","PVC trunking 38x25mm","Metal trunking 50x50mm","Cable tray 150mm","Cable tray 300mm","Draw box","Junction box"],
"Fire Services":["Fire extinguisher CO2 2kg","Fire extinguisher DCP 6kg","Fire extinguisher DCP 9kg","Fire hose reel","Fire hydrant","Sprinkler head","Smoke detector","Heat detector","Fire alarm panel","Manual call point","Fire bell","Fire door 2100x900 1hr","Fire door 2100x900 2hr","Emergency light","Exit sign","Fire blanket"],
"HVAC":["AC split unit 12000BTU","AC split unit 18000BTU","AC split unit 24000BTU","AC cassette unit","AC ducted unit","Extractor fan 150mm","Extractor fan 250mm","Ceiling fan 56in","Wall fan","Fresh air intake","Air curtain","Mechanical ventilation"],
"Security":["CCTV camera - Dome","CCTV camera - Bullet","CCTV NVR/DVR","Video intercom","Access control - Card","Access control - Biometric","Electric fence","Burglar bars","Security gate","Motion sensor","Alarm panel","Panic button"],
"Data/Comms":["Data outlet RJ45","Data cable CAT6","Patch panel 24 port","Network switch","WiFi access point","Telephone outlet","TV outlet - Coaxial","TV outlet - Satellite","Fibre termination box","Server rack"],
"External Services":["External water point","External power point","Hose reel","Drainage channel","Yard gully","Soak pit","Septic tank 5000L","Underground tank 10000L","Sewer connection - main line","Sewer connection - septic"]
};
var SERVICE_STATUS=["Rough-in","First fix","Second fix","Testing","Commissioned","Completed"];

RENDER["services"]=function(){
var h='<h2>Building Services</h2><p style="color:#aaa;font-size:12px">Plumbing, Electrical, Fire, HVAC</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showServiceForm()">+ Add Service</button></div>';
var services=(D.services||[]);
if(services.length===0){h+='<p style="color:#666">No services recorded. Add plumbing, electrical and other services.</p>';}
else{
var cats={};for(var i=0;i<services.length;i++){var s=services[i];if(!cats[s.category])cats[s.category]=[];cats[s.category].push(s);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+'</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Status</th><th>Test Result</th></tr>';
for(var i=0;i<items.length;i++){var s=items[i];h+='<tr><td>'+s.name+'</td><td>'+s.location+'</td><td><span class="tag '+(s.status==="Completed"||s.status==="Commissioned"?"tag-pass":s.status==="Testing"?"tag-open":"")+'">'+s.status+'</span></td><td style="font-size:10px">'+(s.testResult||"-")+'</td></tr>';}
h+='</table></div>';
}
}
return h;
};

function showServiceForm(){
var cats="";var ck=Object.keys(SERVICE_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>Add Service</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_svcCat" onchange="loadServiceItems()">'+cats+'</select><label>Item/Description:</label><select id="_svcItem"></select><label>Location:</label><input id="_svcLoc" placeholder="e.g. Kitchen"><label>Status:</label><select id="_svcStatus">';
for(var i=0;i<SERVICE_STATUS.length;i++){h+='<option>'+SERVICE_STATUS[i]+'</option>';}
h+='</select><label>Test Result:</label><select id="_svcTest"><option value="">Not tested</option><option value="Pass">Pass</option><option value="Fail">Fail</option><option value="Pending">Pending</option></select><label>Notes:</label><input id="_svcNotes"><button class="btn" onclick="saveService()">Save Service</button><button class="btn btn-secondary" onclick="go(\'services\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadServiceItems();
}

function loadServiceItems(){var cat=document.getElementById("_svcCat").value;var items=SERVICE_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_svcItem").innerHTML=h;}

function saveService(){
if(!D.services)D.services=[];
D.services.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_svcCat").value,name:document.getElementById("_svcItem").value,location:document.getElementById("_svcLoc").value,status:document.getElementById("_svcStatus").value,testResult:document.getElementById("_svcTest").value,notes:document.getElementById("_svcNotes").value,timestamp:Date.now()});
save();toast("Service saved!");go("services");
}
