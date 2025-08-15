// change from dark to light and opesit

let mode = document.querySelectorAll("link")[3];
let shapeMode = document.querySelector(".on");

shapeMode.parentElement.onclick = function () {
  let success = false;
  Array.from(this.children).forEach((e, index) => {
    if (e.classList.contains("on") && index === 0 && !success) {
      e.classList.remove("on");
      this.children[index + 1].classList.add("on");
      mode.href = "CSS/light.css";
      success = true;
    }
    if (e.classList.contains("on") && index === 1 && !success) {
      e.classList.remove("on");
      this.children[index - 1].classList.add("on");
      mode.href = "CSS/dark.css";
      success = true;
    }
  });
};

// Bring Data From Json File
let extensionsContainer = document.querySelector(".extensions");
let ul = document.querySelector(".top ul");

window.onload = function () {
  fetch("https://raw.githubusercontent.com/Abdalrahmanme/Extension-Manager/refs/heads/main/data.json")
    .then((reuslt) => {
      return reuslt.json();
    })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        let extension = document.createElement("div");
        let top = document.createElement("div");
        let img = document.createElement("img");
        let txt = document.createElement("txt");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let bottom = document.createElement("div");
        let button = document.createElement("button");
        let toggle = document.createElement("toggle");

        extension.classList.add("extension");
        top.classList.add("topo");
        txt.classList.add("txt");
        bottom.classList.add("bottom");
        toggle.classList.add("toggle");

        h3.innerHTML = `${result[i].name}`;
        p.innerHTML = `${result[i].description}`;
        button.innerHTML = "Remove";
        img.src = `${result[i].logo}`;

        extensionsContainer.appendChild(extension);
        extension.appendChild(top);
        extension.appendChild(bottom);
        top.appendChild(img);
        top.appendChild(txt);
        txt.appendChild(h3);
        txt.appendChild(p);
        bottom.appendChild(button);
        bottom.appendChild(toggle);

        toggle.onclick = function () {
          toggle.classList.toggle("active");
          extension.classList.toggle("active");
        };

        button.onclick = function () {
          this.parentElement.parentElement.remove()
        }

        if (result[i].isActive) {
          extension.classList.toggle("active");
          toggle.classList.add("active");
        }
      }
    });
};

[...ul.children].forEach((e) => {
  e.addEventListener("click", function () {
    [...ul.children].forEach((e) => {
      e.classList.remove("active");
    });

    e.classList.add("active");

    if (e.getAttribute("data-string") === "active") {
      Array.from(extensionsContainer.children).forEach((e) => {
        if (!e.classList.contains("active")) {
          e.style.display = "none";
        } else {
          e.style.display = "block";
        }
      });
    } else if (e.getAttribute("data-string") === "inactive") {
      Array.from(extensionsContainer.children).forEach((e) => {
        if (e.classList.contains("active")) {
          e.style.display = "none";
        } else {
          e.style.display = "block";
        }
      });
    } else {
      Array.from(extensionsContainer.children).forEach((e) => {
        e.style.display = "block";
      });
    }
  });
});
