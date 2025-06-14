"use client";

import ProgramInput from "@/app/compoent/program/program_input.jsx";
import ProgramView from "@/app/compoent/program/program_view.jsx";
import {
  OptionsInSelectAtom,
  SelectItem,
  SelectMenu,
} from "@/app/compoent/select.jsx";
import ProgramSample from "@/app/program.mock.json";
import styles from "@/app/program/programs.module.css";
import { parseProgramsData, Programs, Tags } from "@latimeria/core";
import { atom, createStore, Provider, useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

// State atoms
const tagsAtom = atom(new Tags([]));
const kindsSelectStore = createStore();
const placesSelectStore = createStore();
// TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
const programsAtom = atom(new Programs(parseProgramsData(ProgramSample)));

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProgramsView() {
  const [tags, setTags] = useAtom(tagsAtom);
  const kindOptions = useAtomValue(OptionsInSelectAtom, {
    store: kindsSelectStore,
  });
  const placeOptions = useAtomValue(OptionsInSelectAtom, {
    store: placesSelectStore,
  });
  const programs = useAtomValue(
    useMemo(() => {
      return atom((get) => {
        const programs = get(programsAtom);
        const unionKindTags = tags.union(kindOptions);
        const placeKindTags = unionKindTags.union(placeOptions);
        return tags.size !== 0
          ? programs.matchPrograms(placeKindTags)
          : programs;
      });
    }, [tags, kindOptions, placeOptions]),
  );

  return (
    <div>
      <ProgramInput onchange={setTags} tags={tags} />
      <div className={styles.programSearchLine}>
        <KindSelectMenu />
        <PlaceSelectMenu />
      </div>
      <ProgramView programs={programs} />
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
  const kinds = useAtomValue(
    useMemo(() => atom((get) => get(OptionsInSelectAtom)), []),
    { store: kindsSelectStore },
  );
  const showKind =
    kinds.size >= 2
      ? `${kinds.keys().next().value}...`
      : kinds.size === 0
        ? "形態"
        : kinds.keys().next().value;
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
