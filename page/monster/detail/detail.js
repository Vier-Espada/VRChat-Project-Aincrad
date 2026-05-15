const params=
new URLSearchParams(
location.search
);

const monster=
params.get("name");

fetch(`attack/${monster}.json`)
.then(res=>res.json())
.then(data=>renderMonster(data));

function renderMonster(data){

const root=
document.getElementById(
"monster-detail"
);

root.innerHTML=`

<div class="top-section">

<div>

<h1>${data.name}</h1>

<img
src="${data.image}"
class="detail-image"
>

</div>

<div>

<div>Col : ${data.col}</div>
<div>EXP : ${data.exp}</div>

<h2>ドロップ</h2>

<div class="drop-list">

${data.drops.map(d=>
`<div class="drop-item">${d}</div>`
).join("")}

</div>

</div>

</div>

<h2>出現場所</h2>

<div class="map-wrap">

<div class="map-tabs">

${data.maps.map(m=>
`<button onclick="switchMap('${m.image}')">${m.label}</button>`
).join("")}

</div>

<img
id="mapImage"
src="${data.maps[0].image}"
class="map-image"
>

</div>

<h2>攻撃方法</h2>

<div class="attack-list">

${data.attacks.map((a,i)=>`

<div class="attack-item">

<button
class="attack-toggle"
onclick="toggleAttack(${i})"
>
➤ ${a.name}
</button>

<div
class="attack-content"
id="attack-${i}"
>

<video controls class="attack-video">
<source src="${a.video}">
</video>

<p>${a.desc}</p>

</div>

</div>

`).join("")}

</div>
`;

}

function switchMap(src){

document.getElementById(
"mapImage"
).src=src;

}

function toggleAttack(i){

document
.getElementById(
`attack-${i}`
)
.classList.toggle(
"open"
);

}
