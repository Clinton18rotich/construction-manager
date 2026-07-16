// ============ MATERIAL REJECTIONS ============
var MRN_CATEGORIES={"Cement & Binders":["Expired/old stock","Lumpy/hardened cement","Wrong type delivered","Damaged bags - water ingress"],"Reinforcement Steel":["Wrong diameter/grade","Excessive rust/corrosion","Bent/buckled bars","Wrong length delivered","No mill certificate"],"Blocks & Bricks":["Cracked/broken blocks","Wrong size/type","Under-strength","Uneven edges/poor finish"],"Aggregates":["Wrong size/grading","Contaminated with silt","Contains organic matter","Wrong source not approved"],"Timber":["Not treated as specified","Wrong species/grade","Excessive knots/warping","Moisture content too high"],"Plumbing":["Wrong pipe material/size","Damaged/cracked pipes","No test certificates","Counterfeit branded items"],"Electrical":["Wrong cable size","Not to KEBS standard","Damaged insulation","No test certificate"],"Finishes":["Wrong colour/shade","Damaged/opened tins","Expired paint","Wrong tile batch","Chipped/broken tiles"],"Roofing":["Wrong gauge/thickness","Pre-rusted sheets","Wrong profile/colour","Damaged during transport"],"General":["Not to approved sample","No delivery note","No test certificate","Quantity short delivered"]};
RENDER["rejections"]=function(){
var list="";var rej=(D.materialRejections||[]).filter(function(e){return e.date===globalDate;});
if(rej.length===0){list='<p style="color:#666">No material rejections.</p>';}
else{for(var i=0;i<rej.length;i++){var r=rej[i];list+='<div class="card"><div style="display:flex;justify-content:space-between"><h4>'+r.material+'</h4><button class="btn btn-red btn-sm" onclick="delItem(\'materialRejections\',\''+r.id+'\');go(\'rejections\')">X</button></div><p>Qty: '+r.qty+' | Supplier: '+r.supplier+'</p><p style="font-size:12px;color:#ff3b30">'+r.reason+'</p></div>';}}
return '<h2>Material Rejections (MRN)</h2><p style="color:#aaa;font-size:12px">Date: '+globalDate+'</p>'+list+'<button class="btn btn-blue" onclick="showMRNForm()">+ New Rejection</button>';
};
function showMRNForm(){
var cats="";var ck=Object.keys(MRN_CATEGORIES);for(var i=0;i<ck.length;i++){cats+='<option>'+ck[i]+'</option>';}
var h='<h3>New Material Rejection</h3><label>Date:</label><input type="date" id="_entryDate" value="'+globalDate+'" max="'+today()+'"><label>Category:</label><select id="_mrnCat" onchange="loadMRNItems()">'+cats+'</select><label>Specific Issue:</label><select id="_mrnItem"></select><label>Material:</label><input id="_mrnMat"><div class="row"><div><label>Quantity:</label><input id="_mrnQty"></div><div><label>Supplier:</label><input id="_mrnSupp"></div></div><label>Action:</label><select id="_mrnAction"><option>Remove from site and replace</option><option>Quarantine for inspection</option><option>Return to supplier</option><option>Reject and dispose</option></select><button class="btn" onclick="saveMRN()">Save Rejection</button><button class="btn btn-secondary" onclick="go(\'rejections\')">Cancel</button>';
document.getElementById("content").innerHTML=h;loadMRNItems();
}
function loadMRNItems(){var cat=document.getElementById("_mrnCat").value;var items=MRN_CATEGORIES[cat]||[];var h="";for(var i=0;i<items.length;i++){h+='<option>'+items[i]+'</option>';}document.getElementById("_mrnItem").innerHTML=h;}
function saveMRN(){
if(!D.materialRejections)D.materialRejections=[];
D.materialRejections.push({id:uid(),date:document.getElementById("_entryDate").value,category:document.getElementById("_mrnCat").value,reason:document.getElementById("_mrnItem").value,material:document.getElementById("_mrnMat").value,qty:document.getElementById("_mrnQty").value,supplier:document.getElementById("_mrnSupp").value,action:document.getElementById("_mrnAction").value,timestamp:Date.now()});
save();toast("MRN saved!");go("rejections");
}
