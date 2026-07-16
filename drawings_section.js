// ============ DRAWINGS REGISTER ============
RENDER["drawings"]=function(){
var list="";var drawings=D.drawings||[];
if(drawings.length===0){list='<p style="color:#666">No drawings registered.</p>';}
else{for(var i=0;i<drawings.length;i++){var d=drawings[i];list+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+d.number+'</h4><button class="btn btn-red btn-sm" onclick="delItem(\'drawings\',\''+d.id+'\');go(\'drawings\')">X</button></div><p>'+d.title+'</p><p style="font-size:12px;color:#aaa">Rev: '+d.revision+' | Discipline: '+d.discipline+' | Received: '+d.dateReceived+'</p></div>';}}
return '<h2>Drawings Register</h2>'+list+'<button class="btn btn-blue" onclick="showDrawingForm()">+ Add Drawing</button>';
};
function showDrawingForm(){
var h='<h3>Add Drawing</h3><label>Drawing Number:</label><input id="_dwgNo" placeholder="e.g. STR/001"><label>Title:</label><input id="_dwgTitle" placeholder="Drawing title"><label>Discipline:</label><select id="_dwgDisc"><option>Structural</option><option>Architectural</option><option>Civil</option><option>Mechanical</option><option>Electrical</option><option>Plumbing</option><option>Fire Services</option><option>Landscape</option><option>Interior Design</option></select><label>Revision:</label><input id="_dwgRev" placeholder="A"><label>Date Received:</label><input type="date" id="_dwgDate" value="'+globalDate+'"><label>Notes:</label><textarea id="_dwgNotes" placeholder="Any notes about this drawing"></textarea><button class="btn" onclick="saveDrawing()">Save Drawing</button><button class="btn btn-secondary" onclick="go(\'drawings\')">Cancel</button>';
document.getElementById("content").innerHTML=h;
}
function saveDrawing(){
if(!D.drawings)D.drawings=[];
D.drawings.push({id:uid(),number:document.getElementById("_dwgNo").value,title:document.getElementById("_dwgTitle").value,discipline:document.getElementById("_dwgDisc").value,revision:document.getElementById("_dwgRev").value,dateReceived:document.getElementById("_dwgDate").value,notes:document.getElementById("_dwgNotes").value,timestamp:Date.now()});
save();toast("Drawing saved!");go("drawings");
}
