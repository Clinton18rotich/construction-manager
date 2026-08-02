// ============ SCHEDULE OF FINISHES ============
var FINISH_TYPES={
"Floor Finishes":["Screed only","Ceramic tiles 400x400","Ceramic tiles 500x500","Ceramic tiles 600x600","Porcelain tiles","Terrazzo","Epoxy floor","PVC tiles","Wood parquet","Carpet","Polished concrete","Granite/Marble"],
"Wall Finishes":["Plaster & paint","Ceramic wall tiles 200x300","Ceramic wall tiles 300x600","Full height tiling","Dado/splashback tiles","Wallpaper","Cladding - timber","Cladding - stone","Fair faced concrete","Textured paint","Glass panels"],
"Ceiling Finishes":["Plaster & paint","Suspended ceiling - grid","Suspended ceiling - gypsum","Suspended ceiling - acoustic","PVC ceiling panels","Timber ceiling","Exposed concrete","Bulkhead/drop ceiling","Cove ceiling"],
"Skirting":["Tile skirting 100mm","Tile skirting 150mm","Timber skirting 100mm","Timber skirting 150mm","PVC skirting","Granite skirting","Metal skirting","None"],
"Architraves":["Timber architrave 50mm","Timber architrave 75mm","PVC architrave","None"],
"Ironmongery":["Stainless steel","Brass","Chrome","Satin nickel","Black powder coat","White powder coat"]
};
var FINISH_ROOMS=["Living Room","Dining Room","Kitchen","Master Bedroom","Bedroom 2","Bedroom 3","Bedroom 4","Master Ensuite","Bathroom 1","Bathroom 2","Guest Toilet","Corridor/Hallway","Staircase","Balcony/Terrace","Store/Utility","External Walls"];
var FINISH_STATUS=["Not started","In progress","Completed","Inspected","Snagged","Handed over"];

RENDER["finishes"]=function(){
var h='<h2>Schedule of Finishes</h2><p style="color:#aaa;font-size:12px">Track finishes room by room</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showFinishForm()">+ Add Room Finish</button></div>';

var finishes=(D.finishes||[]).filter(function(e){return e.date===globalDate;});
if(finishes.length===0){finishes=D.finishes||[];}

var rooms={};
for(var i=0;i<finishes.length;i++){var f=finishes[i];if(!rooms[f.room])rooms[f.room]=[];rooms[f.room].push(f);}

var roomKeys=Object.keys(rooms);
if(roomKeys.length===0){h+='<p style="color:#666">No finishes recorded yet. Add rooms and their finish specifications.</p>';}
else{
for(var r=0;r<roomKeys.length;r++){var room=roomKeys[r];var items=rooms[room];
h+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+room+'</h4><button class="btn btn-sm" style="background:#ff3b30;color:#fff;padding:4px 8px;font-size:10px" onclick="deleteRoom(\''+room+'\')">Remove Room</button></div>';
h+='<table style="font-size:11px"><tr><th>Category</th><th>Specification</th><th>Status</th><th>Notes</th></tr>';
for(var i=0;i<items.length;i++){var f=items[i];
h+='<tr><td>'+f.category+'</td><td>'+f.spec+'</td><td><span class="tag '+(f.status==="Completed"||f.status==="Handed over"?"tag-pass":f.status==="In progress"?"tag-open":"")+'">'+f.status+'</span></td><td style="font-size:10px">'+(f.notes||"")+'</td></tr>';
}
h+='</table></div>';
}
}
return h;
};

function showFinishForm(){
var rooms="";for(var i=0;i<FINISH_ROOMS.length;i++){rooms+='<option>'+FINISH_ROOMS[i]+'</option>';}
var cats="";var ck=Object.keys(FINISH_TYPES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>Add Room Finish</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Room:</label><select id="_fRoom">'+rooms+'</select><label>Category:</label><select id="_fCat" onchange="loadFinishItems()">'+cats+'</select><label>Specification:</label><select id="_fItem"></select><label>Status:</label><select id="_fStatus">';
for(var i=0;i<FINISH_STATUS.length;i++){h+='<option>'+FINISH_STATUS[i]+'</option>';}
h+='</select><label>Notes:</label><input id="_fNotes" placeholder="Any notes"><button class="btn" onclick="saveFinish()">Save Finish</button><button class="btn btn-secondary" onclick="go(\'finishes\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadFinishItems();
}

function loadFinishItems(){var cat=document.getElementById("_fCat").value;var items=FINISH_TYPES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_fItem").innerHTML=h;}

function saveFinish(){
if(!D.finishes)D.finishes=[];
D.finishes.push({id:uid(),date:document.getElementById("_entryDate").value,room:document.getElementById("_fRoom").value,category:document.getElementById("_fCat").value,spec:document.getElementById("_fItem").value,status:document.getElementById("_fStatus").value,notes:document.getElementById("_fNotes").value,timestamp:Date.now()});
save();toast("Finish saved!");go("finishes");
}

function deleteRoom(room){
if(confirm("Remove all finishes for "+room+"?")){
D.finishes=(D.finishes||[]).filter(function(f){return f.room!==room;});
save();go("finishes");
}
}
