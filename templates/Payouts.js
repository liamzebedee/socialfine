if(Meteor.isClient) {

Template.Payouts.payouts = Fines.findOne({ finedUserId: Meteor.user().services.facebook.id }).message;

}