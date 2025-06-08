"use client";

import ProgramInput from "@/app/compoent/program/program_input.jsx";
import ProgramView from "@/app/compoent/program/program_view.jsx";
import {
  OptionsInSelectAtom,
  SelectItem,
  SelectMenu,
} from "@/app/compoent/select.jsx";
import { matchPrograms, parseProgramsData, Tags } from "@/app/lib/index.js";
import ProgramSample from "@/app/program.mock.json";
import styles from "@/app/program/programs.module.css";
import { atom, createStore, Provider, useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

// State atoms
const tagsAtom = atom(new Tags([]));
const kindsSelectStore = createStore();
const placesSelectStore = createStore();
// TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
const programsAtom = atom(parseProgramsData(ProgramSample));

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProgramsView() {
  const [tags, setTags] = useAtom(tagsAtom);
  const programs = useAtomValue(programsAtom);
  const matchedPrograms = useMemo(() => {
    return tags.size !== 0 ? matchPrograms(programs, tags) : programs;
  }, [programs]);

  return (
    <div>
      <ProgramInput onchange={setTags} tags={tags} />
      <div className={styles.programSearchLine}>
        <KindSelectMenu />
        <PlaceSelectMenu />
      </div>
      <ProgramView programs={matchedPrograms} />
    </div>
  );
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu({}) {
  const visibleAtom = useMemo(() => atom(false), []);
  const [isVisible, setIsVisible] = useAtom(visibleAtom);
  /** @type string[] */
  const kinds = useAtomValue(OptionsInSelectAtom, { store: kindsSelectStore });
  const showKind =
    kinds.length >= 2
      ? `${kinds[0]}...`
      : kinds.length === 0
        ? "形態"
        : kinds[0];
  return (
    <Provider store={kindsSelectStore}>
      <SelectMenu multiple={true}>
        <div className={styles.programSelectPullDown}>
          <p onClick={() => setIsVisible((prev) => !prev)}>{showKind} ▼</p>
          <div
            className={
              isVisible
                ? styles.programSelectPullDownItems
                : styles.programSelectPullDownItemsHide
            }
          >
            <SelectItem value={"体験"}>体験</SelectItem>
            <SelectItem value={"展示"}>展示</SelectItem>
            <SelectItem value={"上演"}>上演</SelectItem>
            <SelectItem value={"販売"}>販売</SelectItem>
            <SelectItem value={"配布"}>配布</SelectItem>
          </div>
        </div>
      </SelectMenu>
    </Provider>
  );
}

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu({}) {
  const visibleAtom = useMemo(() => atom(false), []);
  const [isVisible, setIsVisible] = useAtom(visibleAtom);
  return (
    <Provider store={placesSelectStore}>
      <SelectMenu multiple={true}>
        <div className={styles.programSelectPullDown}>
          <p onClick={() => setIsVisible((prev) => !prev)}>場所 ▼</p>
          <div
            className={
              isVisible
                ? styles.programSelectPullDownItems
                : styles.programSelectPullDownItemsHide
            }
          >
            <SelectItem value={"1F"}>1F</SelectItem>
            <SelectItem value={"2F"}>2F</SelectItem>
            <SelectItem value={"3F"}>3F</SelectItem>
            <SelectItem value={"4F"}>4F</SelectItem>
            <SelectItem value={"5F"}>5F</SelectItem>
            <SelectItem value={"屋上"}>屋上</SelectItem>
            <SelectItem value={"体育館"}>体育館</SelectItem>
            <SelectItem value={"交流センター"}>交流センター</SelectItem>
          </div>
        </div>
      </SelectMenu>
    </Provider>
  );
}
