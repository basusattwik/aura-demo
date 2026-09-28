// Renders the audio comparison tables declared in samples.js.

function buildTable(set) {
  const table = document.createElement("table");
  table.className = "audio-table";

  const head = table.createTHead().insertRow();
  head.appendChild(Object.assign(document.createElement("th"), { textContent: "#" }));
  for (const label of set.labels) {
    const th = document.createElement("th");
    th.textContent = label;
    if (label.includes("ours")) th.classList.add("ours");
    head.appendChild(th);
  }

  const body = table.createTBody();
  set.clips.forEach((clip, i) => {
    const row = body.insertRow();
    const index = row.insertCell();
    index.className = "clip-index";
    index.textContent = i + 1;

    for (const system of set.systems) {
      const cell = row.insertCell();
      if (system === "ours") cell.classList.add("ours");
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "none";
      audio.src = `${clip.dir}/${system}.flac`;
      cell.appendChild(audio);
    }
  });
  return table;
}

for (const [name, set] of Object.entries(SAMPLES)) {
  const mount = document.getElementById(`${name}-table`);
  if (mount) mount.appendChild(buildTable(set));
}

// Only one excerpt at a time, otherwise comparisons turn into a pile-up.
document.addEventListener("play", (e) => {
  for (const a of document.querySelectorAll("audio")) {
    if (a !== e.target) a.pause();
  }
}, true);
