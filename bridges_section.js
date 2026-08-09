// ============ BRIDGES ============
var BRIDGE_CATEGORIES={
"Bridge - Substructure":["Abutment excavation","Abutment blinding","Abutment reinforcement","Abutment formwork","Abutment concreting","Abutment bearing shelf","Pier foundation excavation","Pier blinding","Pier reinforcement","Pier formwork","Pier concreting","Pier bearing pedestal","Pile foundation - bored piles","Pile foundation - driven piles","Pile cap reinforcement","Pile cap formwork","Pile cap concreting"],
"Bridge - Superstructure":["Precast beam casting","Precast beam erection","In-situ beam formwork","In-situ beam reinforcement","In-situ beam concreting","Deck slab formwork","Deck slab reinforcement","Deck slab concreting","Deck slab post-tensioning","Box girder - cast in situ","Box girder - segmental","Box girder - launching","Steel girder fabrication","Steel girder erection","Steel girder bolting/welding","Steel girder painting","Composite deck - steel + concrete"],
"Bridge - Bearings & Joints":["Elastomeric bearing installation","Pot bearing installation","Spherical bearing installation","Fixed bearing","Free/sliding bearing","Guided bearing","Bearing mortar bedding","Expansion joint - modular","Expansion joint - strip seal","Expansion joint - finger type","Expansion joint - buried under asphalt"],
"Bridge - Deck Finishes":["Deck waterproofing membrane","Deck waterproofing primer","Deck asphalt wearing course","Deck concrete wearing course","Deck drainage - outlets","Deck drainage - pipes","Parapet/wingwall reinforcement","Parapet/wingwall concreting","Parapet height >1.1m","Parapet vehicle restraint barrier","Handrail installation","Anti-throw screen"],
"Bridge - Approach":["Approach slab formwork","Approach slab reinforcement","Approach slab concreting","Approach slab doweled to abutment","Approach embankment fill","Approach embankment compaction","Approach retaining wall","Approach guardrail transition","Approach road pavement","Approach drainage"],
"Bridge - Services":["Bridge drainage system","Bridge lighting","Bridge navigation lights (if over water)","Bridge scour protection","Bridge cathodic protection","Bridge health monitoring sensors","Bridge bearings inspection access","Bridge maintenance gantry"]
};
var BRIDGE_STATUS=["Not started","Substructure","Superstructure","Bearings","Deck finishes","Approach","Services","Completed"];

RENDER["bridges"]=function(){
var h='<h2>Bridges</h2><p style="color:#aaa;font-size:12px">Substructure, Superstructure, Bearings, Deck & Approach</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showBridgeForm()">+ Add Item</button></div>';
var br=(D.bridges||[]);
if(br.length===0){h+='<p style="color:#666">No bridge items recorded.</p>';}
else{
var cats={};for(var i=0;i<br.length;i++){var it=br[i];if(!cats[it.category])cats[it.category]=[];cats[it.category].push(it);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+')</h4><table style="font-size:10px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var it=items[i];h+='<tr><td>'+it.name+'</td><td>'+it.location+'</td><td>'+it.qty+' '+it.unit+'</td><td><span class="tag '+(it.status==="Completed"?"tag-pass":"tag-open")+'">'+it.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'bridges\',\''+it.id+'\');go(\'bridges\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};
function showBridgeForm(){
var cats="";var ck=Object.keys(BRIDGE_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Bridge Item</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_brCat" onchange="loadBrItems()">'+cats+'</select><label>Item:</label><select id="_brItem"></select><label>Location:</label><input id="_brLoc"><div class="row"><div><label>Quantity:</label><input id="_brQty" type="number" value="1"></div><div><label>Unit:</label><select id="_brUnit"><option>m</option><option>m2</option><option>m3</option><option>Pieces</option><option>Sets</option></select></div></div><label>Status:</label><select id="_brStatus">';
for(var i=0;i<BRIDGE_STATUS.length;i++){h+='<option>'+BRIDGE_STATUS[i]+'</option>';}
h+='</select><label>Notes:</label><input id="_brNotes"><button class="btn" onclick="saveBridge()">Save</button><button class="btn btn-secondary" onclick="go(\'bridges\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadBrItems();
}
function loadBrItems(){var cat=document.getElementById("_brCat").value;var items=BRIDGE_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_brItem").innerHTML=h;}
function saveBridge(){if(!D.bridges)D.bridges=[];var d=document.getElementById("_entryDate").value;var name=document.getElementById("_brItem").value;var loc=document.getElementById("_brLoc").value;D.bridges.push({id:uid(),date:d,category:document.getElementById("_brCat").value,name:name,location:loc,qty:document.getElementById("_brQty").value,unit:document.getElementById("_brUnit").value,status:document.getElementById("_brStatus").value,notes:document.getElementById("_brNotes").value,timestamp:Date.now()});save();toast("Saved!");go("bridges");}
