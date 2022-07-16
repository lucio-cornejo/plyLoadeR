HTMLWidgets.widget({

  name: 'plyLoadeR',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.

        var renderer, camera, cameraTarget, controls, scene;

        if (document.getElementById(el.id)) {
          // Load PLY file
          loadPLY(x.paths, el.id);
          console.log("a");
        } else {
          console.log("b");
          init(x.paths, el.id);
          animate();
        }
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});