// ============ TRANSPORTATION ENGINEERING ============
var TRANSPORT_CATEGORIES={
"Roadworks - Earthworks":["Site clearance & grubbing","Topsoil stripping 150mm","Cut to fill - bulk earthworks","Cut to spoil - disposal","Fill from borrow pit","Fill compaction - 95% MDD","Fill compaction - 98% MDD","Subgrade preparation","Subgrade compaction","Subgrade proof rolling","Slope trimming","Slope protection - grassing","Slope protection - stone pitching","Slope protection - gabions"],
"Roadworks - Sub-base & Base":["Sub-base - natural gravel G45","Sub-base - natural gravel G60","Sub-base - natural gravel G80","Sub-base - crushed stone G45","Sub-base - crushed stone G60","Sub-base - crushed stone G80","Base course - graded crushed stone","Base course - cement stabilised 3%","Base course - cement stabilised 5%","Base course - lime stabilised","Base course - bitumen stabilised","Prime coat MC-30","Prime coat MC-70","Prime coat - emulsion"],
"Roadworks - Surfacing":["Asphalt concrete wearing course AC10","Asphalt concrete wearing course AC14","Asphalt concrete binder course AC20","Asphalt concrete base course AC32","Tack coat K1-40","Tack coat - emulsion","Surface dressing - single seal","Surface dressing - double seal","Chip seal 10mm","Chip seal 14mm","Slurry seal Type I","Slurry seal Type II","Microsurfacing","Cape seal","Ottawa seal"],
"Concrete Roads":["Concrete pavement 150mm","Concrete pavement 200mm","Concrete pavement 250mm","Concrete pavement 300mm","Reinforcement mesh A142","Reinforcement mesh A193","Reinforcement mesh A252","Dowel bars Y25 @300mm","Tie bars Y16 @600mm","Expansion joints 20mm","Contraction joints","Longitudinal joints","Joint sealant - hot poured","Joint sealant - cold applied","Curing compound sprayed","Surface texturing - broom","Surface texturing - tining"],
"Road Marking & Signs":["Centerline marking - white 150mm","Edge line marking - white 150mm","Lane line marking - white 100mm","Stop line - white 300mm","Pedestrian crossing - zebra","Speed hump marking","Arrow marking - straight","Arrow marking - turn","Road marking paint - thermoplastic","Road marking paint - cold applied","Road studs/cats eyes","Road sign - regulatory","Road sign - warning","Road sign - information","Road sign - direction","Sign post - 76mm dia","Sign post - 50mm sq","Sign foundation concrete"],
"Road Drainage":["Side drain - earth V-drain","Side drain - lined V-drain","Side drain - trapezoidal lined","Side drain - rectangular concrete","Mitre drain","Catch water drain","Culvert - pipe 600mm","Culvert - pipe 900mm","Culvert - pipe 1200mm","Culvert - box 600x600","Culvert - box 900x600","Culvert - box 1200x900","Headwall - inlet","Headwall - outlet","Scour check","Drop structure","Energy dissipator"],
"Kerbs & Edges":["Kerbs - mountable 150x250mm","Kerbs - semi-mountable","Kerbs - barrier 150x300mm","Kerbs - barrier 200x400mm","Kerbs - precast concrete","Kerbs - in-situ concrete","Edging kerb 100x150mm","Channel/gutter 600mm wide","Channel/gutter 900mm wide","Kerbs - stone","Kerbs - granite"],
"Footpaths & Walkways":["Footpath - earth/gravel 1.2m","Footpath - earth/gravel 1.5m","Footpath - concrete 75mm","Footpath - concrete 100mm","Footpath - concrete slabs 50mm","Footpath - paving blocks 60mm","Footpath - paving blocks 80mm","Footpath - asphalt 50mm","Footpath - asphalt 75mm","Tactile paving - blister","Tactile paving - corduroy","Cycle track - asphalt 100mm","Cycle track - concrete 150mm","Footpath drainage","Pedestrian guardrail"],
"Speed Management":["Speed hump - 75mm high","Speed hump - 100mm high","Speed table - flat top","Raised pedestrian crossing","Rumble strips - preformed","Rumble strips - asphalt","Speed cushion","Chicane","Traffic island - concrete","Traffic island - paved","Roundabout - mini","Roundabout - standard","Roundabout - landscaping"],
"Street Furniture":["Bus stop shelter","Bus stop pole/flag","Bench - concrete","Bench - timber/metal","Litter bin - concrete","Litter bin - metal","Bollard - fixed 150mm","Bollard - removable","Bollard - flexible","Guardrail - pedestrian","Guardrail - vehicle (W-beam)","Crash barrier - tensioned","Crash cushion/attenuator","Fence - chain link","Fence - palisade","Fence - post & rail","Gate - pedestrian","Gate - vehicle"]
};
var TRANSPORT_STATUS=["Not started","Earthworks done","Sub-base done","Base done","Surfacing done","Markings done","Signage done","Drainage done","Inspected","Completed"];

RENDER["transport"]=function(){
var h='<h2>Transportation Engineering</h2><p style="color:#aaa;font-size:12px">Roadworks, pavements, drainage, markings & furniture</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showTransForm()">+ Add Item</button></div>';
var trans=(D.transport||[]);
if(trans.length===0){h+='<p style="color:#666">No transportation items recorded.</p>';}
else{
var cats={};for(var i=0;i<trans.length;i++){var t=trans[i];if(!cats[t.category])cats[t.category]=[];cats[t.category].push(t);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+')</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var t=items[i];h+='<tr><td>'+t.name+'</td><td>'+t.location+'</td><td>'+t.qty+' '+t.unit+'</td><td><span class="tag '+(t.status==="Completed"||t.status==="Inspected"?"tag-pass":"tag-open")+'">'+t.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'transport\',\''+t.id+'\');go(\'transport\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};

function showTransForm(){
var cats="";var ck=Object.keys(TRANSPORT_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Transportation Item</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_trCat" onchange="loadTransItems()">'+cats+'</select><label>Item:</label><select id="_trItem"></select><label>Location/Chainage:</label><input id="_trLoc" placeholder="e.g. Ch 0+000 to 0+500"><div class="row"><div><label>Quantity:</label><input id="_trQty" type="number" value="1"></div><div><label>Unit:</label><select id="_trUnit"><option>m</option><option>m2</option><option>m3</option><option>km</option><option>Pieces</option><option>Tons</option><option>Sets</option></select></div></div><label>Status:</label><select id="_trStatus">';
for(var i=0;i<TRANSPORT_STATUS.length;i++){h+='<option>'+TRANSPORT_STATUS[i]+'</option>';}
h+='</select><label>Notes:</label><input id="_trNotes"><button class="btn" onclick="saveTrans()">Save Item</button><button class="btn btn-secondary" onclick="go(\'transport\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadTransItems();
}

function loadTransItems(){var cat=document.getElementById("_trCat").value;var items=TRANSPORT_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_trItem").innerHTML=h;}

function saveTrans(){
if(!D.transport)D.transport=[];
D.transport.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_trCat").value,name:document.getElementById("_trItem").value,location:document.getElementById("_trLoc").value,qty:document.getElementById("_trQty").value,unit:document.getElementById("_trUnit").value,status:document.getElementById("_trStatus").value,notes:document.getElementById("_trNotes").value,timestamp:Date.now()});
save();toast("Item saved!");go("transport");
}
