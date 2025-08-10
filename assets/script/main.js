let backBtn = document.querySelector(".back-btn");
let getStartedBtn = document.querySelector(".get-started-btn");

// Go Back:
// ?. is feature in ES2020, ?. avoids error if the element is null or undefined
backBtn?.addEventListener("click", function () {
    window.history.back();
});


// Go to levels page:
getStartedBtn?.addEventListener("click", function () {
    window.location.assign("../../levels.html");
});
