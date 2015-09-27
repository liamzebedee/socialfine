if(Meteor.isClient) {

Template.Payouts.helpers({
    payouts: function () {
      return Fines.find({ fromUserName: Meteor.user().services.facebook.name });
    }
  });

}