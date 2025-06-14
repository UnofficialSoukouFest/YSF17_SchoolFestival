import styles from "../slug_page.module.css";
import TitleBarWithBack from "@/app/compoent/title_bar";
import { parseProgramsData, solveBasePath } from "@/app/lib/index.js";
import ProgramSample from "@/app/program.mock.json";
import Image from "next/image";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;

  // fetch data
  const programs = parseProgramsData(ProgramSample);
  const program = programs.find((program) => program.id === slug);
  return {
    title: `蒼煌祭17th非公式ページ｜${program.name}`,
    description: `蒼煌祭17thの企画「${program.name}」についての非公式のページです。`,
  };
}

export async function generateStaticParams() {
  const programs = parseProgramsData(ProgramSample);
  return programs.map((program) => ({ slug: program.id }));
}

/**
 *
 * @param {Promise<{ slug: string }>} params
 * @returns {Promise<React.ReactNode>}
 * @constructor
 */
export default async function Program({ params }) {
  const { slug } = await params;
  const programs = parseProgramsData(ProgramSample);
  const program = programs.find((program) => program.id === slug);

  return (
    <>
      <TitleBarWithBack backpage="/program" pagename={program.name} />
      <Image
        src={solveBasePath(program.imagePath)}
        alt={program.name + " の画像"}
        width={240}
        height={240}
        className={styles["pr-image"]}
      />
      <div className={styles["pr-tags"]}>
        {program.programType.map((type) => {
          return (
            /* タグ検索できるようにしたらここを書き換える */
            <div key={type} className={styles["pr-tag"]}>
              {type}
            </div>
          );
        })}
      </div>
      <div className={styles["pr-content"]}>
        <div className={styles["pr-subject"]}>
          <h2>{program.name}</h2>
          <h2 style={{ marginLeft: "auto" }}>{"@" + program.location}</h2>
        </div>
        <p>{program.prText || ""}</p>
      </div>
      {/*地図も作りましょう*/}
      <div style={{ marginTop: "1em" }}>位置を示す地図</div>
    </>
  );
}
