// ============ FIXTURES & FITTINGS ============
var FIXTURE_CATEGORIES={
"Sanitary Ware":["WC - Floor mounted close coupled","WC - Wall hung","WC - Squat pan","Basin - Pedestal","Basin - Wall hung","Basin - Counter top","Urinal - Bowl","Urinal - Slab","Bidet","Bath tub 1700mm","Shower tray 900x900","Shower tray 1200x800"],
"Sanitary Fittings":["Basin mixer tap","Sink mixer tap","Bib tap 15mm","Bib tap 20mm","Shower mixer valve","Shower head 6in","Shower head 8in","Soap dish - ceramic","Soap dish - stainless","Toilet paper holder","Towel rail 600mm","Towel rail 900mm","Robe hook","Grab bar 300mm","Grab bar 600mm","Mirror 600x900","Mirror cabinet"],
"Kitchen Fittings":["Sink - Single bowl stainless","Sink - Double bowl stainless","Sink - Granite composite","Kitchen mixer tap","Dishwasher connection","Washing machine point","Extractor hood","Kitchen cabinet - wall","Kitchen cabinet - base","Granite countertop","Marble countertop"],
"Electrical Fixtures":["LED downlight 10W","LED downlight 18W","LED panel light 600x600","LED strip light","Chandelier","Pendant light","Wall light","Bulkhead light","Emergency exit light","Sensor light","Ceiling fan","Exhaust fan","Bell/Chime","CCTV camera","Video intercom"],
"Switch & Socket":["Switch 1-gang 1-way","Switch 1-gang 2-way","Switch 2-gang 1-way","Switch 2-gang 2-way","Socket 13A single","Socket 13A double","Socket 15A (cooker)","USB socket","Shaver socket","TV point","Data/LAN point","Telephone point","Blank plate"],
"Door Hardware":["Door lock - Mortice 2.5in","Door lock - Mortice 3in","Door lock - Cylindrical","Door handles - Lever","Door handles - Knob","Hinges 3in SS","Hinges 4in SS","Door closer - Overhead","Door closer - Floor spring","Door stopper - Floor","Door stopper - Wall","Door viewer","Door chain","Tower bolt 6in","Tower bolt 9in","Barrel bolt 4in","Padlock 40mm","Padlock 50mm"],
"Window Hardware":["Window handle - Aluminium","Window handle - Steel","Window stay 300mm","Window stay 450mm","Sliding window lock","Casement stay","Window restrictor","Window seal - Rubber"],
"Bathroom Accessories":["Soap dispenser","Hand dryer","Paper towel dispenser","Waste bin - stainless","Bathroom shelf - glass","Shower curtain rail","Shower curtain","Bath mat"]
};
var FIXTURE_STATUS=["Specified","Ordered","Delivered","Installed","Inspected","Completed"];

RENDER["fixtures"]=function(){
var h='<h2>Fixtures & Fittings</h2><p style="color:#aaa;font-size:12px">Track fixtures by category</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showFixtureForm()">+ Add Fixture</button></div>';

var fixtures=(D.fixtures||[]);
if(fixtures.length===0){h+='<p style="color:#666">No fixtures recorded. Add fixtures and track their status.</p>';}
else{
var cats={};
for(var i=0;i<fixtures.length;i++){var f=fixtures[i];if(!cats[f.category])cats[f.category]=[];cats[f.category].push(f);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+'</h4><table style="font-size:11px"><tr><th>Item</th><th>Location</th><th>Qty</th><th>Status</th></tr>';
for(var i=0;i<items.length;i++){var f=items[i];h+='<tr><td>'+f.name+'</td><td>'+f.location+'</td><td>'+f.qty+'</td><td><span class="tag '+(f.status==="Completed"||f.status==="Installed"?"tag-pass":f.status==="Delivered"||f.status==="Ordered"?"tag-open":"")+'">'+f.status+'</span></td></tr>';}
h+='</table></div>';
}
}
return h;
};

function showFixtureForm(){
var cats="";var ck=Object.keys(FIXTURE_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>Add Fixture/Fitting</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_fixCat" onchange="loadFixtureItems()">'+cats+'</select><label>Item:</label><select id="_fixItem"></select><label>Location:</label><input id="_fixLoc" placeholder="e.g. Master Ensuite"><div class="row"><div><label>Quantity:</label><input id="_fixQty" type="number" value="1"></div><div><label>Status:</label><select id="_fixStatus">';
for(var i=0;i<FIXTURE_STATUS.length;i++){h+='<option>'+FIXTURE_STATUS[i]+'</option>';}
h+='</select></div></div><label>Notes:</label><input id="_fixNotes"><button class="btn" onclick="saveFixture()">Save Fixture</button><button class="btn btn-secondary" onclick="go(\'fixtures\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadFixtureItems();
}

function loadFixtureItems(){var cat=document.getElementById("_fixCat").value;var items=FIXTURE_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_fixItem").innerHTML=h;}

function saveFixture(){
if(!D.fixtures)D.fixtures=[];
D.fixtures.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_fixCat").value,name:document.getElementById("_fixItem").value,location:document.getElementById("_fixLoc").value,qty:document.getElementById("_fixQty").value,status:document.getElementById("_fixStatus").value,notes:document.getElementById("_fixNotes").value,timestamp:Date.now()});
save();toast("Fixture saved!");go("fixtures");
}
