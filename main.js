var player = "red";
const players = { "red": "yellow", "yellow": "red" },
  output = document.querySelector("output"),
  tbody = document.querySelector("tbody"),
  rows = tbody.querySelectorAll("tr"),
  // prepArray = (n) => {
  //   return Array(n).fill("");
  // },
  connect4 = (strip) => {
    const rslt = /(?:(red){4}|(yellow){4})/.exec(strip);
    if (rslt) {
      output.classList.add(rslt[1] || rslt[2]);
      return true;
    }
    return false;
  },
  check4Winner = () => {
    var strips = {
      h: [],
      v: new Array(7).fill(""),
      f: new Array(12).fill(""),
      b: new Array(12).fill("")
    },
      strip, color, winner, dir;
    rows.forEach((row, ri) => {
      strip = "";
      row.querySelectorAll("td").forEach((cell, ci) => {
        color = cell.getAttribute("class") || " ";
        strips.b[ci - ri + rows.length - 1] += color;
        strips.f[ci + ri] += color;
        strips.v[ci] += color;
        strip += color;
      });
      strips.h.push(strip);
      winner = winner || connect4(strip);
    });

    console.log(strips); // game data object

    for (dir in strips) {
      if (!winner && strips.hasOwnProperty(dir)) {
        strips[dir].forEach((s) => {
          winner = winner || connect4(s);
        });
      }
    }
  },
  dropCounter = (ci) => {
    var cell, pc;
    rows.forEach((row) => {
      if (!(pc = row.childNodes[ci]).getAttribute("class")) {
        cell = pc;
      }
    });
    if (cell) {
      cell.classList.add(player = players[player]);
      check4Winner();
    }
  };
output.addEventListener("click", () => {
  output.removeAttribute("class");
  tbody.querySelectorAll("td").forEach((c) => {
    c.removeAttribute("class");
  });
}, false);
tbody.addEventListener("click", (evt) => {
  const trg = evt.target;
  if (!output.getAttribute("class") && trg.tagName.toLowerCase() === "td") {
    dropCounter(trg.cellIndex);
  }
}, false);