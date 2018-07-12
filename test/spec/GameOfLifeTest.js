(function () {
  describe("Game of Life", function() {
    var gameOfLife;

    beforeEach(function() {
      gameOfLife = new window.GOL.GameOfLife();
      // D -> DEAD, A -> ALIVE
    });

    it("should create correct dimensions", function() {
      gameOfLife.setGridDimensions(2, 4);
      expect(gameOfLife.getGrid().getX()).toEqual(2);
      expect(gameOfLife.getGrid().getY()).toEqual(4);
    });

    it("should initialize properly", function() {
      gameOfLife.setGridDimensions(3, 3);
      var points = [{x: 0, y: 0}, {x: 2, y: 2}, {x: 0, y: 1}];
      gameOfLife.setAlivePoints(points);
      expect(gameOfLife.getAlivePoints()).toBeEqualToPoints(points);
    });

    it("should change state of points in grid", function() {
      gameOfLife.setGridDimensions(3, 3);
      expect(gameOfLife.getGrid().isAlive(0, 1)).toBeFalsy();
      gameOfLife.getGrid().setAlive(0, 1);
      expect(gameOfLife.getGrid().isAlive(0, 1)).toBeTruthy();
      gameOfLife.getGrid().setDead(0, 1);
      expect(gameOfLife.getGrid().isAlive(0, 1)).toBeFalsy();
    });

    it("should count alive neighbours", function() {
      gameOfLife.setGridDimensions(3, 3);
      var points = [{x: 0, y: 0}, {x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}];
      gameOfLife.setAlivePoints(points);

      // A D A
      // A A D
      // D A D

      expect(gameOfLife.getGrid().countAliveNeighbours(0, 0)).toEqual(2);
      expect(gameOfLife.getGrid().countAliveNeighbours(0, 1)).toEqual(4);
      expect(gameOfLife.getGrid().countAliveNeighbours(0, 2)).toEqual(1);

      expect(gameOfLife.getGrid().countAliveNeighbours(1, 0)).toEqual(3);
      expect(gameOfLife.getGrid().countAliveNeighbours(1, 1)).toEqual(4);
      expect(gameOfLife.getGrid().countAliveNeighbours(1, 2)).toEqual(3);

      expect(gameOfLife.getGrid().countAliveNeighbours(2, 0)).toEqual(3);
      expect(gameOfLife.getGrid().countAliveNeighbours(2, 1)).toEqual(2);
      expect(gameOfLife.getGrid().countAliveNeighbours(2, 2)).toEqual(2);
    });

    it("should progress properly", function() {

      gameOfLife.setGridDimensions(5, 5);
      var points = [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}];
      gameOfLife.setAlivePoints(points);
      // initially: D D D D D
      //            D D D D D
      //            D A A A D
      //            D D D D D
      //            D D D D D

      gameOfLife.nextStep();
      // step 1:    D D D D D
      //            D D A D D
      //            D D A D D
      //            D D A D D
      //            D D D D D
      var step1Points = [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}];
      expect(gameOfLife.getAlivePoints()).toBeEqualToPoints(step1Points);

      gameOfLife.nextStep();
      // step 2:    D D D D D
      //            D D D D D
      //            D A A A D
      //            D D D D D
      //            D D D D D
      var step2Points = [{x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}];
      expect(gameOfLife.getAlivePoints()).toBeEqualToPoints(step2Points);
    });
  });
})();
