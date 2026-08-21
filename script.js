/* =========================================
   LOADING SCREEN
========================================= */

window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

        }, 1000);

    }, 1500);

});


/* =========================================
   OPEN SURPRISE
========================================= */

const openBtn =
    document.getElementById("openBtn");

const music =
    document.getElementById("birthdayMusic");


openBtn.addEventListener("click", () => {

    /*
       Browser security allows music
       after the user clicks something.
    */

    music.volume = 0.25;

    music.play().catch(() => {
        console.log("Music needs user interaction.");
    });


    showSection("nameReveal");

});


/* =========================================
   SECTION NAVIGATION
========================================= */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.add("hidden");
        section.classList.remove("active");

    });


    const target =
        document.getElementById(sectionId);


    if (target) {

        target.classList.remove("hidden");

        target.classList.add("active");

    }


    /*
       Start confetti when birthday
       section appears.
    */

    if (sectionId === "birthday") {

        startConfetti();

    }

}


/* =========================================
   CONFETTI
========================================= */

const canvas =
    document.getElementById("confettiCanvas");

const ctx =
    canvas.getContext("2d");

let confetti = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function createConfetti() {

    confetti = [];

    for (let i = 0; i < 180; i++) {

        confetti.push({

            x: Math.random() * canvas.width,

            y:
                Math.random() *
                -canvas.height,

            width:
                Math.random() * 8 + 4,

            height:
                Math.random() * 12 + 5,

            speed:
                Math.random() * 4 + 2,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 8 - 4,

            emoji:
                Math.random() > 0.7
                    ? "❤️"
                    : null

        });

    }

}


function drawConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    confetti.forEach(piece => {

        piece.y += piece.speed;

        piece.rotation +=
            piece.rotationSpeed;


        if (piece.y > canvas.height) {

            piece.y = -20;

            piece.x =
                Math.random() *
                canvas.width;

        }


        ctx.save();

        ctx.translate(
            piece.x,
            piece.y
        );

        ctx.rotate(
            piece.rotation *
            Math.PI / 180
        );


        if (piece.emoji) {

            ctx.font = "18px Arial";

            ctx.fillText(
                piece.emoji,
                0,
                0
            );

        } else {

            ctx.fillStyle =
                `hsl(${Math.random() * 360}, 80%, 70%)`;

            ctx.fillRect(
                -piece.width / 2,
                -piece.height / 2,
                piece.width,
                piece.height
            );

        }


        ctx.restore();

    });


    requestAnimationFrame(drawConfetti);

}


function startConfetti() {

    createConfetti();

    drawConfetti();

}


/* =========================================
   CLICK HEART EFFECT
========================================= */

document.addEventListener(
    "click",
    function (event) {

        /*
           Don't create hearts when
           clicking buttons.
        */

        if (
            event.target.tagName ===
            "BUTTON"
        ) {
            return;
        }


        const heart =
            document.createElement("div");

        heart.innerHTML =
            ["❤️", "💗", "💕", "✨"][
                Math.floor(
                    Math.random() * 4
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.fontSize =
            "22px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "9999";

        heart.style.transition =
            "all 1s ease";


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.style.transform =
                "translateY(-100px) scale(1.5)";

            heart.style.opacity =
                "0";

        }, 50);


        setTimeout(() => {

            heart.remove();

        }, 1100);

    }
);