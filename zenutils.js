function print(message = "", message_color = "") {
  let message_string = message.toString();
  let prefix = zen.prefix || "zen: ";
  let prefix_color = zen.prefix_color || "";

  
  let prefix_string = prefix.toString();
  let prefix_color_string = prefix_color.toString();
  let message_color_string = message_color.toString();

  function hexToRgb(hex) {
    const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
    if (!match) return null;
    const rgb = parseInt(match[1], 16);
    return [(rgb >> 16) & 0xff, (rgb >> 8) & 0xff, rgb & 0xff];
  }
  const rgbToAnsi = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;

  function mainColorConvert(color_str) {
    return color_str.startsWith("#") ? rgbToAnsi(...hexToRgb(color_str)) : "";
  }

  const message_color_begin = mainColorConvert(message_color_string);
  const prefix_color_begin = mainColorConvert(prefix_color_string);
  const color_end = "\x1b[0m";

  console.log(prefix_color_begin + prefix_string + color_end + message_color_begin + message_string + color_end);
}

function sleep(seconds) {
  print("sleeping for " + seconds + " seconds...");
  const fps = zen.fps || 60;
  let start = Date.now();
  const end = start + seconds * 1000;
  while (Date.now() < end) {
    if (Date.now() - start > 1000 / fps) {
      start = Date.now();
    }
  }
}

function calculate_gap_between_horizontal_lines(lines = 25) {
  return window.innerHeight / lines;
}

function calculate_gap_between_vertical_lines(lines = 25) {
  return window.innerWidth / lines;
}

function horizontal(lines = 25, color = "linen") {
  const gap_between_horizontal_lines = calculate_gap_between_horizontal_lines(lines);
  for (let y = 0; y < window.innerHeight; y += gap_between_horizontal_lines) {
    const line = document.createElement("div");
    line.style.position = "fixed",
    line.style.transform = `translateY(${y}px)`,
    line.style.width = "100%";
    line.style.height = "0";
    line.style.borderTop = `1px solid ${color}`;
    line.style.pointerEvents = "none";
    line.style.zIndex = "9999";
    document.body.appendChild(line);
  }
}

function vertical(lines = 25, color = "linen") {
  const gap_between_vertical_lines = calculate_gap_between_vertical_lines(lines);
  for (let x = 0; x < window.innerWidth; x += gap_between_vertical_lines) {
    const line = document.createElement("div");
    line.style.position = "fixed";
    line.style.transform = `translateX(${x}px)`,
    line.style.height = "100%";
    line.style.width = "0";
    line.style.borderLeft = `1px solid ${color}`;
    line.style.pointerEvents = "none";
    line.style.zIndex = "9999";
    document.body.appendChild(line);
  }
}

const ruler = {calculate_gap_between_horizontal_lines, calculate_gap_between_vertical_lines, horizontal, vertical};

const zen = {print, sleep, ruler};

// zen.prefix = "The world: ";
// zen.print("hacking...", "#f09642");

// zen.fps = 120;
// zen.sleep(3);

// zen.print("hacked!", "#C1E6C6")

// zen.ruler.horizontal(20, "linen");
