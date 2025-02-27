import EventHandler, {AnimationHandler, CollisionHandler, GravityHandler, HandlerManager} from "./event_handler.js"
import { findAndRemoveFromList } from "./utils.js"
import TileRegistry from "./tile_registry.js"
import CollisionDetector from "./collision_detector.js"
import Game from "./game.js"


/**
 * Dies ist die Basisklasse für alle Spiel-Objekte.
 * 
 * Wenn ein spezialisiertes Spiel-Objekt erzeugt wird, dann soll es 
 * immer diese Klasse erweitern. Wenn die Funktionen von der Basisklasse
 * überschrieben werden, sollten diese immer zuerst mit `super.function()` 
 * aufgerufen werden, so das die eigentliche Funktionalität der Spiel-Objekte
 * erhalten bleibt.
 */
export class GameObject {
  constructor(x, y, options = {sheet, layer: "background", collisionTags: []}) {
    this.sheet = options.sheet
    this.tileSize = 32
    this.x = x * this.tileSize
    this.y = y * this.tileSize
    this.col = 0
    this.row = 0
    this.layer = options.layer
    this.handlers = new HandlerManager([])
    TileRegistry.layers[this.layer].push(this)
    this.collisionTags = options.collisionTags
    this.collisionTags.forEach(tag => {
      CollisionDetector.layers[tag].push(this)
    })
  }

  /**
   * Zeichnet das Spiel-Objekt auf das Canvas. Das Spiel-Objekt
   * kennt dabei seine Position und welches Bild gezeichnet werden soll.
   * @param {CanvasRenderingContext2D} ctx Das Canvas, worauf das Spiel-Objekt gezeichnet werden soll.
   */
  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
      this.x, this.y, this.tileSize, this.tileSize
    )
  }

  /**
   * Zerstört das Spiel-Objekt und entfernt es aus dem Spiel.
   */
  destroy() {
    findAndRemoveFromList(TileRegistry.layers[this.layer], this)
    this.collisionTags.forEach(tag => {
      findAndRemoveFromList(CollisionDetector.layers[tag], this)
    })
  }

  /**
   * Berechne die Position und andere Eigenschaften des 
   * Spiel-Objekts neu. Wie das gemacht wird, wird in den 
   * verschieden Handlers angegeben. Ein Spiel-Objekt kann
   * z.B. einen Gravitations-Handler haben, dieser fügt dann
   * Gravitation für dieses Spiel-Objekt hinzu und berechnet die 
   * y-Position des Spiel-Objekts neu.
   */
  update(){
    this.handlers && this.handlers.runAll(this)
  }


}



export class Background1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.row = 0
    this.col = 3
  }
}

export class Erde extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.row = 0
    this.col = 4
  }
}

export class Background2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })
    this.row = 3
    this.col = 0
  }
}

export class Wasser extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 4
    this.col = 3
  }
}

export class kleinebüsche extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco3")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 10
    this.col = 4
  }
}

export class Roterpilz extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco3")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 10
    this.col = 3
  }
}

export class Erdhaufen extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Erdhaufen")
    super(x, y, {
      sheet: ground,
      layer: "worldBack",
      collisionTags: []
    })
    this.tileSize = 64
    this.row = 0
    this.col = 0
  }
  
}

export class Erdhaufen2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Erdhaufen")
    super(x, y, {
      sheet: ground,
      layer: "worldBack",
      collisionTags: []
    })
    this.tileSize = 64
    this.row = 0
    this.col = 1
  }
  
}

export class Roteblume extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco3")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 11
    this.col = 3
  }
}

export class Blume extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco3")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 2
    this.col = 4
  }
}

export class Blume2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 7
    this.col = 3
  }
}

export class Bank1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 15
    this.col = 4
  }
  
}

export class Bank2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 15
    this.col = 5
  }
  
}

export class Brunnen1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 3
    this.col = 6
  }
}

export class Brunnen2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 3
    this.col = 7
  }
}

export class Brunnen3 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 4
    this.col = 6
  }
}

export class Brunnen4 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 4
    this.col = 7
  }
}


export class Strand extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: ["world"]
    })
    this.row = 6
    this.col = 6
  }
}

export class Strand2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 7
    this.col = 6
  }
}

export class Tree1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 1
  }
  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize + 32,
      this.x, this.y, this.tileSize + 20, this.tileSize + 32
    )
  }
}

export class Tree2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 3
  }

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize + 32,
      this.x, this.y, this.tileSize + 32, this.tileSize + 32
    )
  }
}

export class Tree3 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.tileSize = 64
    this.row = 0
    this.col = 2
  }

  draw(ctx) {
    ctx.drawImage(
      this.sheet,
      this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize + 32,
      this.x, this.y, this.tileSize + 20, this.tileSize + 32
    )
  }
}

export class Busch1 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 7
    this.col = 0
  }
}

export class Lblume extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco1")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 4
    this.col = 5
  }
}
export class Busch2 extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 7
    this.col = 1
  }
}

export class Zaun extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco2")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 15
    this.col = 0
  }
}

export class Stone extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}

export class Water extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Waterhole")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Wall extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 1
    this.col = 3
  }
}

export class Cave extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["cave"]
    })
    this.row = 1
    this.col = 2
  }
}

export class FallingStone extends Stone {
  constructor(x, y) {
    super(x, y)
    this.handlers = new HandlerManager([
      new GravityHandler({
        maxGravity: 3,
        gravityForce: 1
      }),
      new CollisionHandler()
    ])
  }
  
}

export class Tree extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["forest"]
    })
    this.row = 1
    this.col = 1
  }
}

export class Crown extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Crown")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags:["pickups"]
    })
    this.row = 0
    this.col = 0
  }
}



export class Pilz extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 4
    this.col = 4
  }
}

export class Apfel extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Essen")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 3
  }
}

export class Cupcake extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Essen")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 5
    this.col = 5
  }
}

export class Lachssushi extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Essen")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 5
    this.col = 1
  }
}

export class Gelbsushi extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Essen")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 5
    this.col = 2
  }
}
export class Hedges extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Hedges")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["forest"]
    })
    this.tileSize = 32 
    this.row = 0
    this.col = 2
  }
}

export class Mushroompurple extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#ground")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 2
    this.col = 0
  }
}

export class Lapislazuli extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Crystals")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Ruby extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Crystals")
    super(x, y, {
      sheet: ground,
      layer: "item",
      collisionTags: ["pickups"]
    })
    this.row = 0
    this.col = 1
  }
}



export class Cavefloor extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })

    this.row = 2
    this.col = 1
  }
}

export class Bodenhöhle extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Deco4")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: []
    })

    this.row = 0
    this.col = 1
  }
}

export class Caveentrance extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#InsideCave")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: ["cave"]
    })
    this.row = 0
    this.col = 0
  }
}

export class Cavewall extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#InsideCave")
    super(x, y, {
      sheet: ground,
      layer: "background",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 1
  }
}


export class StoneGrey extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#InsideCave")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags: ["world"]
    })
    this.row = 0
    this.col = 2
  }
}
export class Cowwhite extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Cowwhite")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags:["world"]
    })
    this.tileSize = 32
    this.row = 0  
    this.col = 0
  }
}
export class Rand extends GameObject {
  constructor(x, y) {
    const ground = document.querySelector("#Rand")
    super(x, y, {
      sheet: ground,
      layer: "world",
      collisionTags:["world"]
    })
    this.tileSize = 32
    this.row = 0  
    this.col = 0
  }
}






class AnimatedGameObject extends GameObject {
  constructor(x, y, options) {
    super(x, y, options)
    this.frameCounter = 0
    this.dx = 0
    this.dy = 0
  }

  update() {
    super.update()
    this.x = this.x + this.dx
    this.y = this.y + this.dy
    this.dx = 0
    this.dy = 0
  }
}


export class Player extends AnimatedGameObject {
  constructor(x, y) {
    const img = document.querySelector("#character")
    super(x, y, {
      sheet: img,
      layer: "player",
      collisionTags: ["world", "pickups", "cave", "forest"]
    })
    this.tileSize = 32
    this.row = 0
    this.col = 1
    this.speed = 3
    this.handlers = new HandlerManager([
      new EventHandler(),
      new CollisionHandler(),
      new AnimationHandler({ framesPerAnimation: 15, numberOfFrames: 3})
    ])
  }

  jump() {
    this.handlers.get(GravityHandler).jump(this)
  }

  update() {
    super.update()
  }

  handle(ev) {
    if (ev === "KeyW") { this.move("up") }
    if (ev === "KeyS") { this.move("down") }
    if (ev === "KeyA") { this.move("left") }
    if (ev === "KeyD") { this.move("right") }
    
  }

  move(direction) {
    if (direction === "up") {
      this.dy = this.dy + (-1) * this.speed
      this.row = 2
    } else if (direction === "down") {
      this.dy = this.dy + (1) * this.speed
      this.row = 0
    } else if (direction === "left") {
      this.dx = this.dx + (-1) * this.speed
      this.row = 3
    } else if (direction === "right") {
      this.dx = this.dx + (1) * this.speed
      this.row = 1
    }
  }
}