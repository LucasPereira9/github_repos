import { useSpring, animated } from '@react-spring/web';
import styles from './modal.module.css'

const Modal = (props) => {
    const { isModalOpen, setIsModalOpen, children } = props;
  const animation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0%)` : `translateY(-100%)`,
    config: { tension: 200, friction: 20 },
  });

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={setIsModalOpen}>
      <animated.div style={animation} className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </animated.div>
    </div>
  );
};

export default Modal;