import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState(false)
  const [messages, setMessages] = useState([]);

  const url = process.env.REACT_APP_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      key1: message,
      method: "POST",
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log("Response:", response.data);
        setUpdate(true)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          method: "GET",
        };

        const res = axios
          .post(url, data)
          .then((response) => {
            //console.log("Response:", response.data.body);
            setMessages(JSON.parse(response.data.body));
            setUpdate(false)
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        console.log(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [update,url]);

  //console.log("Messages-->",JSON.parse(messages));

  return (
    <>
      <div className="flex items-center justify-center h-[50vh]">
        <div class="w-full max-w-xs">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Message
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div class="mb-6"></div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Add to DB
              </button>
            </div>
          </div>
          <p class="text-center text-gray-500 text-xs">
            &copy;2020 PO. All rights reserved.
          </p>
        </div>
      </div>

      <ul class="list-disc flex items-center justify-center h-[50vh] flex-col">
        {messages?.map((item) => (
          <li key={item.date}>{item.message}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
