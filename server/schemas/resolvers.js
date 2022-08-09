const { AuthenticationError } = require('apollo-server-express');
const { User, Rant } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('rants');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('rants');
    },
    rants: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Rant.find(params).sort({ createdAt: -1 });
    },
    rant: async (parent, { rantId }) => {
      return Rant.findOne({ _id: rantId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('rants');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRant: async (parent, { rantText, companyText }, context) => {
      if (context.user) {
        const rant = await Rant.create({
          rantText,
          rantAuthor: context.user.username,
          // added company -jess
          company: companyText,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rants: rant._id } }
        );

        return rant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { rantId, commentText }, context) => {
      if (context.user) {
        return Rant.findOneAndUpdate(
          { _id: rantId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRant: async (parent, { rantId }, context) => {
      if (context.user) {
        const rant = await Rant.findOneAndDelete({
          _id: rantId,
          rantAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { rants: rant._id } }
        );

        return rant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { rantId, commentId }, context) => {
      if (context.user) {
        return Rant.findOneAndUpdate(
          { _id: rantId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
