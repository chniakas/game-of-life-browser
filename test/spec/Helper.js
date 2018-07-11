(function () {
  beforeEach(function () {
    jasmine.addMatchers({
      toBeEqualToPoints: function () {
        return {
          compare: function (actual, expected) {
            var actualPoints = actual;
            var expectedPoints = expected;

            var comparePoints = function () {
              if (actualPoints.length !== expectedPoints.length) {
                return false;
              }

              var length = actualPoints.length;
              var equalPoints = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

              for (var i = 0; i < length; i++) {
                if (expectedPoints.findIndex(
                  (p) => equalPoints(actualPoints[i], p)) === -1 ) {
                  return false;
                }
              }

              return true;
            };

            return {
              pass: comparePoints()
            }
          }
        };
      }
    });
  });
})();
