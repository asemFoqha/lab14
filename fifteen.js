function startPuzzle() {
  let imageUrl = "./images/background.jpeg";
  let emptyTop = 300;
  let emptyLeft = 300;
  let divsStart;

  $(document).ready(() => {
    initialize();

    divsStart = getDivsAtStart();

    $(".puzzlepiece").click(function () {
      let current = $(this).position();
      if (isMoveable(current)) {
        movePiece($(this));
        if (checkIfComplete()) {
          alert("Yes, you did it!");
        }
      }
    });

    const movePiece = (current) => {
      let pos = current.position();
      current.css("top", emptyTop + "px");
      current.css("left", emptyLeft + "px");
      emptyLeft = pos.left;
      emptyTop = pos.top;
    };

    $("#shufflebutton").on("click", () => {
      showSpinner();
      for (let i = 0; i < 50; i++) {
        let allPieces = $(".puzzlepiece");
        let movablePieces = [];
        let k = 0;
        for (let j = 0; j < allPieces.length; j++) {
          let current = $(allPieces[j]).position();
          if (isMoveable(current)) {
            movablePieces[k] = $(allPieces[j]);
            k++;
          }
        }
        movePiece(
          $(movablePieces[Math.floor(Math.random() * movablePieces.length)])
        );
      }
    });
    const showSpinner = () => {
      $("#spinner").css("display", "inline");
      setTimeout(() => {
        $("#spinner").css("display", "none");
      }, 500);
    };
    $(".puzzlepiece").hover(
      function () {
        let current = $(this).position();
        if (isMoveable(current)) {
          $(this).addClass("movablepiece");
        }
      },
      function () {
        $(this).removeClass("movablepiece");
      }
    );
  });

  const getDivsAtStart = () => {
    let divPositions = [];
    let pieces = $(".puzzlepiece");
    for (let i = 0; i < pieces.length; i++) {
      divPositions[i] = {
        x: $(pieces[i]).position().left,
        y: $(pieces[i]).position().top,
      };
    }
    return divPositions;
  };

  var divsNow = function () {
    var divPosition = [];
    var divs = $(".puzzlepiece");
    for (var i = 0; i < divs.length; i++) {
      divPosition[i] = {
        x: $(divs[i]).position.left,
        y: $(divs[i]).position.top,
      };
    }
    return divPosition;
  };

  const checkIfComplete = () => {
    let divNow = divsNow();
    let status = true;
    for (let i = 0; i < divNow.length; i++) {
      if (
        Math.floor(divNow[i].left) !== Math.floor(divsStart[i].left) ||
        Math.floor(divNow[i].top) !== Math.floor(divsStart[i].top)
      ) {
        status = false;
      }
    }
    return status;
  };

  const isMoveable = (current) => {
    if (
      (emptyTop === current.top &&
        (emptyLeft === current.left + 100 ||
          emptyLeft === current.left - 100)) ||
      (emptyLeft === current.left &&
        (emptyTop === current.top + 100 || emptyTop === current.top - 100))
    ) {
      return true;
    }
    return false;
  };

  const initialize = () => {
    let pieces = $("#puzzlearea div");
    for (let i = 0; i < pieces.length; i++) {
      let piece = pieces[i];

      let x = (i % 4) * 100;
      let y = Math.floor(i / 4) * 100;

      piece.className = "puzzlepiece";
      piece.style.left = x + "px";
      piece.style.top = y + "px";
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = -x + "px " + -y + "px";
      piece.x = x;
      piece.y = y;
    }
    $("#btnFileUpload").on("click", () => {
      document.getElementById("my-file").click();
    });
    $("#my-file").on("change", () => {
      console.log($("#my-file").val());
    });
  };
}
$(document).ready(() => {
  startPuzzle();
});
