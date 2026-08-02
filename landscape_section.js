// ============ LANDSCAPING & EXTERNAL WORKS ============
var LANDSCAPE_CATEGORIES={
"Hard Landscaping - Paving":["Pavers 200x100x60mm grey","Pavers 200x100x60mm red","Pavers 200x100x60mm charcoal","Pavers 200x100x80mm grey","Pavers 200x100x80mm red","Cabro 200x100x60mm","Concrete paving slabs 450x450","Concrete paving slabs 600x600","Flagstones natural stone","Cobblestones granite","Exposed aggregate paving","Stamped concrete paving","Pattern imprinted concrete"],
"Hard Landscaping - Kerbs & Edging":["Kerbs mountable 150x250mm","Kerbs barrier 150x300mm","Edging kerb 100x150mm","Edging kerb 50x150mm","Block edging 200x50mm","Timber edging 150x50mm","Steel edging 3mm","Gravel board 150x25mm","Rope top edging","Log roll edging"],
"Driveways & Roads":["Gravel driveway 20mm","Gravel driveway 10mm","Block paving driveway 60mm","Block paving driveway 80mm","Asphalt driveway AC10","Asphalt driveway AC20","Concrete driveway 150mm thick","Concrete driveway 200mm thick","Cobblestone driveway","Resin bound gravel","Tarmacadam","Road base sub-base","Road base hardcore"],
"Paths & Walkways":["Gravel path 1.2m wide","Stepping stones concrete","Stepping stones natural","Flagstone path","Brick path herringbone","Brick path stretcher bond","Bark/mulch path","Decking path timber"],
"Walls & Boundaries":["Boundary wall stone 230mm","Boundary wall stone 345mm","Boundary wall block 230mm","Boundary wall block 345mm","Retaining wall concrete","Retaining wall stone","Retaining wall gabion","Pillars/brick piers 345x345","Pillars/brick piers 230x230","Gate posts steel","Gate posts timber","Plinth wall with railings","Plinth wall with hedge"],
"Fencing & Gates":["Chain link fence 1.2m","Chain link fence 1.8m","Chain link fence 2.4m","Timber panel fence 1.8m","Timber picket fence 1.2m","Steel palisade fence 2.4m","Electric fence 6 strand","Barbed wire 4 strand","Sliding gate steel 4m","Sliding gate steel 6m","Swing gate steel double 3m","Swing gate steel double 4m","Pedestrian gate steel","Pedestrian gate timber","Gate motor sliding","Gate motor swing","Gate automation control","Intercom gate station"],
"Soft Landscaping - Lawns":["Kikuyu grass sod/turf","Kikuyu grass seed","Bermuda grass","Buffalo grass","Zoysia grass","Artificial turf 20mm","Artificial turf 35mm","Artificial turf 45mm"],
"Soft Landscaping - Plants":["Trees indigenous 2m","Trees indigenous 3m","Trees ornamental flowering","Trees shade/fruit","Palm trees date","Palm trees fan","Shrubs flowering","Shrubs hedge Boxwood","Shrubs hedge Privet","Ground cover Vinca","Ground cover Wandering Jew","Climbers Bougainvillea","Climbers Jasmine","Hanging baskets"],
"Planting & Soil":["Top soil screened","Compost/manure organic","Red soil/earth","Mulch bark 50mm","Mulch bark 75mm","Mulch gravel decorative","Fertiliser slow release","Fertiliser quick release","Water retention crystals","Rooting hormone powder"],
"Irrigation":["Drip irrigation kit","Sprinkler pop-up","Sprinkler rotary","Soaker hose 50m","Garden hose 30m","Garden hose 50m","Hose reel cart","Irrigation controller 4 zone","Irrigation controller 8 zone","Solenoid valve 25mm","Irrigation pipe HDPE 25mm","Irrigation pipe HDPE 32mm","Rain sensor","Moisture sensor","Quick coupler valve","Spray head adjustable","Spray head fixed"],
"Outdoor Structures":["Gazebo timber 3x3m","Gazebo timber 4x4m","Pergola timber 3x3m","Pergola timber 4x6m","Pergola aluminium","Shade sail 3x3m","Shade sail 4x6m","Outdoor kitchen/braai","Fire pit stone","Fire pit steel","Pond liner EPDM","Pond pump/filter","Water feature fountain","Water feature wall","Bird bath","Bird house","Benches concrete","Benches timber","Picnic table","Litter bin","Bollard fixed","Bollard removable"],
"External Lighting":["Bollard light LED 60cm","Bollard light LED 90cm","Spike spot light","Deck light LED","Step light LED","Wall light external","Floodlight 50W LED","Floodlight 100W LED","Garden light solar","Path light solar","String lights festoon","Uplighter tree-mounted","Underwater pond light","Gate pillar light"],
"Drainage & Earthworks":["French drain 100mm","French drain 150mm","Channel drain 100mm","Channel drain 150mm","Catch pit 450x450","Catch pit 600x600","Soakaway crate","Soakaway pit","Subsoil drain perforated 100mm","Geotextile membrane","Earthworks cut to fill","Earthworks cut to spoil","Retaining wall drainage","Slope stabilisation mat","Silt fence","Sandbags"]
};
var LANDSCAPE_STATUS=["Specified","Ordered","Delivered","In progress","Installed","Inspected","Completed"];

RENDER["landscape"]=function(){
var h='<h2>Landscaping & External Works</h2><p style="color:#aaa;font-size:12px">Hard & soft landscaping, irrigation, outdoor structures</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showLandscapeForm()">+ Add Item</button></div>';
var land=(D.landscape||[]);
if(land.length===0){h+='<p style="color:#666">No landscaping items recorded.</p>';}
else{
var cats={};for(var i=0;i<land.length;i++){var l=land[i];if(!cats[l.category])cats[l.category]=[];cats[l.category].push(l);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+')</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th></tr>';
for(var i=0;i<items.length;i++){var l=items[i];h+='<tr><td>'+l.name+'</td><td>'+l.location+'</td><td>'+l.qty+' '+l.unit+'</td><td><span class="tag '+(l.status==="Completed"||l.status==="Inspected"?"tag-pass":"tag-open")+'">'+l.status+'</span></td></tr>';}
h+='</table></div>';}
}
return h;
};
function showLandscapeForm(){
var cats="";var ck=Object.keys(LANDSCAPE_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Landscaping Item</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_lsCat" onchange="loadLandItems()">'+cats+'</select><label>Item:</label><select id="_lsItem"></select><label>Location/Area:</label><input id="_lsLoc" placeholder="e.g. Front garden, Backyard"><div class="row"><div><label>Quantity:</label><input id="_lsQty" type="number" value="1"></div><div><label>Unit:</label><select id="_lsUnit"><option>Pieces</option><option>m2</option><option>Linear m</option><option>Sets</option><option>Bags</option><option>Rolls</option><option>Tons</option></select></div></div><label>Status:</label><select id="_lsStatus">';
for(var i=0;i<LANDSCAPE_STATUS.length;i++){h+='<option>'+LANDSCAPE_STATUS[i]+'</option>';}
h+='</select><label>Notes:</label><input id="_lsNotes"><button class="btn" onclick="saveLandscape()">Save Item</button><button class="btn btn-secondary" onclick="go(\'landscape\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadLandItems();
}
function loadLandItems(){var cat=document.getElementById("_lsCat").value;var items=LANDSCAPE_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_lsItem").innerHTML=h;}
function saveLandscape(){
if(!D.landscape)D.landscape=[];
D.landscape.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_lsCat").value,name:document.getElementById("_lsItem").value,location:document.getElementById("_lsLoc").value,qty:document.getElementById("_lsQty").value,unit:document.getElementById("_lsUnit").value,status:document.getElementById("_lsStatus").value,notes:document.getElementById("_lsNotes").value,timestamp:Date.now()});
save();toast("Item saved!");go("landscape");
}
