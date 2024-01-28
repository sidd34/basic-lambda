import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userName, setUserName] = useState("");
  const [feel, setFeel] = useState("");
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState(false)
  const [messages, setMessages] = useState([]);

  const url = process.env.REACT_APP_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      key1: userName,
      key2: message,
      key3: feel,
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
            setMessages(response.data);
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

  return (
		<>
			<div className="flex items-center justify-center h-[50vh]">
				<div className="w-full max-w-xs">
					<h2 className="text-2xl font-bold text-center m-4 p-2">
						User Record on Dynamodb
					</h2>{" "}
					<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								for="username"
							>
								User Entry
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								type="text"
								placeholder="User Name"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="Message"
								type="text"
								placeholder="Message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="Feel"
								type="text"
								placeholder="Feel?"
								value={feel}
								onChange={(e) => setFeel(e.target.value)}
							/>
						</div>
						<div className="mb-6"></div>
						<div className="flex items-center justify-between">
							<button
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button"
								onClick={handleSubmit}
							>
								Add to DB
							</button>
						</div>
					</div>
				</div>
			</div>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Date
						</th>
						<th
							scope="col"
							className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Message
						</th>
						<th
							scope="col"
							className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Username
						</th>
						<th
							scope="col"
							className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Feel
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{messages?.map((item) => (
						<tr key={item.date}>
							<td className="px-3 py-2 whitespace-nowrap">{item.date}</td>
							<td className="px-3 py-2 whitespace-nowrap">{item.message}</td>
							<td className="px-3 py-2 whitespace-nowrap">{item.username}</td>
							<td className="px-3 py-2 whitespace-nowrap">{item.feel}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default App;
