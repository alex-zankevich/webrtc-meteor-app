import { Meteor } from 'meteor/meteor';
import { Lectures } from '../imports/collections/lectures';
import { Messages } from '../imports/collections/messages';

Meteor.startup(() => {
	Meteor.publish('lectures', function() {
			return Lectures.find({ ownerId: this.userId });
	});

	Meteor.publish('sharedLectures', function() {
		const user = Meteor.users.findOne(this.userId);

		if (!user) {
			return;
		}

		const email = user.emails[0].address;

		return Lectures.find({
			sharedWith: {
				$elemMatch: { $eq: email }
			}
		});
	});

	Meteor.publish('messages', function() {
		return Messages.find({});
	});
});
