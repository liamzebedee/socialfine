if (Meteor.isClient) {
  Router.route('/', function () {
    // render the Home template with a custom data context
    //this.render('Login', {data: {title: 'My Title'}});
  });

  // when you navigate to "/one" automatically render the template named "One".
  Router.route('/Payouts');


  Template.body.events({
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
