window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.onresult = (event) => {
  const speechToText = event.results[event.results.length - 1][0].transcript;
  console.log("speechToText", speechToText);
  if (event.results[0].isFinal) {
    if (speechToText.includes("what is the time")) {
      //   speak(getTime);
      utterThis = new SpeechSynthesisUtterance(getTime());
      synth.speak(utterThis);
    }
    if (speechToText.includes("what is today's date")) {
      speak(getDate);
    }
    if (speechToText.includes("what is the weather in")) {
      getTheWeather(speechToText);
    }

    if (speechToText.includes("scroll down")) {
      window.scrollBy(0, 100);
    }
    if (speechToText.includes("scroll up")) {
      window.scrollBy(0, -100);
    }
    if (speechToText.includes("open")) {
      let tabName = speechToText.substring(6);
      if (tabName.includes("new tab")) {
        var redirectWindow = window.open("http://google.com", "_blank");
        redirectWindow.location;
      } else {
        var redirectWindow = window.open(tabName, "_blank");
        redirectWindow.location;
      }
    }
    if (speechToText.includes("open download")) {
      window.open("chrome://downloads/", "_blank");
    }
    if (speechToText.includes("open history")) {
      window.open("chrome://history/", "_blank");
    }
    if (speechToText.includes("go forward")) {
      history.forward();
    }
    if (speechToText.includes("go back")) {
      history.back();
    }
    if (speechToText.includes("Close tab")) {
      window.close();
    }
    if (speechToText.includes("ZoomIn")) {
      zoomIn();
    }
    if (speechToText.includes("zoom out")) {
      zoomOut();
    }
  }
};

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
};

const getDate = () => {
  const time = new Date(Date.now());
  return `today is ${time.toLocaleDateString()}`;
};

const getTheWeather = (speech) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      speech.split(" ")[5]
    }&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      if (weather.cod === "404") {
        utterThis = new SpeechSynthesisUtterance(
          `I cannot find the weather for ${speech.split(" ")[5]}`,
        );
        synth.speak(utterThis);
        return;
      }
      utterThis = new SpeechSynthesisUtterance(
        `the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`,
      );
      synth.speak(utterThis);
    });
};
function zoomIn() {
  var body = document.querySelector("body");
  var currWidth = body.clientWidth;
  if (currWidth == 1000000) {
    alert("Maximum zoom-in level of 1 Million reached.");
  } else {
    body.style.width = currWidth + 50 + "px";
  }
}
function zoomOut() {
  var body = document.querySelector("body");
  var currWidth = body.clientWidth;
  if (currWidth == 500000) {
    alert("Maximum zoom-out level reached.");
  } else {
    body.style.width = currWidth - 50 + "px";
  }
}

recognition.start();
