// ============ BAR BENDING SCHEDULE ============
var BBS_CATEGORIES={
"Foundations":["Pad footing bottom bars Y12","Pad footing bottom bars Y16","Pad footing bottom bars Y20","Strip footing long bars Y12","Strip footing long bars Y16","Strip footing transverse bars Y12","Strip footing transverse bars Y16","Raft bottom mesh Y12@200","Raft bottom mesh Y16@200","Raft top mesh Y12@200","Raft top mesh Y16@200","Ground beam bottom Y16","Ground beam bottom Y20","Ground beam top Y12","Ground beam top Y16","Ground beam stirrups R8","Ground beam stirrups R10","Pile cap bottom Y20","Pile cap bottom Y25","Pile cap links R10"],
"Columns":["Column main bars Y12","Column main bars Y16","Column main bars Y20","Column main bars Y25","Column links/stirrups R8@150","Column links/stirrups R8@200","Column links/stirrups R10@150","Column links/stirrups R10@200","Column starter bars Y12","Column starter bars Y16","Column starter bars Y20","Column dowel bars Y16","Column dowel bars Y20"],
"Beams":["Beam bottom bars Y12","Beam bottom bars Y16","Beam bottom bars Y20","Beam bottom bars Y25","Beam top bars Y12","Beam top bars Y16","Beam top bars Y20","Beam extra top at supports Y16","Beam extra top at supports Y20","Beam stirrups R8@200","Beam stirrups R8@150","Beam stirrups R10@200","Beam stirrups R10@150","Beam side face bars Y12","Beam torsion links R8"],
"Slabs":["Slab bottom bars Y10@200","Slab bottom bars Y12@200","Slab bottom bars Y16@200","Slab top bars Y10@200","Slab top bars Y12@200","Slab top bars Y16@200","Slab extra top at supports Y12","Slab extra top at supports Y16","BRC mesh A142","BRC mesh A193","BRC mesh A252","Slab distribution bars Y10","Slab distribution bars Y12","Slab chair/spacer bars R8","Slab chair/spacer bars R10","Slab trimmer bars Y16","Slab trimmer bars Y20"],
"Staircase":["Staircase waist bottom Y12","Staircase waist bottom Y16","Staircase waist top Y12","Staircase waist top Y16","Staircase distribution Y10@200","Staircase distribution Y12@200","Staircase landing bottom Y12","Staircase landing bottom Y16","Staircase landing top Y12","Staircase landing distribution Y10"],
"Retaining Walls":["Retaining wall vertical Y12@200","Retaining wall vertical Y16@200","Retaining wall vertical Y20@200","Retaining wall horizontal Y10@200","Retaining wall horizontal Y12@200","Retaining wall horizontal Y16@200","Retaining wall base bottom Y16","Retaining wall base bottom Y20","Retaining wall base top Y12","Retaining wall base top Y16","Retaining wall links/stirrups R8"],
"Water Tanks":["Tank base bottom Y12@200","Tank base bottom Y16@200","Tank base top Y12@200","Tank base top Y16@200","Tank walls vertical Y12@200","Tank walls vertical Y16@200","Tank walls horizontal Y10@200","Tank walls horizontal Y12@200","Tank roof bottom Y10@200","Tank roof bottom Y12@200","Tank roof top Y10@200"],
"Miscellaneous":["Lintel bars Y10","Lintel bars Y12","Lintel stirrups R6","Lintel stirrups R8","Ring beam bars Y10","Ring beam bars Y12","Ring beam stirrups R6","Ring beam stirrups R8","Coping/parapet bars Y10","Coping/parapet bars Y12","Brick force/hoop iron 25mm","Brick force/hoop iron 30mm","Dowel bars for extension Y12","Dowel bars for extension Y16","Binding wire 1.6mm black","Binding wire 1.6mm galvanized","Spacer blocks 25mm","Spacer blocks 40mm","Spacer blocks 50mm","Cover blocks circular"]
};
var BBS_BAR_SHAPES={
"Straight bar":"Length + 2 x anchorage",
"L-shape bar":"Horizontal + vertical - cover + hook",
"U-shape/stirrup":"2 x legs + 2 x hooks - bends",
"Link/closed stirrup":"Perimeter + 1 hook length",
"Cranked/tension bar":"Length + 2 cranks + anchorage",
"Mesh/sheet":"Standard 4.8m x 2.4m sheets",
"Spiral/helical":"Pi x diameter x number of turns"
};
var BBS_STATUS=["Not fabricated","Fabricated","Delivered","Fixed/installed","Inspected","Approved"];

RENDER["bbs"]=function(){
var h='<h2>Bar Bending Schedule (BBS)</h2><p style="color:#aaa;font-size:12px">Reinforcement steel tracking by structural element</p>';
h+='<div style="display:flex;gap:8px;margin:10px 0"><button class="btn btn-blue btn-sm" onclick="showBBSForm()">+ Add Bar</button></div>';
var bbs=(D.bbs||[]);
if(bbs.length===0){h+='<p style="color:#666">No reinforcement recorded. Add bars by category and track fabrication.</p>';}
else{
var cats={};for(var i=0;i<bbs.length;i++){var b=bbs[i];if(!cats[b.category])cats[b.category]=[];cats[b.category].push(b);}
var ck=Object.keys(cats);
for(var c=0;c<ck.length;c++){var cat=ck[c];var items=cats[cat];
h+='<div class="card"><h4>'+cat+' ('+items.length+' bars)</h4><table style="font-size:10px"><tr><th>Bar Ref</th><th>Type/Size</th><th>No.Off</th><th>Length(m)</th><th>Total(m)</th><th>Wt(kg)</th><th>Status</th><th></th></tr>';
for(var i=0;i<items.length;i++){var b=items[i];var totLen=b.qty*b.length;var wt=(totLen*parseFloat(b.wtPerM||0.888)).toFixed(1);h+='<tr><td>'+b.ref+'</td><td>'+b.name+'</td><td>'+b.qty+'</td><td>'+b.length+'</td><td>'+totLen+'</td><td>'+wt+'</td><td><span class="tag '+(b.status==="Approved"||b.status==="Inspected"?"tag-pass":"tag-open")+'">'+b.status+'</span></td><td><button class="btn btn-red btn-sm" style="padding:1px 4px;font-size:9px" onclick="delItem(\'bbs\',\''+b.id+'\');go(\'bbs\')">X</button></td></tr>';}
h+='</table></div>';}
}
return h;
};

function showBBSForm(){
var cats="";var ck=Object.keys(BBS_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option value="'+ck[i]+'">'+ck[i]+'</option>';}
var h='<h3>Add Reinforcement Bar</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_bbsCat" onchange="loadBBSItems()">'+cats+'</select><label>Bar Type/Size:</label><select id="_bbsItem"></select><label>Bar Reference:</label><input id="_bbsRef" placeholder="e.g. B1, C2, S1"><div class="row"><div><label>Number Off:</label><input id="_bbsQty" type="number" value="1"></div><div><label>Length per bar (m):</label><input id="_bbsLen" type="number" step="0.01" value="6.0"></div></div><div class="row"><div><label>Weight/m (kg):</label><select id="_bbsWt"><option value="0.222">R6 - 0.222</option><option value="0.395">R8 - 0.395</option><option value="0.617">R10 - 0.617</option><option value="0.888" selected>Y12 - 0.888</option><option value="1.579">Y16 - 1.579</option><option value="2.466">Y20 - 2.466</option><option value="3.854">Y25 - 3.854</option><option value="6.313">Y32 - 6.313</option></select></div><div><label>Status:</label><select id="_bbsStatus">';
for(var i=0;i<BBS_STATUS.length;i++){h+='<option>'+BBS_STATUS[i]+'</option>';}
h+='</select></div></div><label>Location:</label><input id="_bbsLoc" placeholder="e.g. Foundation F1, Column C3"><label>Notes:</label><input id="_bbsNotes"><button class="btn" onclick="saveBBS()">Save Bar</button><button class="btn btn-secondary" onclick="go(\'bbs\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadBBSItems();
}

function loadBBSItems(){var cat=document.getElementById("_bbsCat").value;var items=BBS_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_bbsItem").innerHTML=h;}

function saveBBS(){
if(!D.bbs)D.bbs=[];
D.bbs.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_bbsCat").value,name:document.getElementById("_bbsItem").value,ref:document.getElementById("_bbsRef").value,qty:parseFloat(document.getElementById("_bbsQty").value),length:parseFloat(document.getElementById("_bbsLen").value),wtPerM:parseFloat(document.getElementById("_bbsWt").value),status:document.getElementById("_bbsStatus").value,location:document.getElementById("_bbsLoc").value,notes:document.getElementById("_bbsNotes").value,timestamp:Date.now()});
save();toast("Bar saved!");go("bbs");
}
