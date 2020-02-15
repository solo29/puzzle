function getSize() {
  let paths = window.location.href.split("#");
  let last = paths[paths.length - 1];
  let size = parseInt(last);
  if (!size) {
    return 3;
  }
  if (size > 5) {
    return 5;
  }
  return size;
}

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    board: [],
    location: "0.0",
    len: getSize()
  },

  mounted() {
    this.board = this.generateBoard(this.len);
    this.log(this.board);
    var myElement = document.getElementById("app");
    var mc = new Hammer(myElement, {
      recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }]]
    });
    mc.on("swipe", ev => {
      console.log(ev.direction);
      //2 left 8 up 4 right 16 down
      this.move(ev.direction);
    });
  },
  methods: {
    move(dir) {
      //swindow.navigator.vibrate(200);
      if (dir == 2) {
        dir = "left";
      } else if (dir == 8) {
        dir = "up";
      } else if (dir == 4) {
        dir = "right";
      } else if (dir == 16) {
        dir = "down";
      }
      console.log(dir);
      let [x, y] = this.location.split(".").map(z => +z);

      if (dir === "left") {
        if (this.len - y > 1) {
          this.swap(`${x}.${y}`, `${x}.${y + 1}`);
        }
      } else if (dir === "right") {
        if (y > 0) {
          this.swap(`${x}.${y}`, `${x}.${y - 1}`);
        }
      } else if (dir === "up") {
        if (x + 1 < this.len) {
          this.swap(`${x}.${y}`, `${x + 1}.${y}`);
        }
      } else if (dir === "down") {
        if (x - 1 >= 0) {
          this.swap(`${x}.${y}`, `${x - 1}.${y}`);
        }
      }
    },
    _(str) {
      let [x, y] = str.split(".");

      return this.board[x][y];
    },
    getColor(index) {
      if (index == 0 || index == null) return "#000";
      index = index % 10;

      switch (index) {
        case 0:
          return "#F50057";
        case 1:
          return "#3498db";
        case 2:
          return "#9b59b6";
        case 3:
          return "#34495e";
        case 4:
          return "#f1c40f";
        case 5:
          return "#e67e22";
        case 6:
          return "#fc5c65";
        case 7:
          return "#1abc9c";
        case 8:
          return "#3867d6";
        case 9:
          return "#f39c12";
      }
    },
    swap(index1, index2) {
      let [x1, y1] = index1.split(".");
      let [x2, y2] = index2.split(".");
      let el1 = this._(index1);
      let el2 = this._(index2);
      this.board[x1][y1] = el2;
      this.board[x2][y2] = el1;
      console.log(this.board, el1, el2);
      this.location = index2;
      this.$forceUpdate();
    },
    log(el) {
      console.log(JSON.parse(JSON.stringify(el)));
    },
    generateBoard(len) {
      let arr = [];
      let counter = 0;
      let temp = [];
      for (let i = 1; i < len * len; i++) {
        temp.push(i);
      }
      shuffle(temp);
      temp.unshift(29);
      for (let i = 0; i < len; i++) {
        let inner = [];
        for (let j = 0; j < len; j++) {
          inner.push(temp[counter++]);
        }
        arr.push(inner);
      }
      arr[0][0] = null;
      return arr;
    },
    changeSize(val) {
      let baseURL = window.location.origin;
      window.location.href = baseURL + "#" + val.target.value;
      location.reload();
    }
  }
});

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
