"use client";

import ProgramInput from "@/app/compoent/program/program_input.jsx";
import ProgramView from "@/app/compoent/program/program_view.jsx";
import { matchPrograms, parseProgramsData, Tags } from "@/app/lib/index.js";
import ProgramSample from "@/app/program.mock.json";
import { useState } from "react";

/**export const metadata = {
 *  title: "蒼煌祭17th非公式ページ｜企画",
 *  description: "蒼煌祭17thの企画についての非公式のページです。",
 *};
 */

export default function Program() {
  const [tags, setTags] = useState(new Tags([]));
  // TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
  const programs = parseProgramsData(ProgramSample);
  const displayPrograms = tags.size !== 0 ? matchPrograms(programs, tags) : programs;
  return (
    <div>
      <ProgramInput onchange={setTags} />
      <ProgramView programs={displayPrograms} />
    </div>
  );
}
