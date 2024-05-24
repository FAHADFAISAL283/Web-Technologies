//for review
function displayStories() {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var storiesList = $("#storiesList");
        storiesList.empty();
  
        $.each(data, function (index, story) {
          storiesList.append(
            `<div class="mb-3">
                  <h3>${story.title}</h3>
                  <div>${story.content}</div>
                  <div>
                      <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                      <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
                  </div>
              </div>
              <hr />
              `
          );
        });
      },
      error: function (error) {
        console.error("Error fetching stories:", error);
      },
    });
  }
  
  function deleteStory() {
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "DELETE",
      success: function () {
        displayStories(); 
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  function handleFormSubmission(event) {
    event.preventDefault();
    let storyId = $("#createBtn").attr("data-id");
    var title = $("#createTitle").val();
    var content = $("#createContent").val();
    if (storyId) {
      $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
        method: "PUT",
  
        data: { title, content },
        success: function () {
          displayStories(); 
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    } else {
      $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories",
        method: "POST",
        data: { title, content },
        success: function () {
          displayStories(); 
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    }
  }
  function editBtnClicked(event) {
    event.preventDefault();
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#createTitle").val(data.title);
        $("#createContent").val(data.content);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.id);
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  $(document).ready(function () {

  
    displayStories();
    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editBtnClicked);
    $("#createForm").submit(handleFormSubmission);
    $("#clearBtn").on("click", function (e) {
      e.preventDefault();
      $("#clearBtn").hide();
      $("#createBtn").removeAttr("data-id");
      $("#createBtn").html("Create");
      $("#createTitle").val("");
      $("#createContent").val("");
    });
  });

//for contact us


function validateForm() {
    var email = document.getElementById("exampleInputEmail1").value;
    var name = document.getElementById("examplename").value;
    var message = document.getElementById("examplemessage").value

    if (email.trim() === '' || name.trim() === '' || message.trim() === '') {
      alert("Please fill in all fields");
      return false;
    }

    return true;
  }
/*for homepage*/


document.addEventListener("DOMContentLoaded", function() {
  var shopBySport = document.getElementById("shop-by-sport");
  var sportsList = document.getElementById("sports-list");

  shopBySport.addEventListener("click", function(event) {
      event.preventDefault(); 
      if (sportsList.style.display === "none") {
          sportsList.style.display = "block";
      } else {
          sportsList.style.display = "none";
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var shopBySportswear = document.getElementById("shop-by-sportswear");
  var sportswearList = document.getElementById("sportswear-list");

  shopBySportswear.addEventListener("click", function(event) {
      event.preventDefault(); 
      if (sportswearList.style.display === "none") {
          sportswearList.style.display = "block";
      } else {
          sportswearList.style.display = "none";
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var shopByAccessories = document.getElementById("shop-by-accessories");
  var accessoriesList = document.getElementById("accessories-list");

  shopByAccessories.addEventListener("click", function(event) {
      event.preventDefault(); 
      if (accessoriesList.style.display === "none") {
          accessoriesList.style.display = "block";
      } else {
          accessoriesList.style.display = "none";
      }
  });
});

