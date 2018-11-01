var config = {
  width: 800,
  height: 600,
  parent: 'app',
  type: Phaser.WEBGL,
  backgroundColor: 0xacde00,
  physics: {
    default: 'impact',
    impact: {
      gravity: 0,
      maxVelocity: 100,
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var renderTexture
var cursors
function preload() {
  console.log('preload')
  this.load.image('avatar', 'assets/avatar.png');
}

function create() {
  let width = 1600;
  let height = 1200;
  // The world bounds is set bigger than game size so that camera scrolling is possible.
  this.impact.world.setBounds(0, 0, width, height, 10);
  console.log('create')
  // Create a renderTexture bigger than game size
  renderTexture = this.add.renderTexture(0, 0, width, height);
  renderTexture.fill(0x00f0f0);
  // Draw a bunch of objects along X axis.
  for (let i = 0; i < 100; i++) {
    renderTexture.draw('avatar', i * 60, 0);
  }
  cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (cursors.left.isDown) {
    this.cameras.main.scrollX -= 4;
  }
  if (cursors.right.isDown) {
    this.cameras.main.scrollX += 4;
  }
  if (cursors.up.isDown && this.cameras.main.zoom < 2) {
    this.cameras.main.zoom += 0.02;
  }
  if (cursors.down.isDown && this.cameras.main.zoom > 0.5) {
    this.cameras.main.zoom -= 0.02;
  }
}