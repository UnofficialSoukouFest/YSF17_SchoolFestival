import styles from './spacer.module.css'

export default function Spacer({ type }) {
  const style = {
    S: styles.S,
    M: styles.M,
    L: styles.L,
    XL: styles.XL,
  }[type]

  return (
    <div className={style}></div>
  )
}
