// ============ CONCRETE DEFECTS & PATHOLOGY ============
var CONCRETE_DEFECTS={
"Honeycombing":{desc:"Voids in hardened concrete where mortar is missing, leaving coarse aggregate exposed",causes:"Inadequate compaction, congested reinforcement, harsh mix, improper placement",checks:["Tap with hammer to estimate depth","Use steel scale to probe voids","Check if extending behind rebar"],repair:"Expose sound concrete, clean, apply bonding agent, fill with repair mortar"},
"Cracks - Plastic Shrinkage":{desc:"Shallow random cracks appearing within hours/days of pouring",causes:"Rapid surface drying, high evaporation rate, delayed curing",checks:["Measure width with crack gauge","Check depth - usually shallow","Monitor if active with marker"],repair:"Surface sealing if shallow, epoxy injection if structural"},
"Cracks - Drying Shrinkage":{desc:"Vertical pattern cracks increasing over time as moisture leaves",causes:"Excess water in mix, inadequate curing, high cement content",checks:["Pattern - vertical orientation","Width measurement over time","Check if extends through section"],repair:"Flexible sealant for minor cracks, epoxy injection for structural"},
"Cracks - Structural":{desc:"Diagonal cracks indicating stress, overload, or foundation movement",causes:"Overloading, settlement, design deficiency, corrosion of rebar",checks:["Diagonal pattern - angle from vertical","Measure width and depth","Monitor for activity immediately"],repair:"URGENT: Consult structural engineer, strengthen with FRP or additional concrete"},
"Spalling":{desc:"Concrete cover breaking away from reinforcement due to rust expansion",causes:"Moisture ingress → steel corrosion → rust expands 6-10x → cover cracks",checks:["Rust staining visible?","Hollow sound around spall?","Find moisture source"],repair:"Remove loose concrete, clean rebar, apply anti-corrosion coating, patch with repair mortar"},
"Efflorescence":{desc:"White crystalline salt deposits on surface from water movement",causes:"Moisture carrying soluble salts to surface, groundwater, leakage",checks:["Wipe with damp cloth - returns in weeks?","Find moisture path","Check joints and cracks"],repair:"Stop moisture source first, clean surface, apply breathable sealer"},
"Segregation":{desc:"Coarse aggregate separates from mortar during handling/placing",causes:"Excessive slump, drop height >1.5m, over-vibration, poor mix",checks:["Check drop height during placement","Look for mortar-rich top layer","Check aggregate concentration at bottom"],repair:"Remove and replace severely segregated areas, control placement methods"},
"Scaling":{desc:"Surface mortar flakes or peels away in thin layers",causes:"Weak surface, high w/c ratio, finishing over bleed water, freeze-thaw",checks:["Test depth of scaling","Check if extending deeper","Check for bleed water signs"],repair:"Remove loose material, apply surface hardener or overlay"},
"Delamination":{desc:"Surface layer separates from substrate but remains in place",causes:"Finishing over bleed water, trapped air, poor bond between layers",checks:["Tap with hammer - hollow sound?","Map hollow zones with chalk","Check extent before breaking"],repair:"Remove delaminated area, roughen substrate, apply bonding agent, re-pour"},
"Dusting":{desc:"Surface turns powdery, produces fine cement powder when rubbed",causes:"High water at surface, finishing over bleed water, inadequate curing",checks:["Rub surface - does powder come off?","Test depth of weak layer","Check hardness progression"],repair:"Apply liquid hardener, or remove weak layer and apply topping"},
"Bleeding":{desc:"Excess water rising to surface after placement",causes:"High w/c ratio, over-vibration, poor aggregate grading",checks:["Check water on surface after compaction","Check if finishing done over bleed water","Associated with scaling/dusting"],repair:"Allow bleed water to evaporate before finishing, adjust mix design"}
};

RENDER["defects"]=function(){
var h='<h2>Concrete Defects & Pathology</h2><p style="color:#aaa;font-size:12px">9 common defects - diagnosis & repair guide (Plate I-XI)</p>';
h+='<div class="card" style="background:#331111;border:1px solid #ff3b30"><h4 style="color:#ff3b30">⚠️ GOLDEN RULE</h4><p style="font-size:12px"><b>DO NOT REPAIR WHAT YOU HAVE NOT DIAGNOSED.</b></p><p style="font-size:11px">1. MAP the location, pattern, extent<br>2. INVESTIGATE moisture, materials, structure<br>3. TEST depth, activity, substrate<br>4. REPAIR root cause, not just surface</p></div>';
var keys=Object.keys(CONCRETE_DEFECTS);
for(var i=0;i<keys.length;i++){var k=keys[i];var d=CONCRETE_DEFECTS[k];
h+='<div class="card"><h4>'+k+'</h4><p><b>What:</b> '+d.desc+'</p><p style="font-size:11px;color:#aaa"><b>Causes:</b> '+d.causes+'</p><p style="font-size:11px;color:#ff9f0a"><b>Quick Checks:</b></p><ul style="font-size:10px;margin:3px 0;padding-left:20px">';
for(var j=0;j<d.checks.length;j++){h+='<li>'+d.checks[j]+'</li>';}
h+='</ul><p style="font-size:11px;color:#30d158"><b>Repair:</b> '+d.repair+'</p></div>';
}
h+='<h4 style="margin-top:15px">Site Diagnostic Tools</h4>';
h+='<div class="card"><table style="font-size:11px"><tr><th>Test</th><th>Tool</th><th>What it Checks</th></tr>';
h+='<tr><td>Sound Test</td><td>Hammer</td><td>Sharp=solid, Hollow=delamination/honeycombing</td></tr>';
h+='<tr><td>Crack Width</td><td>Crack gauge (0-10mm)</td><td>Measure and classify cracks</td></tr>';
h+='<tr><td>Crack Activity</td><td>Monitoring marker/glass slide</td><td>Check if crack is still moving</td></tr>';
h+='<tr><td>Moisture</td><td>Moisture meter</td><td>Check moisture content in concrete</td></tr>';
h+='<tr><td>Depth</td><td>Steel scale/probe</td><td>Probe honeycombing and voids</td></tr>';
h+='<tr><td>Surface Hardness</td><td>Schmidt hammer</td><td>Check concrete strength/quality</td></tr>';
h+='<tr><td>Cover</td><td>Cover meter</td><td>Check reinforcement cover depth</td></tr>';
h+='</table></div>';
return h;
};
