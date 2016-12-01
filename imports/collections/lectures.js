import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'lectures.insert': function() {
		return Lectures.insert({
			createdAt: new Date(),
			content: '',
			sharedWith: [],
			ownerId: this.userId
		});
	}
});

export const Lectures  = new Mongo.Collection('lectures');
