const containerDiv = document.createElement('div');
containerDiv.className = "container";

const pageTitle = document.createElement('h1');
pageTitle.className = "title";
pageTitle.innerHTML = "<strong>RSS Виртуальная клавиатура</strong>";
containerDiv.append(pageTitle);

const pageText = document.createElement('p');
pageText.className = "tit";
pageText.innerHTML = "<Клавиатура создана в операционной системе Windows/>";
containerDiv.append(pageText);

const area = document.createElement('textarea');
area.className = "use-keyboard-input"
area.setAttribute('id', 'te');
containerDiv.append(area);



const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.start(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const piece = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "keyboard tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shift ", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "arrow drop up", "shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "arrow left", "arrow drop down", "arrow right", "Ctrl"
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "shift"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                case "del":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = "Del";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;
                case "caps":
                    keyElement.classList.add("keyboard__key-wide", "keyboard__key--activatable");
                    keyElement.innerHTML = "Capslock";
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "shift":
                case "shift ":
                    keyElement.classList.add("keyboard__key-wide", "keyboard__key--activatable");
                    keyElement.innerHTML = "Shift";

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                    });
                    keyElement.addEventListener("mouseup", () => {
                        this._toggleCapsLock();
                    });

                    break;
                    case "Ctrl":
                        keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = "Ctrl";
                    break
                    case "Win":
                        keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = "Win";
                    break
                    case "Alt":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = "Alt";
                    break;
                case "enter":
                    keyElement.classList.add("keyboard__key-wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "arrow left":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = createIconHTML("arrow_left");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "◄";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow drop down":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = createIconHTML("arrow_drop_down");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▼";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow drop up":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = createIconHTML("arrow_drop_up");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▲";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrow right":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = createIconHTML("arrow_right");

                    keyElement.addEventListener("click", () => {
                       this.properties.value += "►";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case "keyboard tab":
                    keyElement.classList.add("keyboard__key-black");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key-wide", "keyboard__key-dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            piece.appendChild(keyElement);

            if (insertLineBreak) {
                piece.appendChild(document.createElement("br"));
            }
        });

        return piece;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    start(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        ;
    },


};

// document.onkeypress = function (event) {
//     console.log(event.code);
//     console.log(event.keyCode);
//     document.querySelectorAll('#keyboard .keyboard__key').forEach(function (element) {
//       element.classList.remove('active');
//     });
//     document.querySelector('#keyboard .keyboard__key[data="' + event.keyCode + '"]').classList.add('active');
//   }
// document.querySelectorAll('#keyboard .keyboard__key').forEach(function (element) {
//     element.onclick = function (event) {
//       document.querySelectorAll('#keyboard .keyboard__key').forEach(function (element) {
//         element.classList.remove('active');
//       });
//       let code = this.getAttribute('data');
//       this.classList.add('active');
//       console.log(code);
      
//     }
//   });

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

 document.body.appendChild(containerDiv);


