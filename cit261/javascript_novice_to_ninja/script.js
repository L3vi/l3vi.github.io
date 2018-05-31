const spiderman = {
    name: "Peter Parker",
    alias: "Spider-man",
    powers: ["Web slinging", "Superhuman strength", "Spidey sense"],
    hero: true,
    villain: false,
    attack: "Shoots spider web"
};

const ironman = {
    name: "Tony Stark",
    alias: "Iron man",
    powers: ["Genius", "Billionaire", "Playboy", "Philanthropist"],
    hero: true,
    villain: false,
    attack: "Shoots laser beams from hands"
};

const ultron = {
    name: "Ultron",
    alias: "Ultron",
    powers: ["Superhuman strength", "Superhuman durability", "Flight", "Robotic expertise"],
    hero: false,
    villain: true,
    attack: "builds army"
};

const thanos = {
    name: "Thanos",
    alias: "The Mad Titan",
    powers: ["Cursed with knowledge", "Superhuman strength", "Infinity gauntlet", "Control over power, space, reality, time, mind, and the soul"],
    hero: false,
    villain: true,
    attack: "*snaps fingers*"
};


function displayCharacter(name) {
    let superInfo = document.getElementById('superInfo');
    switch (name.innerHTML) {
        case "Spider-Man":
            superInfo.innerHTML = ""
            for (const key in spiderman) {
                if (key == "powers") {
                    // This makes sure the array of powers are separated by spaces
                    superInfo.innerHTML += key + ": " + spiderman[key].join(", ") + '<br/>';
                } else {
                    // Otherwise just display it as usual next to it's key
                    superInfo.innerHTML += key + ": " + spiderman[key] + '<br/>';
                };
            };
            break;
        case "Iron Man":
            superInfo.innerHTML = ""
            for (const key in ironman) {
                if (key == "powers") {
                    superInfo.innerHTML += key + ": " + ironman[key].join(", ") + '<br/>';
                } else {
                    superInfo.innerHTML += key + ": " + ironman[key] + '<br/>';
                };
            };
            break;
        case "Ultron":
            superInfo.innerHTML = ""
            for (const key in ultron) {
                if (key == "powers") {
                    superInfo.innerHTML += key + ": " + ultron[key].join(", ") + '<br/>';
                } else {
                    superInfo.innerHTML += key + ": " + ultron[key] + '<br/>';
                };
            };
            break;
        case "Thanos":
            superInfo.innerHTML = ""
            for (const key in thanos) {
                if (key == "powers") {
                    superInfo.innerHTML += key + ": " + thanos[key].join(", ") + '<br/>';
                } else {
                    superInfo.innerHTML += key + ": " + thanos[key] + '<br/>';
                };
            };
            break;
        default:
            alert("Hello World!");
            break;
    };
};