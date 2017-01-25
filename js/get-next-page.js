define(function() {
  /**
   * Retrieves the page logically following the specified page (if one exists).
   * 
   * @param  {Model}  The current page.
   * @return {Model}  The next page, or null if there is no next page.
   */
  function getNextPage(page) {
    if (!page) {
      return null;
    }

    var siblings = page.getSiblings(true);

    // Find the page after the current page
    var pageIndex = siblings.indexOf(page);
    if (pageIndex < 0) {
      return null;
    }

    var next = siblings.at(pageIndex + 1);
    
    return _getFirstChildPage(next);
  }

  /**
   * If the specified model is a menu, it iterates through the menu until it finds the first page.
   *
   * If the specified model is already a page, it just returns the page.
   * 
   * @param  {Model}    A page or menu model.
   * @return {Model}    A page or null if no child page could be found.
   */
  function _getFirstChildPage(model) {
    if (!model) {
      return null;
    }

    var type = model.get("_type");
    if (type === "menu") {
      var contents = model.getChildren();
      return _getFirstChildPage(contents.at(0));
    } else if (type === "page") {
      return model;
    }

    return null;
  }

  return getNextPage;
});