import styles from "./callout.module.css";

/**
 * @typedef {"warn" | "info" | "default"} calloutKind
 */

/**
 *
 * @param children
 * @param {calloutKind} [kind="default"]
 * @constructor
 */
export function Callout({ children, kind = "default" }) {
  return (
    <div className={styles.callout}>
      <CalloutIcon kind={kind} />
      {children}
    </div>
  );
}

/**
 *
 * @param {calloutKind} [kind="default"]
 * @constructor
 */
function CalloutIcon({ kind = "default" }) {
  switch (kind) {
    case "info":
      return <span className={styles.calloutIcon}>💡</span>;
    case "warn":
      return <span className={styles.calloutIcon}>⚠️</span>;
    case "default":
    default:
      return <span className={styles.calloutIcon}></span>;
  }
}
