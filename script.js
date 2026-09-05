/* =====================================================
   PORTFOLIO SLIDE SYSTEM
===================================================== */

const slides = document.querySelectorAll(".slide");

const navButtons =
    document.querySelectorAll(".nav-number");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const currentSlide =
    document.getElementById("currentSlide");

const progressBar =
    document.getElementById("progressBar");


const TOTAL_SLIDES = slides.length;

let currentIndex = 0;

let wheelLocked = false;


/* =====================================================
   SHOW SLIDE
===================================================== */

function showSlide(index, updateURL = true) {

    if (index < 0) {
        index = 0;
    }

    if (index >= TOTAL_SLIDES) {
        index = TOTAL_SLIDES - 1;
    }

    currentIndex = index;


    /* Slides */

    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === currentIndex
        );

    });


    /* Navigation */

    navButtons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === currentIndex
        );

    });


    /* Counter */

    currentSlide.textContent =
        String(currentIndex + 1).padStart(2, "0");


    /* Progress */

    const progress =
        ((currentIndex + 1) / TOTAL_SLIDES) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* Buttons */

    prevBtn.disabled =
        currentIndex === 0;

    nextBtn.disabled =
        currentIndex === TOTAL_SLIDES - 1;


    /* URL */

    if (updateURL) {

        const hash =
            `#slide-${currentIndex + 1}`;

        history.replaceState(
            null,
            "",
            hash
        );

    }

}


/* =====================================================
   NEXT
===================================================== */

function nextSlide() {

    if (currentIndex < TOTAL_SLIDES - 1) {

        showSlide(currentIndex + 1);

    }

}


/* =====================================================
   PREVIOUS
===================================================== */

function previousSlide() {

    if (currentIndex > 0) {

        showSlide(currentIndex - 1);

    }

}


/* =====================================================
   BUTTONS
===================================================== */

nextBtn.addEventListener(
    "click",
    nextSlide
);

prevBtn.addEventListener(
    "click",
    previousSlide
);


/* =====================================================
   NAVIGATION NUMBERS
===================================================== */

navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const index =
                Number(
                    button.dataset.slide
                );

            showSlide(index);

        }
    );

});


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        switch (event.key) {

            case "ArrowRight":
            case "ArrowDown":
            case " ":

                event.preventDefault();

                nextSlide();

                break;


            case "ArrowLeft":
            case "ArrowUp":

                event.preventDefault();

                previousSlide();

                break;


            case "Home":

                event.preventDefault();

                showSlide(0);

                break;


            case "End":

                event.preventDefault();

                showSlide(
                    TOTAL_SLIDES - 1
                );

                break;

        }

    }
);


/* =====================================================
   MOUSE WHEEL
===================================================== */

window.addEventListener(
    "wheel",
    event => {

        if (wheelLocked) {
            return;
        }

        if (
            Math.abs(event.deltaY) < 20
        ) {
            return;
        }

        wheelLocked = true;


        if (event.deltaY > 0) {

            nextSlide();

        } else {

            previousSlide();

        }


        setTimeout(
            () => {

                wheelLocked = false;

            },
            650
        );

    },
    {
        passive: true
    }
);


/* =====================================================
   TOUCH / SWIPE
===================================================== */

let touchStartX = 0;
let touchStartY = 0;


window.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    event => {

        const endX =
            event.changedTouches[0].screenX;

        const endY =
            event.changedTouches[0].screenY;


        const diffX =
            endX - touchStartX;

        const diffY =
            endY - touchStartY;


        /* Only horizontal swipes */

        if (
            Math.abs(diffX) >
            Math.abs(diffY) &&
            Math.abs(diffX) > 50
        ) {

            if (diffX < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   HASH
===================================================== */

function loadFromHash() {

    const hash =
        window.location.hash;


    if (
        hash.startsWith("#slide-")
    ) {

        const number =
            parseInt(
                hash.replace("#slide-", "")
            );


        if (
            !isNaN(number) &&
            number >= 1 &&
            number <= TOTAL_SLIDES
        ) {

            showSlide(
                number - 1,
                false
            );

            return;

        }

    }


    showSlide(0, false);

}


window.addEventListener(
    "hashchange",
    loadFromHash
);


/* =====================================================
   INITIALIZE
===================================================== */

loadFromHash();
