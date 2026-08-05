// ============ INTERIOR DESIGN ============
var INTERIOR_CATEGORIES={
"False Ceilings & Bulkheads":["Suspended ceiling - gypsum board 9mm","Suspended ceiling - gypsum board 12mm","Suspended ceiling - acoustic tiles","Suspended ceiling - mineral fiber","Suspended ceiling - PVC panels","Bulkhead - straight","Bulkhead - curved","Bulkhead - stepped","Bulkhead with concealed lighting","Bulkhead with curtain track","Cove ceiling - plaster","Cove ceiling - timber","Ceiling rose/medallion","Ceiling dome","Tray ceiling","Drop ceiling panel"],
"Wall Paneling & Features":["Feature wall - timber cladding","Feature wall - stone cladding","Feature wall - brick slips","Feature wall - 3D panels","Feature wall - textured paint","Feature wall - wallpaper mural","Wall paneling - wainscoting","Wall paneling - shaker style","Wall paneling - raised panel","Wall paneling - PVC panels","Acoustic wall panels","Leather/fabric wall panels","Slat wall - timber","Slat wall - MDF","TV feature wall with backing","Headboard feature wall"],
"Coving & Cornices":["Coving - plaster 100mm","Coving - plaster 150mm","Coving - polystyrene 100mm","Coving - polystyrene 150mm","Cornice - plaster ornate","Cornice - plaster plain","Cornice - gypsum","Cornice - timber","Picture rail - timber","Picture rail - plaster","Dado rail - timber","Dado rail - plaster","Skirting - timber 100mm","Skirting - timber 150mm","Skirting - MDF 100mm","Skirting - PVC","Shadow gap detail"],
"Window Treatments":["Curtains - eyelet","Curtains - pencil pleat","Curtains - pinch pleat","Curtains - double layer (sheer + blackout)","Curtain track - wall mounted","Curtain track - ceiling mounted","Curtain track - motorized","Blinds - roller","Blinds - Venetian aluminium","Blinds - Venetian timber","Blinds - vertical","Blinds - Roman","Blinds - blackout","Blinds - motorized","Pelmet - timber","Pelmet - upholstered","Valance","Window seat with storage"],
"Built-in Furniture":["TV unit - floor mounted","TV unit - wall mounted/floating","Bookshelf - floor to ceiling","Bookshelf - wall mounted","Display cabinet - with glass doors","Display cabinet - open shelving","Shoe cabinet - with seat","Shoe cabinet - pull-out","Wardrobe - sliding doors","Wardrobe - hinged doors","Wardrobe - walk-in system","Dressing table with mirror","Study desk - built-in","Study desk - wall mounted","Bed with storage drawers","Bed with hydraulic storage","Bunk bed - built-in","Window seat with storage","Bench seating - dining","Bench seating - bay window"],
"Partitions & Screens":["Glass partition - framed","Glass partition - frameless","Glass partition - frosted/etched","Glass partition - fluted","Drywall partition - standard","Drywall partition - acoustic","Drywall partition - fire rated","Movable partition - sliding","Movable partition - folding","Timber partition - slatted","Timber partition - solid","Metal partition - laser cut","Decorative screen - timber","Decorative screen - metal","Room divider - open shelving","Room divider - with storage"],
"Mirrors":["Wall mirror - framed","Wall mirror - frameless","Wall mirror - bevelled edge","Wall mirror - with shelf","Wall mirror - full length","Wall mirror - bathroom with demister","Mirror - wardrobe door mounted","Mirror - backlit LED","Mirror - with makeup lights","Mirror - decorative sunburst","Mirror - gym/dance wall mounted","Mirror - hallway console set","Mirror - decorative wall panels"],
"Internal Signage":["Room name sign - acrylic","Room name sign - metal","Room name sign - timber","Directional sign - wall mounted","Directional sign - hanging","Floor number sign","Exit sign - photoluminescent","Exit sign - LED","Fire escape plan","Braille signage","Toilet sign - male/female","Toilet sign - accessible","Door number","Information board","Notice board - fabric","Notice board - magnetic"],
"Soft Furnishings":["Cushions - scatter","Cushions - floor","Throw pillows","Rug - area","Rug - runner","Carpet - wall to wall","Carpet - stair runner","Wall tapestry/hanging","Artificial plants/trees","Room divider curtain","Bean bags","Floor pouf/ottoman","Bench cushion","Window seat cushion"]
};
var INTERIOR_STATUS=["Specified","Ordered","Delivered","Installed","Inspected","Completed"];

RENDER["interior"]=function(){
var h='<h2>Interior Design</h2><p style="color:#aaa;font-size:12px">Ceilings, walls, furniture, partitions & finishes</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showInteriorForm()">+ Add Item</button></div>';
var interior=(D.interior||[]);
if(interior.length===0){h+='<p style="color:#666">No interior design items recorded.</p>';}
else{
var cats={};for(var i=0;i<interior.length;i++){var it=interior[i];if(!cats[it.category])cats[it.category]=[];cats[it.category].push(it);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+')</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var it=items[i];h+='<tr><td>'+it.name+'</td><td>'+it.location+'</td><td>'+it.qty+'</td><td><span class="tag '+(it.status==="Completed"||it.status==="Inspected"?"tag-pass":"tag-open")+'">'+it.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:2px 6px;font-size:10px" onclick="delItem(\'interior\',\''+it.id+'\');go(\'interior\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};

function showInteriorForm(){
var cats="";var ck=Object.keys(INTERIOR_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Interior Item</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_intCat" onchange="loadIntItems()">'+cats+'</select><label>Item:</label><select id="_intItem"></select><label>Location/Room:</label><input id="_intLoc" placeholder="e.g. Master Bedroom"><div class="row"><div><label>Quantity:</label><input id="_intQty" type="number" value="1"></div><div><label>Status:</label><select id="_intStatus">';
for(var i=0;i<INTERIOR_STATUS.length;i++){h+='<option>'+INTERIOR_STATUS[i]+'</option>';}
h+='</select></div></div><label>Notes:</label><input id="_intNotes"><button class="btn" onclick="saveInterior()">Save</button><button class="btn btn-secondary" onclick="go(\'interior\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadIntItems();
}
function loadIntItems(){var cat=document.getElementById("_intCat").value;var items=INTERIOR_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_intItem").innerHTML=h;}
function saveInterior(){if(!D.interior)D.interior=[];var d=document.getElementById("_entryDate").value;var name=document.getElementById("_intItem").value;var loc=document.getElementById("_intLoc").value;D.interior.push({id:uid(),date:d,category:document.getElementById("_intCat").value,name:name,location:loc,qty:document.getElementById("_intQty").value,status:document.getElementById("_intStatus").value,notes:document.getElementById("_intNotes").value,timestamp:Date.now()});autoDiary("Interior - "+name,loc,"Category: "+document.getElementById("_intCat").value+" | Status: "+document.getElementById("_intStatus").value,d);save();toast("Saved + diary!");go("interior");}
