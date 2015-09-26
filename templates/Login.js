if(Meteor.isClient) {

var FB_APP_ID = '442721019253710';
var FB_CALLBACK_URL = Meteor.absoluteUrl();

Session.set('friends', []);

function getFriends(next) {
  FB.api("/"+Meteor.user().services.facebook.id+"/taggable_friends",
          function (response) {
            console.log(Session.get('friends').length, response.data.length);
            Session.set('friends', Session.get('friends').concat(response.data));

            if(response.paging && response.paging.cursors.after) {
              getFriends(response.paging.cursors.after);
            } else {
              var simpleArray = [];
              Session.get('friends').forEach(function(val){
                simpleArray.push(val.name);
              });
              $( "#yourFriend" ).autocomplete({
                source: simpleArray
              });

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
    if(value.name === friend) { console.log('help'); friendid = value.id; }
  });

  FB.api("/"+Meteor.user().services.facebook.id+"/feed", "POST", {
    message: $('#socialfineDesc').val() + " #socialfine",
    tags: [friendid]
  }, function(response){ console.log(response); });
}

function createSubscriptionsToUserPosts() {
  FB.api('/'+FB_APP_ID+'/subscriptions', function(response){}, {
    object: 'user',
    callback_url: FB_CALLBACK_URL,
    fields: ['posts'],
    active: true
  });
}

function loadFacebookShit() {
  Meteor.loginWithFacebook({ requestPermissions: ['public_profile','publish_actions','user_status'] }, function(err){
        if (err) {
            throw new Meteor.Error("Facebook login failed");
        }

        FB.init({
          appId      : FB_APP_ID,
          status     : true,
          xfbml      : true
        });

        var fbProfile = "/"+Meteor.user().services.facebook.id;

        FB.api(fbProfile+"/picture?type=large",
          function (response) {
            Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.displayPictureUrl': response.data.url }} );
          }
        );

        getFriends(null);
  });
}

Template.Login.events({
    'click #facebook-login': function(event) {
      loadFacebookShit();
    },

    'click #reload': function(){
      loadFacebookShit();
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
  });

	
}