// This is here to generate unique keys for the (Add New Item) button
// in a REST API, you likely would already have fields/keys for uniquly
// identifying items or resources
// uuid sourced from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// This is the most basic code you could use
// to set up an Mmvp instance.
var model = {};
var presenter_dom_identifier = "#viewpen";
var presenter = new Mmvp();
presenter.set_action({
  empty : function() {
    $("#items-container").remove();
    $(presenter_dom_identifier).append(
      "<div id='no-items'><h3>No Items!</h3><p>Hint: hit the (+) button!</p></div>"
    );
    $("#no-items").animate({opacity : 1 }, 300, 'ease-in');
  },
  populate : function() {
    $("#no-items").remove(); 
    $(presenter_dom_identifier).append("<div id='items-container'></div>");
  },
  add : function(new_model_key, new_model_value) {
    var checked = new_model_value == true ? "checked" : "";
    var new_div = $("<div><input type='checkbox' " + checked + "><span>" + new_model_value.text + "</span></div>");
    new_div.attr('id', new_model_key).append(
      $("<button class='remove'>Remove</button>")
    );
    $("#items-container").prepend(new_div);
    new_div.animate({ opacity: 1 }, 300, 'ease-in');
  },
  remove : function(key_of_removed_item) {
    $("#" + key_of_removed_item).remove();
  },
  update : function(key_of_updated_model) {
    console.log("RUNNINg update action");
  }
});

// Zepto's version of document.onload
$(function() {
  presenter.initialize();

  $("button#add").on("click", function() {
      });
  $(document).on("click", "button.remove", function(ev) {
    delete model[$(ev.target).parent().attr('id')];
    presenter.sync(model);
  });
  $("button#clear").on("click", function() {
    presenter.sync(model = {});
  });
  $("input").on("keypress", function(ev) {
    if (ev.which == 13) {
      var u = uuid();
      console.log($("input").val());
      model[u] = { 
        text    : $("input[type='text']").val(), 
        checked : false 
      };
      $("input").val("");
      presenter.sync(model);
    }
  });

  // Not part of implementation for
  // mmvp, just for demo page
  (function tab_switcher() {
    $("section#demo h2").on("click", function(ev) {
      if (!$(ev.target).hasClass('active')) {
        $("section#demo h2.active").removeClass('active');
        $("section#demo section#switcher section.active").removeClass('active');

        var new_tab = $(ev.target).attr('class');
        $("section#demo h2." + new_tab).addClass('active');
        $("section#demo section#switcher section." + new_tab).addClass('active');
      }
      //$("section#demo section#switcher
    });
  })();
});