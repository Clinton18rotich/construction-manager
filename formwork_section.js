// ============ FORMWORK & SCAFFOLDING ============
var FORMWORK_CATEGORIES={
"Foundation Formwork":["Pad footing sides 300mm","Pad footing sides 600mm","Strip footing sides 300mm","Strip footing sides 600mm","Strip footing sides 900mm","Foundation column kicker 150mm","Foundation column 230x230","Foundation column 300x300","Ground beam sides 300mm","Ground beam sides 600mm","Ground beam sides 900mm","Raft foundation edge board","Raft foundation step","Blinding edge form 50mm","Pile cap formwork"],
"Ground Floor Formwork":["GF slab sides 150mm","GF slab sides 200mm","GF slab sides 250mm","GF slab sides 300mm","GF column 230x230mm","GF column 300x300mm","GF column 400x400mm","GF column rectangular 230x450mm","GF beam sides 230mm","GF beam sides 300mm","GF beam sides 450mm","GF beam soffit 230mm","GF beam soffit 300mm","Staircase waist 150mm","Staircase landing GF","Ramp slab GF"],
"Upper Floor Formwork":["Suspended slab 150mm thick","Suspended slab 175mm thick","Suspended slab 200mm thick","Suspended slab 250mm thick","Upper column 230x230mm","Upper column 300x300mm","Upper column 400x400mm","Upper column rectangular 230x450mm","Upper beam sides 230mm","Upper beam sides 300mm","Upper beam sides 450mm","Upper beam soffit 230mm","Upper beam soffit 300mm","Upper staircase waist 150mm","Upper staircase landing"],
"Roof Level Formwork":["Roof slab 150mm thick","Roof slab 200mm thick","Roof beam sides 230mm","Roof beam sides 300mm","Roof beam soffit 230mm","Parapet wall formwork","Coping formwork","Roof projection/canopy","Water tank base slab","Water tank wall formwork","Lift machine room slab","Lift machine room beams"],
"Circular/Curved Formwork":["Circular column 300mm dia","Circular column 400mm dia","Circular column 500mm dia","Circular column 600mm dia","Curved beam formwork","Curved slab edge","Circular water tank","Curved retaining wall","Spiral staircase formwork","Arched opening formwork"],
"Retaining Walls":["Retaining wall single side 2m high","Retaining wall single side 3m high","Retaining wall single side 4m high","Retaining wall double side 2m","Retaining wall double side 3m","Lift pit formwork","Lift wall formwork","Basement wall formwork","Water tank walls 200mm","Boundary wall formwork"],
"Scaffolding Systems":["H-frame 1.2-2.0m standard","H-frame 2.0-3.0m heavy duty","Cuplock scaffolding system","Tube & fitting scaffolding","Ring-lock system","Kwikstage system","Mobile tower 4m single width","Mobile tower 8m double width","Birdcage scaffold for slab","Access ladder aluminium 3m","Access ladder aluminium 5m","Access ladder timber","Staircase tower scaffold","Cantilever scaffold","Hanging scaffold/suspended","Loading bay scaffold","Scaffold ties/wall anchors"],
"Working Platforms":["Working platform 1.2m wide x 3m","Working platform 1.8m wide x 3m","Working platform 2.4m wide x 3m","Guardrail system top rail","Guardrail system mid rail","Toe board 150mm timber","Toe board 150mm steel","Kick plate","Scaffold boards timber 38mm","Scaffold boards steel","Decking/platform panels","Hop-up platform 500mm","Podium platform 1m","Podium platform 2m"],
"Props & Supports":["Acrow prop No.1 1.2-2.0m","Acrow prop No.2 2.0-3.0m","Acrow prop No.3 3.0-4.0m","Acrow prop heavy duty 3.5-5.0m","Timber props 75mm dia x 2m","Timber props 75mm dia x 3m","Timber props 100mm dia x 3m","Timber props 100mm dia x 4m","Soldiers/walers timber 100x50mm","Soldiers/walers timber 150x50mm","Soldiers/walers steel channel","Adjustable U-head jack","Adjustable base plate","Tripod support for props","Push-pull prop adjustable","Shoring tower/system"],
"Formwork Materials":["Plywood 18mm shuttering 2.4x1.2m","Plywood 12mm soffit 2.4x1.2m","Plywood 9mm lining","Timber boards 25mm x 3m","Timber boards 38mm x 3m","Steel shutters column set","Steel shutters beam set","Steel pans/decking for slab","PVC formwork curved sections","Mould oil/release agent 20L","Tie rods 12mm with nuts","Tie rods 16mm with nuts","Tie rods 20mm with nuts","Form ties/walings steel","Plastic cone for tie rods","PVC sleeve for tie rods","Nails 40mm 1.5in","Nails 75mm 3in","Nails 100mm 4in","Nails 150mm 6in","G-clamp 150mm","G-clamp 300mm","Quick-release clamp","Corner clamp right angle","Form aligner/wedge","Chamfer strip 25mm","Chamfer strip 50mm","Stop end/profile board"],
"Preparation & Checks":["Set out formwork lines from grid","Check verticality with plumb bob","Check alignment with spirit level","Apply mould oil to all surfaces","Fix kickers for columns","Install cover blocks/spacers","Check all dimensions before pour","Check bracing both directions","Check joints sealed against grout loss","Clean formwork before use","Repair damaged formwork","Check props vertical & fully braced","Verify levels with auto level","Check formwork for square/plumb","Inspect ties and clamps tight","Pre-pour inspection by engineer","Check starter bars position","Check service openings blocked","Check construction joint location","Check chamfer strips in place"]
};
var FORMWORK_STATUS=["Not started","Erecting","Erected","Inspected","Concrete poured","Stripped","Cleaned/repaired","Completed"];

RENDER["formwork"]=function(){
var h='<h2>Formwork & Scaffolding</h2><p style="color:#aaa;font-size:12px">Track formwork by category - Foundation to Roof</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showFWForm()">+ Add Formwork</button></div>';
var fw=(D.formwork||[]);
if(fw.length===0){h+='<p style="color:#666">No formwork recorded. Add items from 12 categories covering all building levels.</p>';}
else{
var cats={};for(var i=0;i<fw.length;i++){var f=fw[i];if(!cats[f.category])cats[f.category]=[];cats[f.category].push(f);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+cat+' ('+items.length+')</h4></div><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var f=items[i];h+='<tr><td>'+f.name+'</td><td>'+f.location+'</td><td>'+f.qty+'</td><td><span class="tag '+(f.status==="Completed"||f.status==="Inspected"?"tag-pass":f.status==="Erected"||f.status==="Concrete poured"?"tag-open":"")+'">'+f.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'formwork\',\''+f.id+'\');go(\'formwork\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};

function showFWForm(){
var cats="";var ck=Object.keys(FORMWORK_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Formwork Item</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_fwCat" onchange="loadFWItems()">'+cats+'</select><label>Item:</label><select id="_fwItem"></select><label>Location:</label><input id="_fwLoc" placeholder="e.g. Block A GF, Grid 1-3"><div class="row"><div><label>Quantity:</label><input id="_fwQty" type="number" value="1"></div><div><label>Status:</label><select id="_fwStatus">';
for(var i=0;i<FORMWORK_STATUS.length;i++){h+='<option>'+FORMWORK_STATUS[i]+'</option>';}
h+='</select></div></div><label>Notes:</label><input id="_fwNotes"><button class="btn" onclick="saveFW()">Save Item</button><button class="btn btn-secondary" onclick="go(\'formwork\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadFWItems();
}

function loadFWItems(){var cat=document.getElementById("_fwCat").value;var items=FORMWORK_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_fwItem").innerHTML=h;}

function saveFW(){
if(!D.formwork)D.formwork=[];
D.formwork.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_fwCat").value,name:document.getElementById("_fwItem").value,location:document.getElementById("_fwLoc").value,qty:document.getElementById("_fwQty").value,status:document.getElementById("_fwStatus").value,notes:document.getElementById("_fwNotes").value,timestamp:Date.now()});
save();toast("Formwork saved!");go("formwork");
}
