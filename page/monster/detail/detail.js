function showTab(id){

    document
    .querySelectorAll(".tab-content")
    .forEach(tab =>
        tab.classList.remove("active")
    );

    document
    .querySelectorAll(".tabs button")
    .forEach(btn =>
        btn.classList.remove("active")
    );

    document
    .getElementById(id)
    .classList.add("active");

    event.target.classList.add("active");
}


function toggle(el){
    el.parentElement.classList.toggle("open");
}


function changeMap(map,btn){

    document
    .querySelectorAll(".floor-btn")
    .forEach(b =>
        b.classList.remove("active")
    );

    btn.classList.add("active");

    const box =
    document.getElementById("mapBox");

    if(map){
        box.innerHTML =
        `<img src="${map}">`;
    }else{
        box.innerHTML =
        "マップが存在しません";
    }

}
