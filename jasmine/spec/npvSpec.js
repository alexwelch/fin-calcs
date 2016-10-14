describe("Player", function() {
  var npv;

  beforeEach(function() {
    npv = new window.NPV(100, .10, -1, 3, 1);
  });

  describe("revenues", function() {
    it("collects revenue across terms", function() {
      expect(npv.revenues()).toEqual([10,19,36.1]);
    });
  });

  describe("expenses", function() {
    it("collects expenses across terms", function() {
      expect(npv.expenses()).toEqual([-1, -1.01, -1.03]);
    });
  });

  describe("cashFlows", function() {
    it("collects cashFlows across terms", function() {
      expect(npv.cashFlows()).toEqual([9, 17.99, 35.07]);
    });
  });

  describe("calculate", function() {
    it("returns the NPV", function() {
      expect(npv.calculate()).toEqual(52.75);
    });
  });

});
