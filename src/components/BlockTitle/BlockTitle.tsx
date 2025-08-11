import styles from './block-title.module.scss';

interface BlockTitleProps {
  text: string;
}

export const BlockTitle = ({text}: BlockTitleProps) => {
  return <h2 className={styles.blockTitle}>{text}</h2>;
};
