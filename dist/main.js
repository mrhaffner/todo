(()=>{const t={projectArr:[{name:"Default Project",projId:0,currentTaskId:2,tasks:[{name:"default task",taskId:0},{name:"second default task",taskId:1}]}],currentId:1};function e(e,n){document.getElementById(`side_${e}_delete`).addEventListener("click",(()=>{let r=t.projectArr.findIndex((t=>t===+e));t.projectArr.slice(r,1),n.remove(),document.getElementById(e+"_proj")&&d()}))}function n(t,e,n){t.addEventListener("click",(()=>{d(),r(e,n)}))}function d(){const t=document.getElementById("proj_div");for(;t.firstChild;)t.removeChild(t.firstChild)}function r(e,n){const d=document.getElementById("proj_div"),r=`<div id="${n}_proj">\n            <div id="${n}_proj_top">\n                <div id="${n}_proj_title_div">\n                    <h2 id="${n}_proj_title">${e}</h2>\n                </div>\n                <div id="${n}_proj_btn_div">\n                    <input type="text" id="${n}_proj_task_input">\n                    <button id="${n}_proj_btn">New Task</button>\n                </div>\n            </div>\n            <div id="${n}_proj_task_div">\n            </div>\n        </div>`;d.innerHTML=r;const o=document.getElementById(n+"_proj_task_div");t.projectArr.filter((t=>t.projId===+n))[0].tasks.forEach((t=>i(t.name,t.taskId,n,o))),function(e,n){document.getElementById(e+"_proj_btn").addEventListener("click",(()=>{const d=document.getElementById(e+"_proj_task_input").value;let r=t.projectArr.findIndex((t=>t.projId===+e)),o=t.projectArr[r].currentTaskId;t.projectArr[r].currentTaskId++,t.projectArr[r].tasks.push(((t,e)=>({name:t,taskId:e}))(d,o)),i(d,o,e,n)}))}(n,o)}function i(t,e,n,d){let r=document.createElement("div");r.id=`${n}_proj_${e}_task_div`;let i=`<p>${t}</p>`;r.innerHTML=i,d.appendChild(r)}document.getElementById("proj_form_submit_btn").addEventListener("click",(()=>{const d=document.getElementById("proj_title_input").value;let r=t.currentId;t.currentId++,t.projectArr.push({name:d,projId:r,currentTaskId:0,tasks:[]}),function(t,d){const r=document.getElementById("side_proj_div");let i=document.createElement("div");i.id=`side_${d}_div`;let o=`<h3 id=side_${d}_title">${t}</h3>\n        <button id="side_${d}_delete">Delete</button>`;i.innerHTML=o,r.appendChild(i),n(i.firstChild,t,d),e(d,i)}(d,r)})),r("Default Project",0);let o=document.getElementById("side_0_title");n(o,"Default Project",0),e(0,o.parentElement)})();