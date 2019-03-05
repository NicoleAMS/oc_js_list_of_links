// List of links to show. Each link has:
// - a title
// - a URL
// - an author (the person who added it)

var linkList = [
    {
        title: "Kottke",
        url: "http://kottke.org",
        author: "brett.suggs"
    },
    {
        title: "National Geographic",
        url: "http://www.nationalgeographic.com",
        author: "jessica"
    },
    {
        title: "American Museum of Natural History",
        url: "http://www.amnh.org",
        author: "aurora.nicole"
    }
];

function createLinkElement(link) {
    var linktitle = document.createElement("a");
    linktitle.href = link.url;
    linktitle.style.color = "#428bca";
    linktitle.style.textDecoration = "none";
    linktitle.style.marginRight = "5px";
    linktitle.appendChild(document.createTextNode(link.title));

    var linkUrl = document.createElement("span");
    linkUrl.appendChild(document.createTextNode(link.url));

    var titleLine = document.createElement("h4");
    titleLine.style.margin = "0px";
    titleLine.appendChild(linktitle);
    titleLine.appendChild(linkUrl);

    var detailsLine = document.createElement("span");
    detailsLine.appendChild(document.createTextNode("Added by " + link.author));

    var linkDiv = document.createElement("div");
    linkDiv.classList.add("link");
    linkDiv.appendChild(titleLine);
    linkDiv.appendChild(detailsLine);
    return linkDiv;
}

var content = document.getElementById("content");
linkList.forEach(function (link) {
    var linkElement = createLinkElement(link);
    content.appendChild(linkElement);
});


function showForm() {
    // HIDE BUTTON
    var addBtn = document.getElementById("add-btn");
    addBtn.classList.add("hidden");

    // SHOW FORM
    var formDiv = document.getElementById("form-div");
    formDiv.classList.remove("hidden");

    validateForm();
    submitForm();
}


function validateForm() {
    var url = document.getElementById("url");
    url.addEventListener("change", function(e) {
        var splitUrl = e.target.value.split("/");
        if (splitUrl[0] !== "https:" && splitUrl[0] !== "http:") {
            e.target.value = "http://" + e.target.value;
        }
    }); 
}

function submitForm() {
    var form = document.getElementById("add-link-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        addLink(e);
    });
}

function addLink(data) {
    var link = {
        title: data.target.title.value,
        author: data.target.author.value,
        url: data.target.url.value
    }
    var linkElement = createLinkElement(link);
    content.prepend(linkElement);
    showMessage(link);
}

function showMessage(linkEl) {
    var messageDiv = document.getElementById("message");
    messageDiv.classList.remove("hidden");
    var message = document.createElement("p");
    message.id = "alert";
    message.innerHTML="The link to '" + linkEl.title + "' was successfully added";
    messageDiv.appendChild(message); 

    // HIDE MESSAGE
    setTimeout(function(){ 
        messageDiv.classList.add("hidden");
        messageDiv.removeChild(message);
    }, 2000);

    resetForm();
}

function resetForm() {
    // RESET FORM
    var form = document.getElementById("add-link-form");
    form.reset();

    // HIDE FORM
    var formDiv = document.getElementById("form-div");
    formDiv.classList.add("hidden");

    // SHOW BUTTON
    var addBtn = document.getElementById("add-btn");
    addBtn.classList.remove("hidden");
}

