import { useLoadPits } from "@features/load-pits";
import { Modal, Spin } from "antd";
import { useState } from 'react';
import styles from '../styles/styles.module.css'
interface ModalProps {
    img: string | null,
    onClose: () => void
}

const ModalComponent = ({ img, onClose }: ModalProps) => {
    if (!img) {
        return null;
    }

    return (
        <Modal
            open={!!img}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            style={{width: '90%'}}
        >
            <img src={img} alt="фото" style={{ width: "100%" }} />
        </Modal>
    );
};

const Card = () => {
    const [pits, loading] = useLoadPits();
    const [selectedIMG, setSelectedIMG] = useState<string | null>(null);
    if (loading) {
        return <Spin />;
    }

    const handleCloseModal = () => {
        setSelectedIMG(null);
    }

    return (
        <div className={styles.container}>
            {
                pits.map((pits) =>
                    <div
                        key={pits._id}
                        className={styles.card}
                    >
                        <img
                            className={styles.img}
                            src={pits.imageUrl}
                            alt={pits._id}
                            onClick={() => setSelectedIMG(pits.imageUrl)}
                        />
                        <h3>#{pits._id}</h3>
                        <p>{pits.latitude}, {pits.longitude}</p>
                    </div>
                )
            }
            <ModalComponent img={selectedIMG} onClose={handleCloseModal} />
        </div>
    );
};

export default Card;