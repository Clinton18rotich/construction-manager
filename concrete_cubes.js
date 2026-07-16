// ============ CONCRETE CUBE TESTS ============
var CUBE_GRADES=["C15/20","C20/25","C25/30","C30/37","C35/45","C40/50"];
var POUR_LOCATIONS=["Foundations - Pad Footing","Foundations - Strip Footing","Ground Floor Slab","Column - GF","Column - 1F","Column - 2F","Beam - GF","Beam - 1F","Suspended Slab 1F","Suspended Slab Roof","Staircase","Retaining Wall","Lift Pit","Septic Tank","Underground Tank","Boundary Wall Foundation","Drainage Works","External Paving"];
RENDER["cubes"]=function(){
var list="";var cubes=(D.concreteCubes||[]).filter(function(e){return e.date===globalDate;});
if(cubes.length===0){list='<p style="color:#666">No cube tests for this date.</p>';}
else{for(var i=0;i<cubes.length;i++){var c=cubes[i];var r7=c.r7?c.r7+' N/mm2':'Pending';var r14=c.r14?c.r14+' N/mm2':'Pending';var r28=c.r28?c.r28+' N/mm2':'Pending';var pass=c.r28&&c.r28>=c.required?'tag-pass':c.r28&&c.r28<c.required?'tag-fail':'tag-open';var status=c.r28?(c.r28>=c.required?'PASS':'FAIL'):'PENDING';list+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>Cube '+c.cubeId+'</h4><button class="btn btn-red btn-sm" onclick="delItem(\'concreteCubes\',\''+c.id+'\');go(\'cubes\')">X</button></div><p>Grade: '+c.grade+' | Pour: '+c.pourDate+' | '+c.location+'</p><div class="row"><div><small>7-Day</small><br><b>'+r7+'</b></div><div><small>14-Day</small><br><b>'+r14+'</b></div><div><small>28-Day</small><br><b>'+r28+'</b></div></div><p>Required: '+c.required+' N/mm2 | <span class="tag '+pass+'">'+status+'</span></p></div>';}}
return '<h2>Concrete Cube Tests</h2><p style="color:#aaa;font-size:12px">Date: '+globalDate+'</p>'+list+'<button class="btn btn-blue" onclick="showCubeForm()">+ Add Cube Test</button>';
};
function showCubeForm(){
var g="";for(var i=0;i<CUBE_GRADES.length;i++){g+='<option>'+CUBE_GRADES[i]+'</option>';}
var l="";for(var i=0;i<POUR_LOCATIONS.length;i++){l+='<option>'+POUR_LOCATIONS[i]+'</option>';}
var h='<h3>New Cube Test</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Cube ID:</label><input id="_cubeId" placeholder="e.g. CUBE-001"><label>Concrete Grade:</label><select id="_cubeGrade">'+g+'</select><label>Pour Location:</label><select id="_cubeLoc">'+l+'</select><label>Pour Date:</label><input type="date" id="_pourDate" value="'+globalDate+'"><label>Required Strength (N/mm2):</label><input id="_cubeReq" type="number" value="25"><div class="row"><div><label>7-Day (N/mm2):</label><input id="_cube7" type="number" step="0.1"></div><div><label>14-Day:</label><input id="_cube14" type="number" step="0.1"></div><div><label>28-Day:</label><input id="_cube28" type="number" step="0.1"></div></div><button class="btn" onclick="saveCube()">Save Cube</button><button class="btn btn-secondary" onclick="go(\'cubes\')">Cancel</button>';
document.getElementById("content").innerHTML=h;
}
function saveCube(){
if(!D.concreteCubes)D.concreteCubes=[];
var g=document.getElementById("_cubeGrade").value;
var req={"C15/20":15,"C20/25":20,"C25/30":25,"C30/37":30,"C35/45":35,"C40/50":40}[g]||25;
D.concreteCubes.push({id:uid(),date:document.getElementById("_entryDate").value,cubeId:document.getElementById("_cubeId").value,grade:g,location:document.getElementById("_cubeLoc").value,pourDate:document.getElementById("_pourDate").value,required:parseFloat(document.getElementById("_cubeReq").value)||req,r7:document.getElementById("_cube7").value||null,r14:document.getElementById("_cube14").value||null,r28:document.getElementById("_cube28").value||null,timestamp:Date.now()});
save();toast("Cube test saved!");go("cubes");
}
