const main = document.querySelector("main"),
  voicesSelect = document.getElementById("voices"),
  textarea = document.getElementById("text"),
  readBtn = document.getElementById("read"),
  toggleBtn = document.getElementById("toggle"),
  closeBtn = document.getElementById("close"),
  data = [
    {
      image: "./img/drink.jpg",
      text: "I'm Thirsty",
    },
    {
      image: "./img/food.jpg",
      text: "I'm Hungry",
    },
    {
      image: "./img/tired.jpg",
      text: "I'm Tired",
    },
    {
      image: "./img/hurt.jpg",
      text: "I'm Hurt",
    },
    {
      image: "./img/happy.jpg",
      text: "I'm Happy",
    },
    {
      image: "./img/angry.jpg",
      text: "I'm Angry",
    },
    {
      image: "./img/sad.jpg",
      text: "I'm Sad",
    },
    {
      image: "./img/scared.jpg",
      text: "I'm Scared",
    },
    {
      image: "./img/outside.jpg",
      text: "I Want To Go Outside",
    },
    {
      image: "./img/home.jpg",
      text: "I Want To Go Home",
    },
    {
      image: "./img/school.jpg",
      text: "I Want To Go To School",
    },
    {
      image: "./img/grandma.jpg",
      text: "I Want To Go To Grandmas",
    },
  ];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement("div"),
    { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src='${image}' alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // add and remove an active effect
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 1000);
  });

  main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak the text
function speakText() {
  speechSynthesis.speak(message);
}

// voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

getVoices();
