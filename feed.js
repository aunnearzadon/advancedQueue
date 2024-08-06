const socket = new WebSocket('ws://localhost:8080');
const current = document.getElementById('number')
let data

socket.onopen = function(event) {
  // Handle connection open
  console.log(event)
};

socket.onmessage = function(event) {
  // Handle received message
  console.log('WebSocket message received:', event);
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Result: " + reader.result);
      data = JSON.parse(reader.result)
      if(current.innerHTML != data.current) {
        calloutNumber(data.current)
      }
      current.innerHTML = data.current
    };
    reader.readAsText(event.data)
  } else {
    console.log("Result: " + event.data);
  }
};

socket.onclose = function(event) {
  // Handle connection close
  console.log(event)
};

const calloutNumber = (number) => {
  const text = `calling number ${number}`
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech)
}
