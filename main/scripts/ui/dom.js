window.GOL.dom = (function () {
  function createFromTemplate(templateId, data) {
    var source = $(templateId).html();
    var template = Handlebars.compile(source);
    return template(data);
  }

  function gameIndexFromRow(tableRow) {
    var gameContainer = ancestor(tableRow, 4);
    return indexFromGameContainer(gameContainer);
  }

  function gameIndexFromButton(button) {
    var gameContainer = ancestor(button, 2);
    return indexFromGameContainer(gameContainer);
  }

  function indexFromGameContainer(gameContainer) {
    var gameId = gameContainer.attr("id");
    var gameIndex = gameId.split("-")[1]
    return gameIndex;
  }

  function toggleCellInHtml(cell) {
    var state = $(cell).attr("title");
    var toggledState = state === "alive" ? "dead" : "alive";
    $(cell).attr("title", toggledState);
  }

  function gameIndexFromCell(cell) {
    var parentRow = $(cell).parent();
    return {
      'i': parentRow.children().index($(cell)),
      'j': parentRow.parent().children().index(parentRow),
      'index': window.GOL.dom.gameIndexFromRow(parentRow)
    };
  }

  function ancestor(node, n) {
    while (n-- > 0) {
      node = node.parent();
    }
    return node;
  }

  return {
    'createFromTemplate': createFromTemplate,
    'gameIndexFromRow': gameIndexFromRow,
    'gameIndexFromButton': gameIndexFromButton,
    'toggleCellInHtml': toggleCellInHtml,
    'gameIndexFromCell': gameIndexFromCell
  };
})();
