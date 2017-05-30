define([
    "coreJS/adapt",
    "coreViews/componentView",
    "./next"
], function(Adapt, ComponentView, getNextContentObject) {
    var NextButton = ComponentView.extend({
        events: {
            'click button' : 'onClickNextButton'
        },

        initialize: function () {
            // Assume that page completion is required if this value is not specified
            var requiresPageCompletion = this.model.get("_requirePageCompletion") !== false;
            if (requiresPageCompletion) {
                this.model.set("_isComplete", true);
                var page = this.model.findAncestor();
                page.on("change:_isComplete", _.bind(this.onPageCompletionUpdate, this));
                this.onPageCompletionUpdate(page);
            }

            this.render();

            var view = this;
            this.model.on("change:_isEnabled", function(component) {
                view.$(".button-widget button").attr("disabled", !component.get("_isEnabled"));
            });
        },

        postRender: function() {
            this.setReadyStatus();

            if (this.model.get("_isVisible")) {
                this.setCompletionStatus();
            } else {
                this.model.on("change:_isVisible", this.setCompletionStatus, this);
            }
        },

        /**
         * Invoked when the next button is clicked.
         */
        onClickNextButton: function() {
            
            var nextPageId = this.model.get("_nextPage");
            if (!nextPageId || !nextPageId.length) {
                var currentPage = this.model.findAncestor();
                var next = getNextContentObject(currentPage, this.model.get("_skipMenus") !== false);
                nextPageId = next && next.get("_id");
            }

            if (nextPageId) {
                Backbone.history.navigate('#/id/' + nextPageId, {trigger: true});
            }
        },

        /**
         * Invoked when a change is detected in the page's completion status.
         * 
         * @param  {Model}  The page where the _isComplete attribute has changed.
         */
        onPageCompletionUpdate: function(page) {
            var isComplete = !page || page.get("_isComplete") === true;
            this.model.set("_isEnabled", isComplete);
        }
    });

    Adapt.register('next-button', NextButton);

    return NextButton;
});
