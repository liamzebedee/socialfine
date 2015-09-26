if(Meteor.isClient) {

Template.Login.events({
        'click #facebook-login': function(event) {
          Meteor.loginWithFacebook({ requestPermissions: ['public_profile','publish_actions'] }, function(err){
              if (err) {
                  throw new Meteor.Error("Facebook login failed");
              } 
          });
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