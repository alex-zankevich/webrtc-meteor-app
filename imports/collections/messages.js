import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'messages.insert': function(lecture, message, user) {
		return Messages.insert({
			createdAt: new Date(),
			lectureId: lecture._id,
			user: user,
			message: message
		});
	},

	'messages.removeAllFromRoom': function({ lectureId }) {
		return Messages.remove({ lectureId });
	},

	'remove.removeAll': function() {
		return Messages.remove({});
	}
});

export const Messages  = new Mongo.Collection('messages');
