import styles from "./program_input.module.css";
import { Tags } from "@/app/lib/index.js";
import { useId, useState } from "react";

/**
 *
 * @param {import("react").Dispatch<import("react").SetStateAction<Tags>>} onchange
 * @param {Tags} tags
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProgramInput({ onchange, tags }) {
  const programInputId = useId();
  const tagsAsArray = Array.from(tags.keys());
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.inputBox}>
      {tagsAsArray.map(
        /**
         * @param {string} tag
         * @param {number} index
         */
        (tag, index) => {
          return <TagInputPreview tag={tag} key={index} />;
        },
      )}
      <input
        type={"search"}
        value={inputValue}
        placeholder={"企画名を入力"}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(event) => {
          inputChangeHandler(event, onchange, setInputValue);
        }}
        aria-describedby={programInputId}
      />
    </div>
  );
}

/**
 *
 * @param {string} tag
 * @returns {JSX.Element}
 * @constructor
 */
function TagInputPreview({ tag }) {
  return (
    <div className={styles.inputPreview}>
      <p>{tag}</p>
    </div>
  );
}

/**
 *
 * @param {KeyboardEvent<HTMLInputElement>} event
 * @param {import("react").Dispatch<import("react").SetStateAction<Tags>>} onchange
 * @param {import("react").Dispatch<import("react").SetStateAction<string>>} setInput
 */
function inputChangeHandler(event, onchange, setInput) {
  if (event.key === "Enter") {
    /** @type {string[]} */
    const init_tags = event.currentTarget.value.split(" ");
    const tags = new Tags(init_tags);
    onchange((prev) => prev.union(tags));
    setInput("");
  }
  if (event.key === "Backspace" && event.currentTarget.value === "") {
    onchange((prev) => {
      /** @type {string[]} */
      const oldTags = [...prev];
      oldTags.pop();
      return new Tags(oldTags);
    });
  }
}
