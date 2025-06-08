"use client";

import styles from "./select.module.css";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { MdCheck } from "react-icons/md";

export const OptionsInSelectAtom = atom(/** @type {string[]} */ []);
export const OptionsAtom = atom(
  (get) => get(OptionsInSelectAtom),
  /**
   * @param {import("jotai").Getter} get
   * @param {import("jotai").Setter} set
   * @param {string[]} options
   * @param {boolean} multiple
   */
  (get, set, options, multiple) => {
    if (multiple) {
      const prevOptions = get(OptionsInSelectAtom);
      /** @type {string[]} */
      const newOptions = [...prevOptions, ...options];
      set(OptionsInSelectAtom, newOptions);
    } else {
      set(OptionsInSelectAtom, options);
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
        setOption([value], ableMultiple);
        toggleChoose();
      }}
    >
      {children}
      {isChosen ? <MdCheck /> : ""}
    </span>
  );
}
