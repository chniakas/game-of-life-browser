(function () {
  beforeEach(function () {
    jasmine.addMatchers({
      toBeEqualToPoints: function () {
        return {
          compare: function (actual, expected) {
            return {
              pass: window.GOI.areEqualPoints(actual, expected)
            }
          }
        };
      }
    });
  });
})();
