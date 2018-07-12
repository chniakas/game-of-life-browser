window.GOI.dom = (function () {
  function createFromTemplate(templateId, data) {
    var source = $(templateId).html();
    var template = Handlebars.compile(source);
    return template(data);
  }

  function gameIndexFromRow(tableRow) {
    var gameContainer = tableRow.parent().parent().parent().parent();
    return indexFromGameContainer(gameContainer);
  }

  function gameIndexFromButton(button) {
    var gameContainer = button.parent().parent();
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
      'index': window.GOI.dom.gameIndexFromRow(parentRow)
    };
  }

  return {
    'createFromTemplate': createFromTemplate,
    'gameIndexFromRow': gameIndexFromRow,
    'gameIndexFromButton': gameIndexFromButton,
    'toggleCellInHtml': toggleCellInHtml,
    'gameIndexFromCell': gameIndexFromCell
  };
})();
