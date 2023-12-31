import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/data", {
        method: "POST",
        body: JSON.stringify({ todos: taskText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const generatedId = data.id; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
