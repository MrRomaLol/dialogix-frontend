import Modal from 'react-modal';

Modal.setAppElement('#root');

function ModalComponent({isOpen, onRequestClose, children, overlayStyle, contentStyle}) {
    const style = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...overlayStyle
        },
        content: {
            position: 'static',
            border: 0,
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0',
            outline: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            ...contentStyle
        }
    }

    return (
        <Modal className={`modal-animation animate__animated ${isOpen ? 'animate__zoomIn' : 'animate__zoomOut'}`}
               overlayClassName={`modal-animation animate__animated ${isOpen ? 'animate__fadeIn' : 'animate__fadeOut'}`}
               closeTimeoutMS={500} isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
            {children}
        </Modal>
    );
}

export default ModalComponent;