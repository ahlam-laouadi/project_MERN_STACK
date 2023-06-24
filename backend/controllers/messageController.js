import { createRequire } from "module";
const require = createRequire(import.meta.url);
let ObjectId = require("mongodb").ObjectId;

import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const sendMessage = async (req, res) => {
  try {
    /*
      the sender will always be the main user which i get his/her id from the auth
      the receiver's id is passed on in the params 
      and the rest is form the req body

    */
    const { body, toName, toPicturePath, fromName, fromPicturePath } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    const newMessage = new Message({
      toId: id,
      toName: toName,
      toPicturePath: toPicturePath,
      fromName: fromName,
      fromPicturePath: fromPicturePath,
      fromId: user_id,
      body: body,
    });

    await newMessage.save();

    /*
      after a new message is created
      if 1 sent a message to 2 then the conversation would be from 1 to 2
      if 2 sent a message to 1 then the conversation would be from 2 to 1

      i check if there is any conversation in the data base the match the following
      the fromId = the main user and the toId = the receiver
      OR the fromId = the receiver and the toId = the main user

      if true the i push the new message in the messages array of the conversation
      if false i create a new conversation and push the new message in the messages array of the conversation
    */
    const conversation = await Conversation.find({
      $or: [
        { fromId: user_id, toId: id },
        { fromId: id, toId: user_id },
      ],
    });

    if (conversation.length > 0) {
      const updatedConversation = await Conversation.findOneAndUpdate(
        {
          $or: [
            { toId: id, fromId: user_id },
            { toId: user_id, fromId: id },
          ],
        },
        { $push: { messages: newMessage } },
        { upsert: true }
      ).exec();
      res.status(201).json(updatedConversation);
    } else {
      const newConversation = new Conversation({
        toId: id,
        toName: toName,
        toPicturePath: toPicturePath,
        fromName: fromName,
        fromPicturePath: fromPicturePath,
        fromId: user_id,
      });
      await newConversation.save();

      const updatedConversation = await Conversation.findOneAndUpdate(
        { $and: [{ toId: id }, { fromId: user_id }] },
        { $push: { messages: newMessage } },
        { upsert: true }
      ).exec();

      res.status(201).json(updatedConversation);
    }
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const getChat = async (req, res) => {
  try {
    /*
      the receiver is from the params and the sender from auth
    */
    const { id } = req.params;

    const user_id = req.user.id;

    /*
      i find a conversation the follow the following
      fromId = the sender and the toId = the receiver
      OR fromId = the receiver and the toId = the sender
    */

    const chat = await Conversation.find({
      $or: [
        { $and: [{ fromId: user_id }, { toId: id }] },
        { $and: [{ fromId: id }, { toId: user_id }] },
      ],
    });
    // returns an array, so i just send back the first element
    // which is the target anyway
    if (chat.length > 0) {
      res.status(201).json(chat[0]);
    } else {
      res.status(201).json(chat);
    }
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const getMyChats = async (req, res) => {
  try {
    const user_id = req.user.id;

    /*
      get any conversation that the main user is part of
      either as the sender or the receiver
    */
    const chats = await Conversation.find({
      $or: [{ fromId: user_id }, { toId: user_id }],
    });
    res.status(201).json(chats);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};
