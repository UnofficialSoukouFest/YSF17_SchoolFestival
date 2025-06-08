import styles from "./select.module.css";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

const OptionsInSelectAtom = atom(/** @type {string[]} */ []);
const OptionsAtom = atom(
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
 * @param {React.Dispatch<React.SetStateAction<string[]>>} args.onSelected
 * @returns {React.ReactNode}
 * @constructor
 */
export function SelectMenu({ children, multiple, onSelected }) {
  const setMultiple = useSetAtom(MultipleAtom);
  setMultiple(multiple);
  const selected = useAtomValue(OptionsAtom);
  useMemo(() => {
    if (selected.length !== 0) {
      onSelected(selected);
    }
  }, [selected]);
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
  const ableMultiple = useAtomValue(IsMultipleAtom);
  const setOption = useSetAtom(OptionsAtom);
  return (
    <span
      className={styles.itemSelected}
      onClick={() => {
        setOption([value], ableMultiple);
      }}
    >
      {children}
    </span>
  );
}
