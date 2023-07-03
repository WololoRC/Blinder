export function Rainemojis(){
  var container = document.getElementById('animate');
  var emoji = ["❤️"];
  var circles = [];
  
  for (var i = 0; i < 2; i++) {
    addCircle(i * 20, [10 + 0, 500], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 20, [10 + 0, 500], emoji[Math.floor(Math.random() * emoji.length)]);


   
  }
  
  
  
  function addCircle(delay, range, color) {
    setTimeout(function() {
      var c = new Circle(range[0] + Math.random() * range[1], 2 + Math.random() * 4, color, {
        x: -0.5 + Math.random() * 0.3,
        y: 1 + Math.random() * 1
      }, range);
      circles.push(c);
    }, delay);
  }
  
  function Circle(x, y, c, v, range) {
    var _this = this;
    this.x = x;
    this.y = y;
    this.color = c;
    this.v = {
      x: -0.15 + Math.random() * 0.3,
      y: 15 + Math.random() * 0.5
    };
    this.range = range;
    this.element = document.createElement('span');
    /*this.element.style.display = 'block';*/
    this.element.style.opacity = 0;
    this.element.style.position = 'absolute';
    this.element.style.fontSize = '26px';
    this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
    this.element.innerHTML = c;
    container.appendChild(this.element);
  
    this.update = function() {
      if (_this.y > 500) {
        _this.y = 40 + Math.random() * 4;
        _this.x = _this.range[0] + Math.random() * _this.range[1];
      }
      _this.y += _this.v.y;
      _this.x += _this.v.x;
      this.element.style.opacity = 1;
      this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    };
  }
  
  function animate() {
    for (var i in circles) {
      circles[i].update();
    }
    requestAnimationFrame(animate);
  }
  
  animate();

}

export default Rainemojis