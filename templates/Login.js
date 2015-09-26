if(Meteor.isClient) {

Template.Login.events({
        'click #facebook-login': function(event) {
          Meteor.loginWithFacebook({ loginStyle: "popup" }, function(err){
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