document.addEventListener("DOMContentLoaded", function () {
  //-------------------------------------------------------------------------------//
  const typeSfx = new Audio("./src/keyboard-mechnical-sfx.mp3");
  const compBeep = new Audio("./src/computer-process-sfx.mp3");
  const btnAccess = this.getElementById("btnAccess");
  const profile = this.getElementById("profile");

  typeSfx.loop = true;
  compBeep.loop = true;
  //-------------------------------------------------------------------------------//
  function introTyper() {
    var text = [
      "welcome to robco industries (tm) termlink",
      ">login courier",
      "enter password",
    ];
    text = text.map(function (x) {
      return x.toUpperCase();
    });

    const typeItInstance = new TypeIt("#content", {
      speed: 75,
      lifeLike: true,
      waitUntilVisible: true,
      startDelay: 2500,
      cursorChar: "■",

      beforeString: async (instance) => {
        if (text[1] == instance) {
          typeSfx.play();
        } else if (text[0] === instance || text[2] === instance) {
          compBeep.play();
        }
      },

      afterString: async (instance) => {
        typeSfx.pause();
        compBeep.pause();
      },

      afterComplete: async (instance) => {
        profileTyper();
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
      .exec(() => {
        typeSfx.play();
      })
      .type(">****")
      .pause(250)
      .exec(() => {
        typeSfx.play();
      })
      .type("*****")
      .pause(100)
      .exec(() => {
        typeSfx.play();
      })
      .type("****")
      .pause(1500)
      .break({ delay: 3000 })
      .exec(() => {
        compBeep.play();
      })
      .type("ACCESS GRANTED")
      .pause(500)
      .break({ delay: 500 })
      .exec(() => {
        compBeep.play();
      })
      .type("ACCESSING MR BARAQUIL'S PROFILE CONFIRMED")
      .pause(2000)
      .empty()
      .go();
  }

  function profileTyper() {
    var text = [
      "---------------------------",
      'rehum d. baraquil',
      "---------------------------",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in erat eget ipsum euismod ultricies a vel justo. Integer auctor consectetur molestie. Aliquam a justo nec felis rutrum ultricies vel id velit. Sed viverra sapien neque, ac dignissim orci porta semper. Aliquam porttitor placerat scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ultricies sit amet tortor in bibendum. Sed vel augue facilisis, vulputate nibh fermentum, mattis leo. Phasellus dignissim elit massa, ut venenatis magna gravida a. Duis rhoncus lobortis placerat. Aliquam vitae nulla ac nisi tempor convallis id vitae felis. Ut leo enim, maximus nec scelerisque nec, ornare vel elit. Aliquam non sem mollis, tristique odio id, dictum purus. Integer sit amet neque vel justo pharetra mollis quis sed ante. Praesent id risus ac ipsum vulputate bibendum vitae et leo. Nam at gravida mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque luctus faucibus nisl. Nullam metus leo, fermentum nec scelerisque eget, pellentesque at odio. Fusce ultricies porta risus, non rhoncus est maximus sed. Sed eget dui magna. Vivamus finibus commodo massa ac aliquet. Pellentesque accumsan lacinia eros sed faucibus. Sed interdum lacus sit amet quam efficitur finibus. Nunc a facilisis ligula. Suspendisse malesuada pulvinar pretium.",
    ];
    text = text.map(function (x) {
      return x.toUpperCase();
    });
    const typeItInstance = new TypeIt("#content", {
      strings: text,
      speed: 1,
      lifeLike: true,
      waitUntilVisible: true,
      startDelay: 2500,
      cursorChar: "■",

      beforeString: async (instance) => {
        compBeep.play();
      },

      afterString: async (instance) => {
        compBeep.pause();
      },
    })

    .go();
  }

  function removeBtn() {
    btnAccess.remove();
  }
  //-------------------------------------------------------------------------------//
  btnAccess.addEventListener("click", introTyper);
  btnAccess.addEventListener("click", removeBtn);
  //-------------------------------------------------------------------------------//
});
