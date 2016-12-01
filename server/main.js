import { Meteor } from 'meteor/meteor';
import { Lectures } from '../imports/collections/lectures';

Meteor.startup(() => {
	Meteor.publish('lectures', function() {
			return Lectures.find({ ownerId: this.userId });
	});
});
