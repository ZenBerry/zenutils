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

zen = {print, sleep};

// zen.prefix = "The world: ";
// zen.print("hacking...", "#f09642");

// zen.fps = 120;
// zen.sleep(3);

// zen.print("hacked!", "#C1E6C6")
