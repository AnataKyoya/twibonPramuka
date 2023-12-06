let img = document.querySelector("#photo");
let imgmain = document.querySelector(".main-img .box #photo");
let box = document.querySelector(".box");
let teks = document.querySelectorAll("#slogan");
let teksValue = document.querySelector("#teks");
let loading = document.querySelector(".loading");
let count = document.querySelector(".counting");

var load = function (event) {
    img.src = URL.createObjectURL(event.target.files[0])
    imgmain.style.scale = "1";
    imgmain.style.top = "0";
    imgmain.style.left = "0";
}

let list = []

for (let i = 0; i < teks.length; i++) {
    const custom = teks[i];

    custom.addEventListener("click", (event) => {
        list.push(event.target)
        if (list.length > 1) {
            list.shift()
        }
        teksValue.value = list[0].textContent;

        teksValue.addEventListener("keyup", () => {
            list[0].textContent = teksValue.value;
        })
    })
}

let a = 0;
let c = ["(nama)", "(sangga)", ":", "(klik untuk mengganti)", "sangga", "nama"]
let d = ["(", ")"]

var ok = function () {
    function detectText(text, text2) {
        let input = text + " " + text2;
        const lowercasedInput = input.toLowerCase();
        const words = lowercasedInput.split("");
        const words1 = lowercasedInput.split(/\s+/);
        const word1 = words.some(word => d.includes(word));
        const word2 = words1.some(word => c.includes(word));
        
        if(word1){
            return word1;
        } 
        
        if (word2){
            return word2;
        }

    }

    const hasKurung = detectText(teks[0].textContent, teks[1].textContent)
    const hasSrc = imgmain.getAttribute("src")

    if (hasKurung) {
        alert("format penulisan tidak sesuai")
    } else if (teks[0].textContent == "" || teks[1].textContent == "") {
        alert("nama atau sangga tidak boleh kosong")
    } else if (hasSrc == "") {
        alert("foto tidak boleh kosong")
    } else if (!hasKurung && teks[0].textContent != "" && teks[1].textContent != "" && hasSrc) {
        loading.style.display = "flex";

        var cl = setInterval(counting, 10);

        function counting() {
            count.innerHTML = a + "%";
            a++;

            if (a > 100) {
                count.innerHTML = "100%";
                loading.style.display = "none";
                a = 0;
                clearInterval(cl)
            }
        }

        document.querySelector(".frame").style = "scale: 1;";

        setTimeout(() => {
            var node = document.getElementById('twibon');

            html2canvas(node).then(function (canvas) {
                downloadCanvasAsImage(canvas, "test.jpg");
                setTimeout(() => {
                    document.querySelector(".frame").style = "scale: 0.36;";
                }, 600)
            });
        }, 500)
    }
}

let dframe = document.querySelector(".design-frame")

imageEvent(dframe, imgmain)

function imageEvent(elem, set) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var touches = 0;
    var zoomLevel = 1;
    var minZoom = 1;
    var distance = 0;
    var initialZoom;

    elem.addEventListener("touchstart", tstart)

    function tstart(event) {
        touches = event.touches.length;

        if (touches > 1 && touches < 3) {
            distance = Math.hypot(
                event.touches[0].pageX - event.touches[1].pageX,
                event.touches[0].pageY - event.touches[1].pageY
            );

            initialZoom = zoomLevel;
        } else if (touches < 2 && touches != 2) {
            pos3 = event.touches[0].clientX;
            pos4 = event.touches[0].clientY;
            box.style.overflow = "visible";
            elem.style.opacity = "0.5";
        }

        elem.addEventListener("touchmove", univMove)

        elem.addEventListener('touchend', function () {
            box.style.overflow = "hidden";
            elem.style.opacity = "1";
            elem.removeEventListener('touchmove', null);
            elem.removeEventListener('touchend', null);
        });
    }

    function univMove(event) {
        if (touches > 1 && touches < 3) {

            var newDistance = Math.hypot(
                event.touches[0].pageX - event.touches[1].pageX,
                event.touches[0].pageY - event.touches[1].pageY
            );

            zoomLevel = initialZoom * (newDistance / distance);
            zoomLevel = Math.max(zoomLevel, minZoom);

            set.style.scale = zoomLevel;
        }

        if (touches < 2 && touches != 2) {

            pos1 = pos3 - event.touches[0].clientX;
            pos2 = pos4 - event.touches[0].clientY;
            pos3 = event.touches[0].clientX;
            pos4 = event.touches[0].clientY;

            set.style.top = (set.offsetTop - pos2) + "px";
            set.style.left = (set.offsetLeft - pos1) + "px";
        }
    }
}

function downloadCanvasAsImage(v, filename) {
    let a = document.createElement("a")
    a.href = v.toDataURL()
    a.download = filename
    a.dispatchEvent(new MouseEvent("click"))
}