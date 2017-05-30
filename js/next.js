define(function() {
    /**
     * Retrieves the content object logically following the specified content object (if one exists).
     * 
     * @param  {Model}  The current content object (page or menu).
     * @param  {boolean} Whether to skip menus when determining the next content object.
     * @return {Model}  The next content object, or null if there is no next content object.
     */
    function getNextContentObject(contentObject, skipMenus) {
        if (!contentObject) {
            return null;
        }

        var siblings = contentObject.getSiblings(true);
        var pageIndex = siblings.indexOf(contentObject);
        if (pageIndex < 0) {
            return null;
        }

        var next = siblings.at(pageIndex + 1);
        if (!next) {
            next = getNextContentObject(contentObject.getParent());
        }
        
        if (skipMenus) {
            return _getFirstChildPage(next);
        } else {
            return next;
        }
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

    return getNextContentObject;
});