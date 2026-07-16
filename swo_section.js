// ============ STOP WORK ORDERS ============
var SWO_CATEGORIES={"Safety - Immediate Danger":["Unsafe scaffolding","Excavation collapse risk","Live electrical hazard","Working at height without fall protection","Unsafe crane/lifting operation","Confined space without permit"],"Quality - Major Defect":["Structural failure risk","Wrong concrete grade","Major honeycombing","Foundation bearing inadequate","Reinforcement not as per design","Waterproofing failure"],"Non-Compliance":["Working without approved drawings","Using unapproved materials","Deviation from method statement","Subcontractor not approved","Works outside approved scope"],"Environmental":["Pollution incident","Dust/noise beyond permitted","Damage to protected vegetation","Unauthorized waste disposal"]};
RENDER["stopwork"]=function(){
var list="";var swos=(D.stopWorkOrders||[]).filter(function(e){return e.date===globalDate;});
if(swos.length===0){list='<p style="color:#666">No stop work orders.</p>';}
else{for(var i=0;i<swos.length;i++){var s=swos[i];list+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+s.reason+'</h4><button class="btn btn-red btn-sm" onclick="delItem(\'stopWorkOrders\',\''+s.id+'\');go(\'stopwork\')">X</button></div><p><span class="tag tag-'+(s.status==="active"?"fail":"closed")+'">'+s.status+'</span> | '+s.location+'</p><p style="font-size:12px">Resume conditions: '+s.resumption+'</p></div>';}}
return '<h2>Stop Work Orders</h2><p style="color:#aaa;font-size:12px">Date: '+globalDate+'</p>'+list+'<button class="btn btn-blue" onclick="showSWOForm()">+ New SWO</button>';
};
function showSWOForm(){
var cats="";var ck=Object.keys(SWO_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>New Stop Work Order</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_swoCat" onchange="loadSWOItems()">'+cats+'</select><label>Specific Reason:</label><select id="_swoItem"></select><label>Location:</label><input id="_swoLoc"><label>Work to Stop:</label><textarea id="_swoWork"></textarea><label>Conditions for Resumption:</label><textarea id="_swoResume"></textarea><button class="btn" onclick="saveSWO()">Save SWO</button><button class="btn btn-secondary" onclick="go(\'stopwork\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadSWOItems();
}
function loadSWOItems(){var cat=document.getElementById("_swoCat").value;var items=SWO_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_swoItem").innerHTML=h;}
function saveSWO(){
if(!D.stopWorkOrders)D.stopWorkOrders=[];
D.stopWorkOrders.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_swoCat").value,reason:document.getElementById("_swoItem").value,location:document.getElementById("_swoLoc").value,workToStop:document.getElementById("_swoWork").value,resumption:document.getElementById("_swoResume").value,status:"active",timestamp:Date.now()});
save();toast("SWO saved!");go("stopwork");
}
