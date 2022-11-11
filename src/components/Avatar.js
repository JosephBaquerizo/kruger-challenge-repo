import styles from "../assets/components/Avatar.module.css";

export default function Avatar({ name, avatarColor }) {

    const letter = name.charAt(0);

    return (
        <div className={styles.container} style={{ 'backgroundColor': avatarColor }}>
            <span>{letter.toUpperCase()}</span>
        </div>
    )
}