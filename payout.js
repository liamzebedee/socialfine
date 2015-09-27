Fines = new Mongo.Collection("fines");




if (Meteor.isClient) {
  window.Fines = Fines;
  Router.route('/', function () {
    // render the Home template with a custom data context
    this.render('Payouts', {data: {title: 'My Title'}});
  });

var FB_APP_ID = '442721019253710';
Router.route('/FineAMate');
Router.route('/Payouts');


  Template.body.events({
          'click #facebook-login': function(event) {
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


      function loadFacebookShit() {
  Meteor.loginWithFacebook({ requestPermissions: ['public_profile','publish_actions','user_friends'] }, function(err){
        if (err) {
            throw new Meteor.Error("Facebook login failed");
        }

        FB.init({
          appId      : FB_APP_ID,
          status     : true,
          xfbml      : true
        });

  });
}


}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup

    ServiceConfiguration.configurations.upsert(
      { service: "facebook" },
      {
        $set: {
          clientId: "62a7cba58da60cc1f850c2b95b0638c4",
          loginStyle: "popup",
          appId: '442721019253710',
          secret: '1dec7c127e7a69decf46f3fcf4a37aff'
        }
      }
    );

  });




}
