// ============ RFIs ============
var RFI_CATEGORIES={"Structural":["Clarify reinforcement detail","Confirm concrete grade","Clarify foundation depth","Confirm rebar size/spacing","Clarify construction joint locations","Request structural approval for substitution","Confirm load-bearing capacity"],"Architectural":["Clarify floor finish type","Confirm ceiling height","Clarify wall finish","Request door/window schedule","Clarify colour scheme","Confirm tile size/pattern","Request elevation detail"],"Plumbing":["Clarify pipe sizing","Confirm drainage invert levels","Request plumbing schematic","Clarify water tank capacity","Confirm sanitary ware specification"],"Electrical":["Clarify cable sizing","Confirm DB location","Request lighting layout","Clarify emergency lighting","Confirm socket heights","Request earthing detail"]};
RENDER["rfi"]=function(){
var list="";var rfis=(D.rfis||[]).filter(function(e){return e.date===globalDate;});
if(rfis.length===0){list='<p style="color:#666">No RFIs for this date.</p>';}
else{for(var i=0;i<rfis.length;i++){var r=rfis[i];list+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+r.subject+'</h4><button class="btn btn-red btn-sm" onclick="delItem(\'rfis\',\''+r.id+'\');go(\'rfi\')">X</button></div><p><span class="tag tag-'+(r.status==="open"?"open":"closed")+'">'+r.status+'</span> | To: '+r.sentTo+'</p><p style="font-size:12px">'+r.question+'</p></div>';}}
return '<h2>Requests for Information</h2><p style="color:#aaa;font-size:12px">Date: '+globalDate+'</p>'+list+'<button class="btn btn-blue" onclick="showRFIForm()">+ New RFI</button>';
};
function showRFIForm(){
var cats="";var ck=Object.keys(RFI_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>New RFI</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_rfiCat" onchange="loadRFIItems()">'+cats+'</select><label>Specific Question:</label><select id="_rfiItem"></select><label>Subject:</label><input id="_rfiSubj" placeholder="Brief subject"><label>Sent To:</label><input id="_rfiTo" placeholder="Consultant/Engineer"><label>Full Details:</label><textarea id="_rfiDetail"></textarea><button class="btn" onclick="saveRFI()">Save RFI</button><button class="btn btn-secondary" onclick="go(\'rfi\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadRFIItems();
}
function loadRFIItems(){var cat=document.getElementById("_rfiCat").value;var items=RFI_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_rfiItem").innerHTML=h;}
function saveRFI(){
if(!D.rfis)D.rfis=[];
D.rfis.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_rfiCat").value,question:document.getElementById("_rfiItem").value,subject:document.getElementById("_rfiSubj").value,sentTo:document.getElementById("_rfiTo").value,detail:document.getElementById("_rfiDetail").value,status:"open",timestamp:Date.now()});
save();toast("RFI saved!");go("rfi");
}
