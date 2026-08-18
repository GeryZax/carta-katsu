/* =====================================
   ELEMENTOS
===================================== */

const bush =
    document.getElementById("bush");

const initialArea =
    document.getElementById("initial-area");

const letterK =
    document.getElementById("letter-k");

const kSlots =
    document.getElementById("k-slots");

const flowersContainer =
    document.getElementById("flowers-container");

const particlesContainer =
    document.getElementById("particles");

const firefliesContainer =
    document.getElementById("fireflies");

const letterTransition =
    document.getElementById("letter-transition");

const envelope =
    document.getElementById("envelope");

const letterOverlay =
    document.getElementById("letter-overlay");

const closeLetter =
    document.getElementById("close-letter");


/* =====================================
   VARIABLES
===================================== */

let started = false;

let filledSlots = 0;


/* =====================================
   POSICIONES DE LA K
===================================== */

const K_POINTS = [

    { x: 29, y: 10 },

    { x: 29, y: 30 },

    { x: 29, y: 50 },

    { x: 29, y: 70 },

    { x: 29, y: 90 },

    { x: 50, y: 42 },

    { x: 70, y: 25 },

    { x: 50, y: 58 },

    { x: 70, y: 75 }

];


/* =====================================
   CREAR SLOTS
===================================== */

function createKSlots() {

    K_POINTS.forEach(
        (point, index) => {

            const slot =
                document.createElement("div");


            slot.classList.add(
                "k-slot"
            );


            slot.dataset.index =
                index;


            slot.style.left =
                point.x + "%";


            slot.style.top =
                point.y + "%";


            kSlots.appendChild(
                slot
            );

        }
    );

}


createKSlots();


/* =====================================
   LUCIÉRNAGAS
===================================== */

createFireflies();


function createFireflies() {

    /*
     * Antes había 25.
     * Ahora solamente 15 para
     * reducir trabajo al navegador.
     */

    const amount = 15;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const firefly =
            document.createElement("div");


        firefly.classList.add(
            "firefly"
        );


        firefly.style.left =
            Math.random() * 100 + "%";


        firefly.style.top =
            Math.random() * 100 + "%";


        firefly.style.setProperty(
            "--move-x",
            (
                Math.random() * 80 -
                40
            ) + "px"
        );


        firefly.style.setProperty(
            "--move-y",
            (
                Math.random() * 80 -
                40
            ) + "px"
        );


        firefly.style.setProperty(
            "--duration",
            (
                3 +
                Math.random() * 3
            ) + "s"
        );


        firefliesContainer.appendChild(
            firefly
        );

    }

}


/* =====================================
   ACTIVAR ARBUSTO
===================================== */

bush.addEventListener(
    "click",
    activateBush
);


function activateBush() {

    if (started) {

        return;

    }


    started = true;


    bush.style.pointerEvents =
        "none";


    /* ================================
       REBOTE
    ================================= */

    bush.classList.add(
        "magic-start"
    );


    createBushParticles();


    /* ================================
       CRECER
    ================================= */

    setTimeout(() => {

        bush.classList.remove(
            "magic-start"
        );


        bush.classList.add(
            "expanded"
        );

    }, 250);


    /* ================================
       MOSTRAR K
    ================================= */

    setTimeout(() => {

        initialArea.classList.add(
            "visible"
        );

    }, 1000);


    /* ================================
       FLORES
    ================================= */

    setTimeout(() => {

        createFlowers();

    }, 1400);

}


/* =====================================
   PARTÍCULAS DEL ARBUSTO
===================================== */

function createBushParticles() {

    const rect =
        bush.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    /*
     * Antes eran 25.
     * Ahora son 12.
     */

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            centerX + "px";


        particle.style.top =
            centerY + "px";


        particle.style.setProperty(
            "--x",
            (
                Math.random() * 220 -
                110
            ) + "px"
        );


        particle.style.setProperty(
            "--y",
            (
                Math.random() * 180 -
                90
            ) + "px"
        );


        particlesContainer.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1500);

    }

}


/* =====================================
   CREAR FLORES
===================================== */

function createFlowers() {

    const positions = [

        { x: 15, y: 52 },

        { x: 28, y: 70 },

        { x: 43, y: 24 },

        { x: 58, y: 65 },

        { x: 73, y: 25 },

        { x: 82, y: 65 },

        { x: 50, y: 85 },

        { x: 20, y: 28 },

        { x: 68, y: 52 }

    ];


    positions.forEach(
        (position, index) => {

            setTimeout(() => {

                createFlower(
                    position.x,
                    position.y,
                    index
                );

            }, index * 280);

        }
    );

}


/* =====================================
   CREAR FLOR
===================================== */

function createFlower(
    x,
    y,
    id
) {

    const flower =
        document.createElement("div");


    flower.classList.add(
        "flower"
    );


    flower.dataset.id =
        id;


    const bushRect =
        bush.getBoundingClientRect();


    const exits = [

        {
            x: .35,
            y: .35
        },

        {
            x: .65,
            y: .35
        },

        {
            x: .25,
            y: .55
        },

        {
            x: .75,
            y: .55
        },

        {
            x: .50,
            y: .25
        },

        {
            x: .40,
            y: .65
        },

        {
            x: .60,
            y: .65
        },

        {
            x: .30,
            y: .45
        },

        {
            x: .70,
            y: .45
        }

    ];


    const exit =
        exits[
            id % exits.length
        ];


    const startX =
        bushRect.left +
        bushRect.width *
        exit.x;


    const startY =
        bushRect.top +
        bushRect.height *
        exit.y;


    const targetX =
        window.innerWidth *
        (x / 100);


    const targetY =
        window.innerHeight *
        (y / 100);


    flower.style.position =
        "fixed";


    flower.style.left =
        (
            startX - 21
        ) + "px";


    flower.style.top =
        (
            startY - 21
        ) + "px";


    flower.style.opacity =
        "0";


    flower.style.transform =
        "scale(.2)";


    flowersContainer.appendChild(
        flower
    );


    /*
     * Forzamos solamente una lectura
     * del layout antes de iniciar
     * la transición.
     */

    flower.offsetHeight;


    setTimeout(() => {

        flower.style.transition =

            "left 1.5s " +
            "cubic-bezier(.2,.8,.2,1)," +

            "top 1.5s " +
            "cubic-bezier(.2,.8,.2,1)," +

            "opacity .6s ease," +

            "transform 1.5s " +
            "cubic-bezier(.2,.8,.2,1)";


        flower.style.left =
            (
                targetX - 21
            ) + "px";


        flower.style.top =
            (
                targetY - 21
            ) + "px";


        flower.style.opacity =
            "1";


        flower.style.transform =
            "scale(1)";


    }, 40);


    setTimeout(() => {

        if (
            !flower.classList.contains(
                "placed"
            )
        ) {

            flower.classList.add(
                "floating"
            );

        }

    }, 1600);


    makeDraggable(
        flower
    );

}


/* =====================================
   ARRASTRAR FLORES
===================================== */

function makeDraggable(
    flower
) {

    let dragging = false;

    let offsetX = 0;

    let offsetY = 0;


    flower.addEventListener(
        "pointerdown",
        startDrag
    );


    flower.addEventListener(
        "pointermove",
        drag
    );


    flower.addEventListener(
        "pointerup",
        stopDrag
    );


    flower.addEventListener(
        "pointercancel",
        stopDrag
    );


    function startDrag(event) {

        if (
            flower.classList.contains(
                "placed"
            )
        ) {

            return;

        }


        dragging = true;


        flower.setPointerCapture(
            event.pointerId
        );


        const rect =
            flower.getBoundingClientRect();


        offsetX =
            event.clientX -
            rect.left;


        offsetY =
            event.clientY -
            rect.top;


        flower.style.animation =
            "none";


        flower.style.transition =
            "none";


        flower.style.left =
            rect.left + "px";


        flower.style.top =
            rect.top + "px";

    }


    function drag(event) {

        if (!dragging) {

            return;

        }


        flower.style.left =

            (
                event.clientX -
                offsetX
            ) + "px";


        flower.style.top =

            (
                event.clientY -
                offsetY
            ) + "px";


        previewSlot(
            flower
        );

    }


    function stopDrag() {

        if (!dragging) {

            return;

        }


        dragging = false;


        findNearestSlot(
            flower
        );

    }

}


/* =====================================
   PREVISUALIZAR SLOT
===================================== */

function previewSlot(
    flower
) {

    const flowerRect =
        flower.getBoundingClientRect();


    const flowerX =
        flowerRect.left +
        flowerRect.width / 2;


    const flowerY =
        flowerRect.top +
        flowerRect.height / 2;


    const slots =
        document.querySelectorAll(
            ".k-slot:not(.filled)"
        );


    slots.forEach(
        slot => {

            const rect =
                slot.getBoundingClientRect();


            const slotX =
                rect.left +
                rect.width / 2;


            const slotY =
                rect.top +
                rect.height / 2;


            const distance =
                Math.hypot(
                    flowerX - slotX,
                    flowerY - slotY
                );


            if (
                distance < 60
            ) {

                slot.style.background =
                    "rgba(80,150,255,.18)";

                slot.style.boxShadow =
                    "0 0 18px rgba(70,150,255,.4)";

            } else {

                slot.style.background =
                    "";

                slot.style.boxShadow =
                    "";

            }

        }
    );

}


/* =====================================
   BUSCAR SLOT
===================================== */

function findNearestSlot(
    flower
) {

    const flowerRect =
        flower.getBoundingClientRect();


    const flowerX =
        flowerRect.left +
        flowerRect.width / 2;


    const flowerY =
        flowerRect.top +
        flowerRect.height / 2;


    const slots =
        Array.from(
            document.querySelectorAll(
                ".k-slot:not(.filled)"
            )
        );


    let nearest = null;

    let nearestDistance =
        Infinity;


    slots.forEach(
        slot => {

            const rect =
                slot.getBoundingClientRect();


            const slotX =
                rect.left +
                rect.width / 2;


            const slotY =
                rect.top +
                rect.height / 2;


            const distance =
                Math.hypot(
                    flowerX - slotX,
                    flowerY - slotY
                );


            if (
                distance <
                nearestDistance
            ) {

                nearestDistance =
                    distance;

                nearest =
                    slot;

            }

        }
    );


    if (
        nearest &&
        nearestDistance < 70
    ) {

        placeFlower(
            flower,
            nearest
        );

    }

}


/* =====================================
   COLOCAR FLOR
===================================== */

function placeFlower(
    flower,
    slot
) {

    if (
        slot.classList.contains(
            "filled"
        )
    ) {

        return;

    }


    slot.classList.add(
        "filled"
    );


    flower.classList.add(
        "placed"
    );


    const rect =
        slot.getBoundingClientRect();


    flower.style.transition =

        "left .4s ease, " +
        "top .4s ease";


    flower.style.left =
        (
            rect.left +
            rect.width / 2 -
            21
        ) + "px";


    flower.style.top =
        (
            rect.top +
            rect.height / 2 -
            21
        ) + "px";


    filledSlots++;


    createSmallParticles(

        rect.left +
        rect.width / 2,

        rect.top +
        rect.height / 2

    );


    if (
        filledSlots >=
        K_POINTS.length
    ) {

        completeK();

    }

}


/* =====================================
   K COMPLETADA
===================================== */

function completeK() {

    letterK.classList.add(
        "completed"
    );


    createParticles();


    setTimeout(() => {

        showLetterTransition();

    }, 1600);

}


/* =====================================
   TRANSICIÓN AL SOBRE
===================================== */

function showLetterTransition() {

    letterTransition.classList.add(
        "active"
    );


    setTimeout(() => {

        envelope.classList.add(
            "visible"
        );

    }, 900);


    setTimeout(() => {

        letterTransition.classList.remove(
            "active"
        );

    }, 1700);

}


/* =====================================
   PARTÍCULAS FINALES
===================================== */

function createParticles() {

    const rect =
        bush.getBoundingClientRect();


    /*
     * Antes eran 35.
     * Ahora son 18.
     */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            (
                rect.left +
                rect.width / 2
            ) + "px";


        particle.style.top =
            (
                rect.top +
                rect.height / 2
            ) + "px";


        particle.style.setProperty(
            "--x",
            (
                Math.random() * 400 -
                200
            ) + "px"
        );


        particle.style.setProperty(
            "--y",
            (
                Math.random() * 300 -
                150
            ) + "px"
        );


        particlesContainer.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1500);

    }

}


/* =====================================
   PARTÍCULAS PEQUEÑAS
===================================== */

function createSmallParticles(
    x,
    y
) {

    /*
     * Antes eran 12.
     * Ahora son 6.
     */

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            x + "px";


        particle.style.top =
            y + "px";


        particle.style.setProperty(
            "--x",
            (
                Math.random() * 70 -
                35
            ) + "px"
        );


        particle.style.setProperty(
            "--y",
            (
                Math.random() * 70 -
                35
            ) + "px"
        );


        particlesContainer.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1500);

    }

}


/* =====================================
   ABRIR CARTA
===================================== */

envelope.addEventListener(
    "click",
    () => {

        letterOverlay.classList.add(
            "open"
        );

    }
);


/* =====================================
   CERRAR CARTA
===================================== */

closeLetter.addEventListener(
    "click",
    () => {

        letterOverlay.classList.remove(
            "open"
        );

    }
);


/* =====================================
   CERRAR HACIENDO CLICK AFUERA
===================================== */

letterOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            letterOverlay
        ) {

            letterOverlay.classList.remove(
                "open"
            );

        }

    }
);
