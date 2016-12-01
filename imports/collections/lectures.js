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
	}
});

export const Lectures  = new Mongo.Collection('lectures');
