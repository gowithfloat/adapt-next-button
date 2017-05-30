adapt-next-button
=================
The **Next Page Button** provides a button for easily navigating to the next page in an Adapt course.

Settings
--------
### Attributes
**_component (string)**: This value must be: `next-button`.

**displayTitle (string)**: The title to display on the button.

**_classes (string)**: CSS class name to be applied to the button's containing div. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout (string)**: This defines the horizontal position of the component in the block. Acceptable values are full, left or right.

**_hoverText (string, optional):** This optional text appears when the user hovers over the next button.

**_requirePageCompletion (boolean, default=true):** By default, the next button is disabled until the rest of the page is complete. However, you can set the next button to always be enabled by setting this to `false`.

**_skipMenus (boolean, default=true):** By default, clicking the next button will take the user to the next *page*. However, disabling this setting would take the user to whatever the next content object is: either page or menu.

**_nextPage (string, optional)**: This component automatically determines the next page based on the structure of the course. However, if you want to explicitly set the next page, you can set the ID of the page here.

Limitations
-----------
No known limitations.

-----------
The **Next Page Button** is a plugin for the Adapt Framework. [Adapt](https://www.adaptlearning.org) is a free and easy to use e-learning authoring tool that creates fully responsive, multi-device, HTML5 e-learning content using the award-winning Adapt developer framework.
