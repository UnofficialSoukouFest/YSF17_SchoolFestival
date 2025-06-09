import styles from "./program_view.module.css";
import Link from "next/link";

/**
 *
 * @param {import("../../lib/index").Programs} programs
 * @constructor
 */
export default function ProgramView({ programs }) {
  const programsArray = Array.from(programs.iter());
  return (
    <div className={styles.list}>
      <ol>
        {programsArray.map((program) => {
          return (
            <li key={program.id}>
              <Link href={`/program/${program.id}`}>
                <div className={styles.card}>
                  <h2>{program.name}</h2>
                  <p>{program.location}</p>
                  <p>{program.prText || ""}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
