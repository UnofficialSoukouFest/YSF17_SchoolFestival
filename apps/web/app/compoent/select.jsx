"use client";

import styles from "./select.module.css";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { MdCheck } from "react-icons/md";

export const OptionsInSelectAtom = atom(/** @type {Set<string>} */ new Set());
export const OptionsAtom = atom(
  (get) => get(OptionsInSelectAtom),
  /**
   * @param {import("jotai").Getter} get
   * @param {import("jotai").Setter} set
   * @param {string} option
   * @param {boolean} multiple
   */
  (get, set, option, multiple) => {
    if (multiple) {
      const prevOptions = get(OptionsInSelectAtom);
      if (prevOptions.has(option)) {
        prevOptions.delete(option);
        set(OptionsInSelectAtom, prevOptions);
      } else {
        const newOptions = prevOptions.add(option);
        set(OptionsInSelectAtom, newOptions);
      }
    } else {
      set(OptionsInSelectAtom, new Set([option]));
    }
  },
);
const IsMultipleAtom = atom(false);
const MultipleAtom = atom(
  (get) => get(IsMultipleAtom),
  /**
   * @param {import("jotai").Getter} get
   * @param {import("jotai").Setter} set
   * @param {boolean} multiple
   */
  (get, set, multiple) => {
    set(IsMultipleAtom, multiple);
  },
);

/**
 *
 * @param {Object} args
 * @param {React.ReactNode} args.children
 * @param {boolean} args.multiple
 * @returns {React.ReactNode}
 * @constructor
 */
export function SelectMenu({ children, multiple }) {
  const setMultiple = useSetAtom(MultipleAtom);
  setMultiple(multiple);
  return <>{children}</>;
}

/**
 *
 * @param {string} value
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * @constructor
 */
export function SelectItem({ value, children }) {
  const chosen = useMemo(() => atom(false), []);
  const [isChosen, setChoose] = useAtom(chosen);
  const toggleChoose = () => setChoose((prev) => !prev);
  const ableMultiple = useAtomValue(IsMultipleAtom);
  const setOption = useSetAtom(OptionsAtom);
  return (
    <span
      className={styles.itemSelected}
      onClick={() => {
        setOption(value, ableMultiple);
        toggleChoose();
      }}
    >
      {children}
      {isChosen ? <MdCheck /> : ""}
    </span>
  );
}
