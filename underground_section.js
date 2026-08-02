// ============ UNDERGROUND STRUCTURES ============
var UNDERGROUND_CATEGORIES={
"Basement Construction":["Basement excavation bulk","Basement excavation trench","Basement retaining wall 200mm","Basement retaining wall 250mm","Basement retaining wall 300mm","Basement raft slab 300mm","Basement raft slab 400mm","Basement raft slab 500mm","Basement waterproofing membrane","Basement waterproofing liquid","Basement drainage channel","Basement sump pit","Basement sump pump","Basement tanking system","Basement vapour barrier","Basement insulation board","Basement light well","Basement window areaway","Basement stair access","Basement ramp access","Basement ventilation duct"],
"Swimming Pool":["Pool excavation bulk","Pool floor slab 200mm","Pool floor slab 250mm","Pool walls 200mm reinforced","Pool walls 250mm reinforced","Pool walls 300mm reinforced","Pool waterproofing membrane","Pool waterproofing render","Pool coping stone","Pool coping precast","Pool tile waterline","Pool tile full","Pool mosaic tile","Pool skimmer box","Pool main drain","Pool return inlets","Pool vacuum point","Pool overflow channel","Pool balance tank","Pool plant room","Pool filtration system","Pool pump 1HP","Pool pump 2HP","Pool pump 3HP","Pool heater electric","Pool heater solar","Pool ladder stainless","Pool steps Roman end","Pool diving board","Pool underwater light","Pool surrounding paving"],
"Septic Tank":["Septic tank excavation","Septic tank base slab 150mm","Septic tank base slab 200mm","Septic tank walls 150mm","Septic tank walls 200mm","Septic tank walls 230mm block","Septic tank cover slab 150mm","Septic tank cover slab 200mm","Septic tank partition wall","Septic tank inlet pipe 110mm","Septic tank outlet pipe 110mm","Septic tank vent pipe 50mm","Septic tank manhole cover","Septic tank access riser","Septic tank baffle wall","Septic tank filter media","Septic tank soakaway pit","Septic tank drainage field","Septic tank biodigester unit","Septic tank enzymes/bacteria"],
"Underground Water Tank":["Tank excavation bulk","Tank base slab 200mm","Tank base slab 250mm","Tank base slab 300mm","Tank walls 200mm RC","Tank walls 250mm RC","Tank walls 300mm RC","Tank cover slab 150mm","Tank cover slab 200mm","Tank waterproofing internal","Tank waterproofing external","Tank access manhole 600x600","Tank access manhole 900x600","Tank inlet pipe 50mm","Tank outlet pipe 50mm","Tank overflow pipe 100mm","Tank drain pipe 50mm","Tank vent pipe 50mm","Tank water level indicator","Tank float valve","Tank submersible pump","Tank booster pump","Tank filtration system","Tank first flush diverter","Tank leaf filter","Tank 3000L capacity","Tank 5000L capacity","Tank 10000L capacity","Tank 15000L capacity","Tank 20000L capacity"],
"Soak Pit / Soakaway":["Soak pit excavation 2m deep","Soak pit excavation 3m deep","Soak pit excavation 4m deep","Soak pit rings 900mm dia","Soak pit rings 1200mm dia","Soak pit rings 1500mm dia","Soak pit cover slab","Soak pit manhole cover","Soak pit geotextile wrap","Soak pit gravel backfill","Soak pit sand filter layer","Soak pit inlet pipe 110mm","Soak pit overflow pipe"],
"Lift Pit":["Lift pit excavation","Lift pit base slab 300mm","Lift pit base slab 400mm","Lift pit walls 250mm","Lift pit walls 300mm","Lift pit waterproofing membrane","Lift pit waterproofing tanking","Lift pit sump","Lift pit drain pump","Lift pit guide rails","Lift pit buffer/springs","Lift pit access ladder","Lift pit lighting","Lift pit ventilation"],
"Underground Services Trench":["Trench excavation 600mm deep","Trench excavation 900mm deep","Trench excavation 1200mm deep","Trench excavation 1500mm deep","Trench sand bedding 50mm","Trench sand bedding 100mm","Trench cable marker tape","Trench warning tape","Trench backfill selected","Trench backfill compacted","Trench cover slab concrete","Trench route marker post","Trench draw pit 450x450","Trench draw pit 600x600"],
"Retaining Walls":["Retaining wall excavation","Retaining wall base 300mm","Retaining wall base 400mm","Retaining wall stem 200mm","Retaining wall stem 250mm","Retaining wall stem 300mm","Retaining wall stem 400mm","Retaining wall height 1.5m","Retaining wall height 2m","Retaining wall height 3m","Retaining wall height 4m","Retaining wall weep holes","Retaining wall drainage gravel","Retaining wall geotextile","Retaining wall waterproofing","Retaining wall coping","Retaining wall expansion joint","Retaining wall counterfort","Retaining wall buttress","Gabion retaining wall 1m","Gabion retaining wall 2m","Gabion retaining wall 3m"],
"Tunnels / Culverts":["Box culvert 600x600mm","Box culvert 900x600mm","Box culvert 1200x900mm","Box culvert 1500x1200mm","Box culvert 1800x1500mm","Box culvert 2000x2000mm","Pipe culvert 600mm dia","Pipe culvert 900mm dia","Pipe culvert 1200mm dia","Pipe culvert 1500mm dia","Headwall inlet concrete","Headwall outlet concrete","Wing walls concrete","Apron/Scour protection","Culvert bedding granular","Culvert backfill compacted"],
"Underground Storage":["Underground fuel tank 5000L","Underground fuel tank 10000L","Underground fuel tank 20000L","Tank hold-down straps","Tank concrete cradle","Tank access manhole","Tank vent pipe","Tank fill pipe","Tank leak detection","Tank cathodic protection","Tank secondary containment"]
};
var UNDERGROUND_STATUS=["Excavated","Blinding done","Reinforcement fixed","Formwork done","Concrete poured","Waterproofed","Backfilled","Tested","Commissioned","Completed"];

RENDER["underground"]=function(){
var h='<h2>Underground Structures</h2><p style="color:#aaa;font-size:12px">Basement, pools, tanks, culverts & retaining walls</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showUGForm()">+ Add Item</button></div>';
var ug=(D.underground||[]);
if(ug.length===0){h+='<p style="color:#666">No underground structures recorded.</p>';}
else{
var cats={};for(var i=0;i<ug.length;i++){var u=ug[i];if(!cats[u.category])cats[u.category]=[];cats[u.category].push(u);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+')</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var u=items[i];h+='<tr><td>'+u.name+'</td><td>'+u.location+'</td><td>'+u.qty+'</td><td><span class="tag '+(u.status==="Completed"||u.status==="Commissioned"?"tag-pass":"tag-open")+'">'+u.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'underground\',\''+u.id+'\');go(\'underground\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};

function showUGForm(){
var cats="";var ck=Object.keys(UNDERGROUND_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Underground Structure</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_ugCat" onchange="loadUGItems()">'+cats+'</select><label>Item:</label><select id="_ugItem"></select><label>Location:</label><input id="_ugLoc" placeholder="e.g. Rear garden, Block B"><div class="row"><div><label>Quantity:</label><input id="_ugQty" type="number" value="1"></div><div><label>Status:</label><select id="_ugStatus">';
for(var i=0;i<UNDERGROUND_STATUS.length;i++){h+='<option>'+UNDERGROUND_STATUS[i]+'</option>';}
h+='</select></div></div><label>Notes:</label><input id="_ugNotes"><button class="btn" onclick="saveUG()">Save Item</button><button class="btn btn-secondary" onclick="go(\'underground\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadUGItems();
}

function loadUGItems(){var cat=document.getElementById("_ugCat").value;var items=UNDERGROUND_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_ugItem").innerHTML=h;}

function saveUG(){
if(!D.underground)D.underground=[];
D.underground.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_ugCat").value,name:document.getElementById("_ugItem").value,location:document.getElementById("_ugLoc").value,qty:document.getElementById("_ugQty").value,status:document.getElementById("_ugStatus").value,notes:document.getElementById("_ugNotes").value,timestamp:Date.now()});
save();toast("Item saved!");go("underground");
}
