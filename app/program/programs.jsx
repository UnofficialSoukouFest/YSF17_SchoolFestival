"use client";

import ProgramInput from "@/app/compoent/program/program_input.jsx";
import ProgramView from "@/app/compoent/program/program_view.jsx";
import { SelectItem, SelectMenu } from "@/app/compoent/select.jsx";
import { matchPrograms, parseProgramsData, Tags } from "@/app/lib/index.js";
import ProgramSample from "@/app/program.mock.json";
import styles from "@/app/program/program.module.css";
import { Provider } from "jotai";
import { useState } from "react";

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProgramsView() {
  const [tags, setTags] = useState(new Tags([]));
  const [kinds, setKinds] = useState([]);
  const [places, setPlaces] = useState([]);
  // TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
  const programs = parseProgramsData(ProgramSample);
  const matchedPrograms =
    tags.size !== 0 ? matchPrograms(programs, tags) : programs;
  return (
    <div>
      <ProgramInput onchange={setTags} tags={tags} />
      <KindSelectMenu kinds={kinds} onSelected={setKinds} />
      <PlaceSelectMenu places={places} onSelected={setPlaces} />
      <ProgramView programs={matchedPrograms} />
    </div>
  );
}

/**
 *
 * @param {string[]} kinds
 * @param {React.Dispatch<React.SetStateAction<string[]>>} onSelected
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu({ kinds, onSelected }) {
  const showKind = kinds.length >= 2 ? `${kinds[0]}...` : kinds[0];
  return (
    <Provider>
      <SelectMenu multiple={true} onSelected={onSelected}>
        <p>{showKind} ▼</p>
        <div className={styles.programSelectForm}>
          <SelectItem value={"体験"}>体験</SelectItem>
          <SelectItem value={"展示"}>展示</SelectItem>
          <SelectItem value={"上演"}>上演</SelectItem>
          <SelectItem value={"販売"}>販売</SelectItem>
          <SelectItem value={"配布"}>配布</SelectItem>
        </div>
      </SelectMenu>
    </Provider>
  );
}

/**
 *
 * @param {string[]} places
 * @param {React.Dispatch<React.SetStateAction<string[]>>} onSelected
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu({ places, onSelected }) {
  return (
    <Provider>
      <SelectMenu multiple={true} onSelected={onSelected}>
        <p>場所 ▼</p>
        <div className={styles.programSelectForm}>
          <SelectItem value={"1F"}>1F</SelectItem>
          <SelectItem value={"2F"}>2F</SelectItem>
          <SelectItem value={"3F"}>3F</SelectItem>
          <SelectItem value={"4F"}>4F</SelectItem>
          <SelectItem value={"5F"}>5F</SelectItem>
          <SelectItem value={"屋上"}>屋上</SelectItem>
          <SelectItem value={"体育館"}>体育館</SelectItem>
          <SelectItem value={"交流センター"}>交流センター</SelectItem>
        </div>
      </SelectMenu>
    </Provider>
  );
}
