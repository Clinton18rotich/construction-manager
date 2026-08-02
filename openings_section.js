// ============ OPENINGS (Doors & Windows) ============
var OPENING_TYPES={
"External Doors":["Main entrance door - Solid hardwood","Main entrance door - Panel","Patio door - Sliding aluminium","Patio door - French","Back door - Flush","Garage door - Roller","Garage door - Sectional","Steel security door"],
"Internal Doors":["Flush door 2100x900","Flush door 2100x800","Panel door 2100x900","Panel door 2100x800","Flush door 2100x700 (toilet)","Flush door 2100x600 (store)","Sliding door - timber","Bi-fold door","Pocket door","Louvre door - closet","Louvre door - pantry"],
"Door Frames":["Hardwood frame 100x50mm","Softwood frame 100x50mm","Metal frame 100x50mm","Aluminium frame","Frame with sidelight","Frame with fanlight"],
"Windows - Aluminium":["Sliding window 1200x1200","Sliding window 1500x1200","Sliding window 1800x1200","Casement window 600x600","Casement window 600x900","Casement window 900x1200","Fixed window 600x1200","Fixed window 1200x1200","Corner window","Bay window"],
"Windows - Steel":["Casement window 600x900","Casement window 900x1200","Fixed window 600x600","Louvre window 600x900","Louvre window 900x1200","Basement window 600x300"],
"Windows - Timber":["Casement window 600x900","Casement window 900x1200","Sliding window 1200x1200","Fixed window 600x600"],
"Glass/Glazing":["Clear float 4mm","Clear float 6mm","Clear float 10mm","Tinted bronze 5mm","Tinted grey 5mm","Obscured 4mm (bathroom)","Laminated safety 6mm","Toughened 6mm","Toughened 10mm","Double glazed unit","Mirror 4mm","Mirror 6mm"],
"Curtain Walling":["Aluminium curtain wall - stick","Aluminium curtain wall - unitized","Structural glazing","Spider glazing","Skylight/Atrium glazing"]
};
var OPENING_STATUS=["Not installed","Frame installed","Leaf/sash installed","Glazed","Hardware fitted","Inspected","Snagged","Completed"];

RENDER["openings"]=function(){
var h='<h2>Openings Schedule</h2><p style="color:#aaa;font-size:12px">Doors, Windows & Glazing</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showOpeningForm()">+ Add Opening</button></div>';
var openings=(D.openings||[]);
if(openings.length===0){h+='<p style="color:#666">No openings recorded. Add doors, windows and glazing.</p>';}
else{
var cats={};for(var i=0;i<openings.length;i++){var o=openings[i];if(!cats[o.category])cats[o.category]=[];cats[o.category].push(o);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+'</h4><table style="font-size:11px"><tr><th>Ref</th><th>Size</th><th>Location</th><th>Qty</th><th>Status</th></tr>';
for(var i=0;i<items.length;i++){var o=items[i];h+='<tr><td>'+o.ref+'</td><td>'+o.size+'</td><td>'+o.location+'</td><td>'+o.qty+'</td><td><span class="tag '+(o.status==="Completed"?"tag-pass":o.status==="Installed"||o.status==="Glazed"?"tag-open":"")+'">'+o.status+'</span></td></tr>';}
h+='</table></div>';
}
}
return h;
};

function showOpeningForm(){
var cats="";var ck=Object.keys(OPENING_TYPES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>Add Opening</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_opCat" onchange="loadOpeningItems()">'+cats+'</select><label>Type/Description:</label><select id="_opItem"></select><label>Reference:</label><input id="_opRef" placeholder="e.g. D01 / W05"><label>Size:</label><input id="_opSize" placeholder="e.g. 2100x900mm"><label>Location/Room:</label><input id="_opLoc" placeholder="e.g. Master Bedroom"><div class="row"><div><label>Quantity:</label><input id="_opQty" type="number" value="1"></div><div><label>Status:</label><select id="_opStatus">';
for(var i=0;i<OPENING_STATUS.length;i++){h+='<option>'+OPENING_STATUS[i]+'</option>';}
h+='</select></div></div><label>Notes:</label><input id="_opNotes"><button class="btn" onclick="saveOpening()">Save Opening</button><button class="btn btn-secondary" onclick="go(\'openings\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadOpeningItems();
}

function loadOpeningItems(){var cat=document.getElementById("_opCat").value;var items=OPENING_TYPES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_opItem").innerHTML=h;}

function saveOpening(){
if(!D.openings)D.openings=[];
D.openings.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_opCat").value,type:document.getElementById("_opItem").value,ref:document.getElementById("_opRef").value,size:document.getElementById("_opSize").value,location:document.getElementById("_opLoc").value,qty:document.getElementById("_opQty").value,status:document.getElementById("_opStatus").value,notes:document.getElementById("_opNotes").value,timestamp:Date.now()});
save();toast("Opening saved!");go("openings");
}
