function updateClock() {
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");
  

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;

  const options = { weekday: "long", month: "long", day: "numeric" };
  dateElement.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000);
updateClock();
