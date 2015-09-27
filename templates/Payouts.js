if(Meteor.isClient) {

Template.Payouts.helpers({
    payouts: function () {
      return Fines.find({ fineUserName: Meteor.user().services.facebook.name });
    },

    payoutsPaid: function(){
    	return Fines.find({ fromUserName: Meteor.user().services.facebook.name });
    }
  });

}