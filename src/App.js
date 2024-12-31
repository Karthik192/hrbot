import { motion } from "motion/react";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

function App() {
  // TODO: refactor this code so as to use it as a component - better when routes are defined

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutModalIsOpen, setAboutModalIsOpen] = useState(false);

  const ulRef = useRef(null);
  const endOfListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const onTextInputSubmit = async (e) => {
    e.preventDefault();
    // DEVNOTE: for developing purpose to clear the clumsy screen
    if (textInput === "cls") {
      setTextInput("");
      setMessages([]);
    } else {
      setIsLoading(true);
      setMessages((prevState) => [
        ...prevState,
        { message: textInput, timestamp: Date(), type: "send" },
      ]);
      const reqBody = JSON.stringify({
        question: textInput,
      });
      setTextInput("");
      const response = await fetch("http://localhost:9091/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      }).then((res) => res.json());

      // console.log(response);
      setMessages((prevState) => [
        ...prevState,
        {
          message: response["gemini_response"],
          timestamp: Date(),
          type: "receive",
        },
      ]);
      setIsLoading(false);
    }
  };

  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const box = {
    width: 10,
    height: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  };

  return (
    <div className={`App box-border ${isDarkMode ? "dark" : ""}`}>
      <nav className="bg-blurwhite absolute flex flex-row justify-between backdrop:blur-2xl p-2 px-8 text-text border-b-black border-b w-[100%] backdrop-blur-sm dark:bg-blurwhiteDark dark:text-textDark dark:border-b-white h-[75px]">
        <div className="logo">
          <motion.h1
            whileHover={{ x: 4, y: 4 }}
            whileTap={{ scale: 0.95 }}
            className=" font-logo text-5xl absolute select-none "
          >
            ...
          </motion.h1>
          <h1 className="text-white font-logo text-5xl dark:text-black">...</h1>
        </div>
        <ul className="flex flex-row items-center justify-end  gap-4 w-1/2">
          <motion.li
            whileHover={{ scale: 1.5, rotate: -90 }}
            whileTap={{ scale: 0.95, rotate: 360 }}
            onClick={toggleMode}
            className="p-2 w-[5%] cursor-pointer"
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faSun} color="white" />
            ) : (
              <FontAwesomeIcon icon={faMoon} color="black" />
            )}
          </motion.li>
        </ul>
      </nav>
      <div
        className={`min-h-[75px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          animate-gradient-move bg-[length:200%_200%]`}
      ></div>

      <div className="min-h-[calc(100vh-75px)] bg-background m-auto w-[100%] flex flex-col justify-center items-center dark:bg-gray-800">
        <div className="min-h-[calc(100vh-75px)] text-text p-4 w-[70%] dark:text-textDark flex flex-col justify-between h-[100%]">
          <form onSubmit={onTextInputSubmit}>
            <input
              disabled={isLoading}
              ref={inputRef}
              type="text"
              value={textInput}
              onChange={onTextInputChange}
              className={`w-[100%] rounded-md p-2 outline border-accent-300 border-2 dark:border-accent-800 dark:text-black ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
          </form>

          <p className="">
            Just Enter{" "}
            <em className="text-logo text-text dark:text-textDark">"Hello"</em>{" "}
            to chat with{" "}
            <em className="text-logo bg-textPrimary text-textSecondary">
              HR bot
            </em>
          </p>

          <div className="chatarea h-[70vh] overflow-y-auto scrollbar-thumb-accent scrollbar-track-accentDark scrollbar-thin">
            <ul className="flex flex-col p-1.5 px-4 gap-2" ref={ulRef}>
              {messages
                .sort((a, b) => a.timestamp < b.timestamp)
                .map((messageItem, id) => {
                  return messageItem.type === "send" ? (
                    <motion.li
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        animationDuration: 0.5,
                      }}
                      className="self-end max-w-[80%]"
                      key={id}
                    >
                      <p
                        className="bg-secondary text-text border-black p-2 px-3 text-wrap text-left rounded-tl-md 
                    rounded-br-md rounded-bl-md rounded-tr-none self-end dark:bg-secondaryDark dark:text-textDark"
                      >
                        {messageItem.message}
                      </p>
                    </motion.li>
                  ) : (
                    <motion.li
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        animationDuration: 0.5,
                      }}
                      className="self-start max-w-[80%]"
                      key={id}
                    >
                      <p
                        className="bg-secondaryDark text-textDark text-left p-2 px-3 text-wrap rounded-tl-none 
                    rounded-br-md rounded-bl-md rounded-tr-md dark:bg-secondary dark:text-text"
                      >
                        {messageItem.message}
                      </p>
                    </motion.li>
                  );
                })}
              {isLoading && (
                <motion.li
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    animationDuration: 0.5,
                  }}
                  className="self-start max-w-[50%]"
                >
                  <p
                    className="bg-secondaryDark text-textDark text-left p-2 px-3 text-wrap rounded-tl-none 
                    rounded-br-md rounded-bl-md rounded-tr-md dark:bg-secondary dark:text-text"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1.5, 1, 1],
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      style={box}
                    />
                  </p>
                </motion.li>
              )}
              <div className="" ref={endOfListRef}></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
