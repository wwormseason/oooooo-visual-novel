let currentPage = 1,
  counters,
  objects,
  Monocraft,
  previousPage = 0;
let img1W, img2W;

function preload() {
  Monocraft = loadFont("./assets/Monocraft.ttf");

  bg = createGraphics(windowWidth, windowHeight);
  counters = {
    salmonella: Math.random() * 20,
    travel: 0,
    paddle: false,
  };

  objects = {
    1: {
      pageText:
        "The luxury cruise you boarded for vacation suddenly, violently shakes. You hear an explosion rock the whole vessel. What choice do you make?",
      choiceText: ["1: You run towards the door", "2: You hide under the bed"],
      consequence: [2, 3],
      audio: loadSound("./assets/sounds/explosion.mp3"),
      bg: loadImage("./assets/bg/cruiseRoom.png"),
    },
    2: {
      pageText:
        "You frantically run towards you cabin door. You're not dying here today, you tell yourself.",
      choiceText: ["1. Continue"],
      consequence: [5],
      audio: loadSound("./assets/sounds/run.mp3"),
      bg: loadImage("./assets/bg/cruiseRoom.png"),
    },
    3: {
      pageText:
        "You're scared out of your mind. An explosion wasn't on the pamphlet you read before you paid for your ticket! Unsure of what to do, your animal brain takes over and you scurry under your bed.",
      choiceText: ["1. Continue"],
      consequence: [4],
      audio: "",
      bg: loadImage("./assets/bg/cruiseBed.png"),
    },
    4: {
      pageText:
        "Another explosion reaches your ears. As you watch, water quickly fills your room. Horrified you jump up, but you're too late. You're caught in a third explosion and this is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/explosion.mp3"),
      bg: loadImage("./assets/bg/red.png"),
    },
    5: {
      pageText:
        "Reaching the ship's main deck, your eyes catch a horrifying sight. The passengers are in disarray and the ship is visibly faling apart. What a terrible vacation! You jump overboard to escape the flames and charging crowd.",
      choiceText: ["1: Roll to determine your fate"],
      consequence: [6, 7],
      threshold: 8,
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/cruiseDeck.png"),
    },
    6: {
      pageText:
        "You rolled below a 8. With a sinking feeling, you brain catches up with your body and you remember that you never learned to swim. There has never been a better time to regret refusing swim lessons as a kid. You're regret doesn't last long, as fear fills your mind instead. You struggle and flail in the water, but rather than helping you stay afloat, your actions attract the attention of a shark. This is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/drowning.mp3"),
      bg: loadImage("./assets/bg/shark.png"),
    },
    7: {
      pageText:
        "You rolled a 8 or above. Aren't you glad you didn't fight your mother when she insisted on putting you into swimming lessons? You tread water like a professional and a section of wood catches your eye. Swimming over you grab its edge and haul yourself onto the raft. You are momentarily safe!",
      choiceText: ["1: Continue"],
      consequence: [8],
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/raft.png"),
    },
    8: {
      pageText:
        "Now that you're not in immediate danger, you look at your surroundings and spot another poor, unfortunate soul in the water. Do you choose to save them? ",
      choiceText: ["1: Ignore them", "2: Attempt to help"],
      consequence: [10, 11],
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/companion.png"),
    },
    10: {
      pageText:
        "You heartlessly ignore them and leave them to their plight. Unfortunately, their flailing attract a shark and unsatisfied with its meager meal, the shark turns it's attention towards you. Your paddling is no match for a creature of the sea and this is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/shark.png"),
    },
    11: {
      pageText:
        "Paddling towards them, you offer a helping hand. The sea is rough and merciless to those in its grasp and try as you might you can barely reach them. Summoning the least of your strength you make one last attempt.",
      choiceText: ["1: Roll to determine your fates"],
      consequence: [12, 13],
      threshold: 10,
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/companion.png"),
    },
    12: {
      pageText:
        "You rolled below a 10. Unfortunately, your body fails you and you overreach. You topple into the ocean and the raft quickly drifts away. Our of the corner of your eye, you spot a lurking shark. But, before you can raise an alarm, it takes your life. This is where your story ends",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/shark.png"),
    },
    13: {
      pageText:
        "You rolled a 10 or above. You stretch your arm as far as it can go, steadying yourself on the raft with your other hand. The other person grabs onto your outstretch hand and you haul them onto the raft with you. The moment they're safe you both collapse, exhausted. The arduousness of the past hour catches up to you and you both fall asleep.",
      choiceText: ["1: Continue"],
      consequence: [14],
      audio: loadSound("./assets/sounds/storm.mp3"),
      bg: loadImage("./assets/bg/black.png"),
    },
    14: {
      pageText:
        "You slowly return to conciousness and opening your eyes, you are greeting by the shining sun. Your muscles ache from last night. Turning to your side, you see your new companion still fast asleep. You shake them awake and after some dicussion, you both agree that attempting to fish is a wise course of action.",
      choiceText: ["1: Roll to determine your fates"],
      consequence: [15, 16],
      threshold: 2,
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/sky.png"),
    },
    15: {
      pageText:
        "You rolled below an 12. You do your best to fish with nothing but your bare hands. Unfortunately, your best is not enough and neither you nor your friend catch any fish. The sun beating down on you and your fishing attempts wear you down. The hunger is too much to bear and this is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/black.png"),
    },
    16: {
      pageText:
        "You rolled an 12 or above. You do your best to fish with nothing but your bare hands. Thankfully, both you and your friend are able to catch some fish. You have no means of cooking the fish, but your hunger outweighs your caution. You both eat has much raw fish as you can.",
      choiceText: ["1: Continue"],
      consequence: [17],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/caughtFish.png"),
    },
    17: {
      pageText:
        "There is no sign of land nearby, so resolving to make the most of your abilities you paddle furiously with your partner.",
      choiceText: ["1: Continue"],
      consequence: [18],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/ocean.PNG"),
      travel: (counters.travel += 2),
    },
    18: {
      pageText:
        "You continue to paddle furiously as the sun beats down on your back.",
      choiceText: ["1: Continue"],
      consequence: [19],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/ocean.PNG"),
      travel: (counters.travel += 2),
    },
    19: {
      pageText:
        "You strength begins to wane, but steeling your resolve you hold out paddling for as long as you can.",
      choiceText: ["1: Continue"],
      consequence: [20, 21],
      threshold: 3,
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/ocean.PNG"),
    },
    20: {
      pageText:
        "You rolled a below a 3. You unfortunately caught salmonella from the fish you ate. You feel nauseous and as if your whole body is burning up. You collapse pathetically and this is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/black.png"),
    },
    21: {
      pageText:
        "Your keen eye spots a plank of wood floating along the ocean current. You swiftly grab it and now you have 2 choices for how to use it. Your companion wants to use it as a makeshift paddle, but you can also expand the tiny raft.",
      choiceText: ["1: Use as paddle", "2: Use to expand raft"],
      consequence: [22],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/wood.png"),
    },
    22: {
      pageText:
        "With renewed vigor you paddle forward, buoyed by your discovery and the hope of survival.",
      choiceText: ["1: Continue"],
      consequence: [23],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/ocean.PNG"),
      travel: counters.paddle ? (counters.travel += 5) : (counters.travel += 2),
    },
    23: {
      pageText:
        "The sun sets and your companion agrees to take first shift of night watch. You fall into a dreamless sleep, as the stars watch over you.",
      choiceText: ["1: Continue"],
      consequence: [24],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/night.png"),
    },
    24: {
      pageText:
        "It's a new day! Unfortunately, the exclamation mark is no indication of good news. The weather is terrible with dark clouds rolling in above and a roiling sea below. There is no fish to be caught today, but your stomach grumbles of sustenance.",
      choiceText: ["1: Continue"],
      consequence: [25, 26],
      audio: loadSound("./assets/sounds/oceanStorm.mp3"),
      bg: loadImage("./assets/bg/stormy.png"),
    },
    25: {
      pageText:
        "You paddle until you cannot, at which point you rest. You repeat this cycle, day, after day, after day. The monotony wears you down. Some days you can catch fish, some days you cannot. The sea fights against you. Some days when the hunger gets bad, you think you hear the voice of your dead companion. You're afraid, you never believed in ghosts, but the solitude is enough to drive anyone mad. The world will never know what happened to you out here. This is where your story ends.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/ocean.png"),
    },
    26: {
      pageText:
        "You're paddling bears fruit and your companion sees land in the distance. What joy! As you approach, you see moving objects in the shape of people. You're both saved! Welcomed warmly back to civilization, you and your companion become lifelong friends, bonding over your shared experience.",
      choiceText: ["0: Restart"],
      consequence: [1],
      audio: loadSound("./assets/sounds/ocean.mp3"),
      bg: loadImage("./assets/bg/land.png"),
    },
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(screenLeft, TOP);
  img1W = 0;
  img2W = 1920;
  moveSpeed = 5;
}

function draw() {
  if (
    currentPage == 17 ||
    currentPage == 18 ||
    currentPage == 19 ||
    currentPage == 22
  ) {
    img1W = (frameCount % width) + 300;
    img2W = (frameCount % width) - 300;
    image(objects[currentPage].bg, img2W, 0, width, height);
    image(objects[currentPage].bg, img1W, 0, width, height);
  } else {
    image(objects[currentPage].bg, 0, 0, width, height);
  }

  fill(113, 53, 27, 200);
  stroke(70, 26, 8);
  strokeWeight(5);

  // raft
  // plank 1
  rect(60, 520, width - 600, 50);
  rect(200, 520, width - 450, 50);
  rect(490, 520, width - 550, 50);
  //plank 2
  rect(80, 570, width - 160, 50);
  //plank 3
  rect(55, 620, width - 500, 50);
  rect(300, 620, width - 340, 50);
  //plank 4
  rect(90, 670, width - 440, 50);
  rect(390, 670, width - 480, 50);

  //top tetbox
  rect(width / 2.5, height * 0.2, width / 3.5, 50);

  //bottom textbox
  if (objects[currentPage].choiceText[1]) {
    rect(width / 2.5, height * 0.4, width / 3.5, 50);
  }

  fill(255);
  textSize(24);
  textFont(Monocraft);
  push();
  textAlign(CENTER);
  text(objects[currentPage].pageText, 80, height * 0.66, width - 160, 200);
  pop();
  textAlign(LEFT);
  textSize(18);
  text(
    objects[currentPage].choiceText[0],
    width / 2.3,
    height * 0.22,
    windowWidth,
    windowHeight
  );
  if (objects[currentPage].choiceText[1]) {
    text(
      objects[currentPage].choiceText[1],
      width / 2.3,
      height * 0.42,
      windowWidth,
      windowHeight
    );
  }
  if (currentPage != previousPage) {
    if (objects[currentPage].audio) {
      objects[currentPage].audio.play();
    }
    previousPage = currentPage;
  }
}

function keyPressed() {
  if (key === "0") {
    currentPage = 1;
  } else {
    const choice = parseInt(key);
    if (!isNaN(choice)) {
      if (objects[currentPage].audio) {
        objects[currentPage].audio.stop();
      }
      if (currentPage == 5 || currentPage == 11 || currentPage == 14) {
        const roll = Math.floor(Math.random() * 21);
        if (roll < objects[currentPage].threshold) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else if (currentPage == 19) {
        if (counters.salmonella < objects[currentPage].threshold) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else if (currentPage == 21) {
        currentPage++;
      } else if (currentPage == 24) {
        if (counters.travel < 5) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else {
        currentPage = objects[currentPage].consequence[choice - 1];
      }
    }
  }
}

function mousePressed() {
  if (
    mouseX > width / 2.5 &&
    mouseX < width / 2.5 + width / 3.5 &&
    mouseY > height * 0.2 &&
    mouseY < height * 0.2 + 50
  ) {
    const choice = 1;
    if (objects[currentPage].audio) {
      objects[currentPage].audio.stop();
    }
    if (currentPage == 5 || currentPage == 11 || currentPage == 14) {
      const roll = Math.floor(Math.random() * 21);
      if (roll < objects[currentPage].threshold) {
        currentPage = objects[currentPage].consequence[0];
      } else {
        currentPage = objects[currentPage].consequence[1];
      }
    } else if (currentPage == 19) {
      if (counters.salmonella < objects[currentPage].threshold) {
        currentPage = objects[currentPage].consequence[0];
      } else {
        currentPage = objects[currentPage].consequence[1];
      }
    } else if (currentPage == 21) {
      currentPage++;
    } else if (currentPage == 24) {
      if (counters.travel < 5) {
        currentPage = objects[currentPage].consequence[0];
      } else {
        currentPage = objects[currentPage].consequence[1];
      }
    } else {
      currentPage = objects[currentPage].consequence[choice - 1];
    }
  } else if (objects[currentPage].choiceText[1]) {
    if (
      mouseX > width / 2.5 &&
      mouseX < width / 2.5 + width / 3.5 &&
      mouseY > height * 0.4 &&
      mouseY < height * 0.4 + 50
    ) {
      const choice = 2;
      if (objects[currentPage].audio) {
        objects[currentPage].audio.stop();
      }
      if (currentPage == 5 || currentPage == 11 || currentPage == 14) {
        const roll = Math.floor(Math.random() * 21);
        if (roll < objects[currentPage].threshold) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else if (currentPage == 19) {
        if (counters.salmonella < objects[currentPage].threshold) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else if (currentPage == 21) {
        currentPage++;
      } else if (currentPage == 24) {
        if (counters.travel < 5) {
          currentPage = objects[currentPage].consequence[0];
        } else {
          currentPage = objects[currentPage].consequence[1];
        }
      } else {
        currentPage = objects[currentPage].consequence[choice - 1];
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bg = createGraphics(windowWidth, windowHeight);
}
