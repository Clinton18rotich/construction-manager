// ============ MATERIAL INSPECTION REQUEST (MIR) ============
var MIR_CATEGORIES={
"Structural Materials":["Reinforcement steel - check grade, size, mill certificates","Cement - check type, date of manufacture, test certificate","Concrete cubes - witness sampling and testing","Aggregates - check grading, silt content, source","Structural steel sections - check certificates, dimensions","Welding electrodes - check type, certificates","Bolts/nuts/washers - check grade, certificates"],
"Architectural Materials":["Floor tiles - check batch, shade, size, water absorption","Wall tiles - check batch, shade, size","Ceramic/porcelain - check quality, grade","Paint - check colour, type, batch numbers","Glass - check type, thickness, tint","Timber - check species, moisture content, grade","Doors - check size, type, fire rating if applicable","Windows - check size, type, glazing"],
"Plumbing Materials":["Pipes - check material, size, pressure rating","Fittings - check type, size, material","Sanitary ware - check model, colour, quality","Water tanks - check capacity, material, fittings","Valves - check type, size, pressure rating","Pumps - check model, capacity, head"],
"Electrical Materials":["Cables - check size, type, voltage rating","DB boards - check size, type, IP rating","MCBs/RCDs - check rating, type, certificates","Conduits/trunking - check size, material","Lights/fixtures - check type, wattage, IP rating","Solar panels - check wattage, efficiency, certificates"],
"Waterproofing Materials":["Membrane - check type, thickness, certification","Liquid waterproofing - check type, coverage rate","Water bar/waterstop - check type, size, material","DPM - check gauge, width, certification","Joint sealant - check type, colour, expiry date"],
"Roofing Materials":["Iron sheets - check gauge, length, coating","Tiles - check type, colour, batch","Ridge/hip caps - check type, colour match","Underlay/sisalation - check type, thickness","Gutters - check size, material, colour","Fascia/soffit boards - check material, colour"],
"Road/Transport Materials":["Asphalt - check mix design, temperature","Aggregate base - check grading, CBR","Concrete pavement - check grade, slump","Kerbs/pavers - check size, strength, colour","Road marking paint - check type, colour, beads","Signs - check size, retroreflectivity class"],
"General Materials":["Sand - check grading, silt content","Ballast - check size, crushing value","Hardcore - check size, quality","Blocks/bricks - check size, strength, colour","DPC - check type, width"]
};
var MIR_STATUS=["Requested","Inspection scheduled","Inspected - Approved","Inspected - Rejected","Resubmitted","Closed"];

RENDER["mir"]=function(){
var h='<h2>Material Inspection Requests (MIR)</h2><p style="color:#aaa;font-size:12px">Formal requests to inspect materials before use</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showMIRForm()">+ New MIR</button></div>';
var mirs=(D.mirs||[]);
if(mirs.length===0){h+='<p style="color:#666">No material inspection requests recorded.</p>';}
else{
h+='<table style="font-size:11px"><tr><th>Date</th><th>Material</th><th>Category</th><th>Supplier</th><th>Status</th><th></th></tr>';
for(var i=0;i<mirs.length;i++){var m=mirs[i];h+='<tr><td>'+m.date+'</td><td>'+m.material+'</td><td>'+m.category+'</td><td>'+m.supplier+'</td><td><span class="tag '+(m.status==="Inspected - Approved"||m.status==="Closed"?"tag-pass":m.status==="Inspected - Rejected"?"tag-fail":"tag-open")+'">'+m.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'mirs\',\''+m.id+'\');go(\'mir\')">X</button></td></tr>';}
h+='</table>';
}
return h;
};

function showMIRForm(){
var cats="";var ck=Object.keys(MIR_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>New Material Inspection Request</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_mirCat" onchange="loadMIRItems()">'+cats+'</select><label>Material/Item:</label><select id="_mirItem"></select><label>Supplier:</label><input id="_mirSupp" placeholder="Supplier name"><label>Quantity:</label><input id="_mirQty" placeholder="e.g. 500 bags"><label>Location Stored:</label><input id="_mirLoc" placeholder="e.g. Site store, Block A"><label>Status:</label><select id="_mirStatus">';
for(var i=0;i<MIR_STATUS.length;i++){h+='<option>'+MIR_STATUS[i]+'</option>';}
h+='</select><label>Remarks:</label><textarea id="_mirRemarks" placeholder="Any additional notes"></textarea><button class="btn" onclick="saveMIR()">Save MIR</button><button class="btn btn-secondary" onclick="go(\'mir\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadMIRItems();
}

function loadMIRItems(){var cat=document.getElementById("_mirCat").value;var items=MIR_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_mirItem").innerHTML=h;}

function saveMIR(){
if(!D.mirs)D.mirs=[];
D.mirs.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_mirCat").value,material:document.getElementById("_mirItem").value,supplier:document.getElementById("_mirSupp").value,qty:document.getElementById("_mirQty").value,location:document.getElementById("_mirLoc").value,status:document.getElementById("_mirStatus").value,remarks:document.getElementById("_mirRemarks").value,timestamp:Date.now()});
save();toast("MIR saved!");go("mir");
}
