import Modal from 'react-modal';

Modal.setAppElement('#root');


function ModalComponent({isOpen, onRequestClose, children, width, height}) {
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
            alignItems: 'center'
        },
        content: {
            position: 'static',
            width: width,
            height: height,
            border: 0,
            background: 'transparent',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
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