if(Meteor.isClient) {



var FB_APP_ID = '442721019253710';
var FB_CALLBACK_URL = Meteor.absoluteUrl();

Session.set('friends', []);

function getFriends(next) {
  FB.api("/"+Meteor.user().services.facebook.id+"/taggable_friends",
          function (response) {
            console.log(response);
            console.log(Session.get('friends').length, response.data.length);
            Session.set('friends', Session.get('friends').concat(response.data));

            if(response.paging && response.paging.cursors.after) {
              var simpleArray = [];
              Session.get('friends').forEach(function(val){
                simpleArray.push(val.name);
              });
              $( "#yourFriend" ).autocomplete({
                source: simpleArray
              });

              getFriends(response.paging.cursors.after);

            } else {
            }
          }, { access_token: Meteor.user().services.facebook.accessToken, after: next || '' }
        );
}

function postSocialFine() {
  // get user id
  var friends = Session.get('friends');
  var friendid = '';
  var friend = $('#yourFriend').val();
  friends.forEach(function(value){
    if(value.name === friend) { console.log(friendid); friendid = value.id; }
  });

  FB.api("/"+Meteor.user().services.facebook.id+"/feed", "POST", {
    message: $('#socialfineDesc').val() + " #socialfine",
    tags: [friendid],
    access_token: Meteor.user().services.facebook.accessToken
  }, function(response){ console.log(response); console.log("/"+Meteor.user().services.facebook.id+"/feed");  });
}

function createSubscriptionsToUserPosts() {
  FB.api('/'+FB_APP_ID+'/subscriptions', function(response){}, {
    object: 'user',
    callback_url: FB_CALLBACK_URL,
    fields: ['posts'],
    active: true
  });
}

function getFriendDPFromName(name) {
  var friends = Session.get('friends');
  var url;
  friends.forEach(function(value){
    if(value.name == name) url = value.picture.data.url;
  });
  return url;
}



Template.FineAMate.events({
  'click #postSocialFine': function(){
    postSocialFine();
  },

  'keypress #yourFriend': function(event){
    // FB.api(fbProfile+"/picture?type=large",
    //       function (response) {
    //         //response.data.url
    //        }
    //     );

    Session.set('yourFriendDP', getFriendDPFromName(event.target.value));
    $('#yourFriendDP').attr('src', getFriendDPFromName(event.target.value));
  }

});

Template.FineAMate.onCreated(function(){
  
        var fbProfile = "/"+Meteor.user().services.facebook.id;

        FB.api(fbProfile+"/picture?type=large",
          function (response) {
            Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.displayPictureUrl': response.data.url }} );
          }
        );

        getFriends(null);
});
	
}