import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'lectures.insert': function() {
		return Lectures.insert({
			createdAt: new Date(),
			content: '',
			sharedWith: [],
			ownerId: this.userId
		});
	},

	'lectures.remove': function(lecture) {
		return Lectures.remove(lecture);
	},

	'lectures.update': function(lecture, content) {
		return Lectures.update(lecture._id, { $set: { content }});
	},

	'lectures.share': function(lecture, email) {
		return Lectures.update(lecture._id, { $addToSet: { sharedWith: email }});
	}
});

export const Lectures  = new Mongo.Collection('lectures');
