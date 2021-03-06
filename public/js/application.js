$(document).ready(function() {

  var ids = ["#view-sort", "#vote-sort", "#recent-sort"] //Array for sort tab ids on home page

  function removeShow(){ // Function which removes the show class from each tab, which hides the content inside of it
    ids.forEach(function(id){
      $(id).removeClass('show');
    });
  }

  $(".filter-link").on("click", function(event){  //When a tab is clicked, color of tab changes, question container slides up and down
    var $target = $(event.target);
    $("#question-container").slideUp();
    $(".filter-tabs").removeClass("active");
    $target.parent().addClass("active");
    $("#question-container").slideDown();
  });

// Sort logic for each tab

  $("#viewed a").on("click", function(event) { // Adds the show class to the first element in the ids array
    setTimeout(function(){ // Function inside will wait 1/2 second before firing
      removeShow();
      $(ids[0]).addClass('show');
    }, 500);

  });

  $("#voted a").on("click", function(event) { // Adds the show class to the second element in the ids array
    setTimeout(function(){  // Function inside will wait 1/2 second before firing
      removeShow();
      $(ids[1]).addClass('show');
    }, 500);
  });

  $("#recent a").on("click", function(event) { // Adds the show class to the third element in the ids array
    setTimeout(function(){  // Function inside will wait 1/2 second before firing
      removeShow();
      $(ids[2]).addClass('show');
    }, 500);
  });


  $('.upvote').on('click', function(event){ //Change color of voting grapes
  	var $target = $(event.target);
  	$(this).css('background-color', '#8e44ad');

  });
// AJAX for votes

// question up votes
  $('#question-up').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#question-votes').html(response);
    });
  });

// question down votes
  $('#question-down').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#question-votes').html(response);
    });
  });

// comment up votes
  $('#comment-up').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#comment-votes').html(response);
    });
  });

// comment down votes
  $('#comment-down').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#comment-votes').html(response);
    });
  });

// answer up votes
  $('#vote-up').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#answer-votes').html(response);
    });
  });

// answer down votes
  $('#vote-down').on('submit', function(event){
    event.preventDefault();

    $target = $(event.target);

    $.ajax({
      url: $target.attr('action'),
      type: $target.attr('method'),
    }).done(function(response){
      $('#answer-votes').html(response);
    });
  });





  $('#add-tag').on("submit", function(e){
    e.preventDefault();
    var name = $("input[name='tag[name]']").val();
    var question_id = $("input[name='question_id']").val();
    $.ajax({
      method: $(e.target).attr('method'),
      url: $(e.target).attr('action'),
      data: { tag : {name : name}, question_id : question_id}
    })
    .done(function(response){
      $('#tag-container').append(response);
      $(e.target).find(":nth-child(2)").val("");
    });
  });

// AJAX for comments
// Deleting Comments
  $('#question-comments-list').on('submit', '.delete-button', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $url = $target.attr("action");
    var $method = "delete";


    var $request = $.ajax({
      url: $url,
      method: $method
    });
    $request.done(function(response){
      $target.parent().remove();
    });
  });

  var $foop = "<li><form action=\"/comments/<%= comment.id %>/up_votes\"method=\"post\">    <input type=\"submit\" value=\"Upvote\">  </form>  <h3>0</h3>  <form action=\"/comments/<%= comment.id %>/down_votes\"method=\"post\">    <input type=\"submit\" value=\"Downvote\">  </form><p>foop</p>"+/*<% if same_user(comment.user) %>*/"<form action=\"/questions/<%=@question.id%>/comments/%=comment.id%>\" method=\"post\" class=\"delete-button\">  <input type=\"hidden\" name=\"_method\" value=\"delete\">    <input type=\"submit\" value=\"Delete Comment\">  </form>"+/*<% end %>*/"<hr></li>";


  $('#question_comment_form').on('submit', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $url = $target.attr("action");
    var $method = $target.attr("method");
    var $data = $target.serialize();

    var $request = $.ajax({
      url: $url,
      method: $method,
      data: $data
    });
    $request.done(function(response){
    var $comment = $foop;
    $comment = $comment.replace('foop', response);
    $('#question-comments-list').prepend($comment);
    });
  });

});
