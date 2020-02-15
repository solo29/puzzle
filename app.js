var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    board: [],
    location: "0.0",
    len: 3
  },

  mounted() {
    this.board = this.generateBoard(this.len);
    this.log(this.board);
  },
  methods: {
    move(dir) {
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
      index = index % 10;
      switch (index) {
        case 0:
          "#1abc9c";
          break;
        case 1:
          "#3498db";
          break;
        case 2:
          "#9b59b6";
          break;
        case 3:
          "#34495e";
          break;
        case 4:
          "#f1c40f";
          break;
        case 5:
          "#e67e22";
          break;
        case 6:
          "#f39c12";
          break;
        case 7:
          "#7f8c8d";
          break;
        case 8:
          "#3867d6";
          break;
        case 9:
          "#fc5c65";
          break;
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
      for (let i = 0; i < len; i++) {
        let inner = [];
        for (let j = 0; j < len; j++) {
          inner.push(counter++);
        }
        arr.push(inner);
      }
      arr[0][0] = null;
      return arr;
    }
  }
});
