define([
  "coreJS/adapt",
  "coreViews/componentView",
  "./get-next-page"
], function(Adapt, ComponentView, getNextPage) {
  var NextButton = ComponentView.extend({
    preRender: function() {
      var page = this.model.findAncestor();
      page.on("change:_isComplete", _.bind(this.onPageCompletionUpdate, this));

      if (!this.model.has("_requirePageCompletion")) {
        this.model.set("_requirePageCompletion", true);
      }

      if (!this.model.has("_nextPage") || this.model.get("_nextPage").length === 0) {
        var nextPage = getNextPage(page);
        if (nextPage) {
          this.model.set("_nextPage", nextPage.get("_id"));
        }
      }
    },

    postRender: function() {
      this.setReadyStatus();

      // In case the next button is not marked as optional,
      // mark it complete right away so that the button is waiting
      // on itself to become complete.
      this.setCompletionStatus();
    },

    /**
     * Invoked when a change is detected in the page's completion status.
     * 
     * @param  {Model}  The page where the _isComplete attribute has changed.
     */
    onPageCompletionUpdate: function(page) {
      var isIncomplete = !page || page.get("_isComplete") === false;
      this.$(".button-widget button").attr("disabled", isIncomplete);
    }
  });

  Adapt.register('next-button', NextButton);

  return NextButton;
});
