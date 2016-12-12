import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'lectures.insert': function() {
		return Lectures.insert({
			createdAt: new Date(),
			name: '',
			description: '',
			content: '',
			sharedWith: [],
			ownerPeerId: null,
			ownerId: this.userId
		});
	},

	'lectures.remove': function(lecture) {
		return Lectures.remove(lecture);
	},

	'lectures.updateContent': function(lecture, content) {
		return Lectures.update(lecture._id, { $set: { content }});
	},

	'lectures.updatePeerId': function(lecture, ownerPeerId) {
		return Lectures.update(lecture._id, { $set: { ownerPeerId }});
	},

	'lectures.updateDescription': function(lecture, { name, description }) {
		return Lectures.update(lecture._id, { $set: { name, description }});
	},

	'lectures.share': function(lecture, email) {
		return Lectures.update(lecture._id, { $addToSet: { sharedWith: email }});
	}
});

export const Lectures  = new Mongo.Collection('lectures');
