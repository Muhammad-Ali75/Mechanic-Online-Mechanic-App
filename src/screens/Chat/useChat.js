import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const socket = io.connect("https://mechaniconline.herokuapp.com/");

const useChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(async () => {
    let ID = await SecureStore.getItemAsync("order");
    console.log('AWait',ID);
    socket.emit("getMostRecentMessages", {
      order_id: `62c650fe699004bc1a5a3b10`,
    });

    socket.on(`mostRecentMessages/62c650fe699004bc1a5a3b10`, (data) => {
      console.log(data[2]);
      const newArray = data.reverse().map((data) =>
        data.type === "image"
          ? {
              _id: data._id,
              createdAt: data.createdAt,
              image: data.image,
              user: { _id: data.user },
            }
          : {
              _id: data._id,
              createdAt: data.createdAt,
              text: data.text,
              user: { _id: data.user },
            }
      );
      console.log("newARRAY", newArray[0]);
      setMessages(newArray);
    });

    socket.on(`newChatMessage/62c650fe699004bc1a5a3b10`, (data) => {
      const newMsg = {
        _id: data._doc._id,
        createdAt: data._doc.createdAt,
        text: data._doc.text,
        user: { _id: data._doc.user },
      };
      socket.emit("getMostRecentMessages", {
        order_id: `62c650fe699004bc1a5a3b10`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // useEffect(() => {}, [socket]);

  const sendMessage = (messageObject,orderID) => {
    socket.emit("customer/addMessage", messageObject);
    socket.emit("getMostRecentMessages", {
      order_id: '62c650fe699004bc1a5a3b10',
    });
  };

  return { messages, sendMessage };
};

export default useChat;
