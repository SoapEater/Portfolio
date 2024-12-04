document.addEventListener("DOMContentLoaded", function ()
{
    //-------------------------------------------------------------------------------//
    //Access the audio files and the element id for the button and the entire menu element
    const typeSfx = new Audio("./src/keyboard-mechnical-sfx.mp3");
    const compBeep = new Audio("./src/computer-process-sfx.mp3");
    const btnAccess = this.getElementById("btnAccess");
    const menuContent = this.getElementById("menu");
    const content = this.getElementById("content");

    //Loop the audio, If it's not on loop the audio will abruptly stop. Poopy-di scoop Scoop-diddy-whoop
    typeSfx.loop = true;
    compBeep.loop = true;
    //-------------------------------------------------------------------------------//
    //Fallout New Vegas terminal login
    function introTyper()
    {
        var text =
        [
            "welcome to robco industries (tm) termlink",
            ">login courier",
            "enter password",
        ];
        text = text.map(function (x)
        {
            return x.toUpperCase();
        });

        const typeItInstance = new TypeIt("#content",
        {
            speed: 75,
            lifeLike: true,
            waitUntilVisible: true,
            startDelay: 2500,
            cursorChar: "■",

            beforeString: async (instance) =>
            {
                if (text[1] == instance) {
                    typeSfx.play();
                }

                else if (text[0] === instance || text[2] === instance) {
                    compBeep.play();
                }
            },

            afterString: async (instance) =>
            {
                typeSfx.pause();
                compBeep.pause();
            },

            afterComplete: async (instance) =>
            {
                typeItInstance.destroy();
                menuTyper();
            },
        })
        .empty()
        .type(text[0])
        .pause(1500)
        .break({ delay: 1500 })
        .type(text[1])
        .pause(1500)
        .break({ delay: 1500 })
        .type(text[2])
        .pause(1500)
        .break({ delay: 1500 })
        .exec(() =>
        {
            typeSfx.play();
        })
        .type(">****")
        .pause(250)
        .exec(() =>
        {
            typeSfx.play();
        })
        .type("*****")
        .pause(100)
        .exec(() =>
        {
            typeSfx.play();
        })
        .type("****")
        .pause(1500)
        .break({ delay: 3000 })
        .exec(() =>
        {
            compBeep.play();
        })
        .type("ACCESS GRANTED")
        .pause(500)
        .break({ delay: 500 })
        .exec(() =>
        {
            compBeep.play();
        })
        .type("ACCESSING MR BARAQUIL'S PROFILE AUTHORIZED")
        .pause(2000)
        .empty()
        .go();
    }

    //For the buttons
    function menuTyper()
    {
        const typeItInstance = new TypeIt("#menu",
        {
            speed: 1,
            lifeLike: false,
            waitUntilVisible: true,
            startDelay: 250,
            cursorChar: "■",

            beforeString: async (instance) =>
            {
                compBeep.play();
            },

            afterString: async (instance) =>
            {
                compBeep.pause();
            },

            afterComplete: async (instance) =>
            {
                //After the typing is complete get the id of the buttons
                typeItInstance.destroy();
                var whoBtn = document.getElementById("whoBtn");
                var skillBtn = document.getElementById("skillBtn");

                whoBtn.addEventListener("click", function()
                {
                    menuContent.style.display = "none";
                    content.style.display = "block";
                    contentTyper('../src/txt/profile.txt');
                });

                skillBtn.addEventListener("click", function()
                {
                    menuContent.style.display = "none";
                    content.style.display = "block";
                    contentTyper('../src/txt/skills.txt');
                });

                aboutPortBtn.addEventListener("click", function()
                {
                    menuContent.style.display = "none";
                    content.style.display = "block";
                    contentTyper('../src/txt/portfolio.txt');
                });
            },
        })
        .type('<button type="button" id="whoBtn">>WHO IS REHUM BARAQUIL?</button>')
        .break()
        .type('<button type="button" id="skillBtn">>WHAT ARE HIS SKILLS?</button>')
        .break()
        .type('<button type="button" id="aboutPortBtn">>ABOUT THIS PORFOLIO?</button>')
        .go();
    }

    function contentTyper(textPath)
    {
        fetch(textPath)
        .then((res) => res.text())
        .then((text) =>
        {
            formattedText = text.toUpperCase();

            const typeItInstance = new TypeIt("#content",
            {
                strings: formattedText,
                speed: 1,
                lifeLike: false,
                waitUntilVisible: true,
                startDelay: 500,
                cursorChar: "■",

                beforeString: async (instance) =>
                {
                    compBeep.play();
                },

                afterString: async (instance) =>
                {
                    compBeep.pause();
                },

                afterComplete: async (instance) =>
                {
                    typeItInstance.destroy();
                    var backBtn = document.getElementById("backBtn");

                    backBtn.addEventListener("click", function()
                    {
                        menuContent.innerHTML = "";
                        content.innerHTML = "";
                        menuContent.style.display = "block";
                        content.style.display = "none";
                        menuTyper();
                    });
                },
            })
            .break()
            .type('<button type="button" id="backBtn">>GO BACK</button>')
            .go();
        })
        .catch((e) => console.error(e));
    }
    //-------------------------------------------------------------------------------//
    //Banish this button to the shadow realm and que the intro.
    //Reason for this is that audio won't play unless if the user has clicked or interacted something.
    btnAccess.addEventListener("click", function()
    {
        btnAccess.style.display = "none";
        introTyper();
    });
    //-------------------------------------------------------------------------------//
});