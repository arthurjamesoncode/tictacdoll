import Modal, {
  BaseModalProps,
  RenderModalBackdropProps,
} from 'react-overlays/Modal';
import { Dispatch as ReactDispatch, SetStateAction } from 'react';

type PopUpProps = {
  showPopUp: boolean;
  setShowPopUp: ReactDispatch<SetStateAction<boolean>>;
  popUpMessage: string;
};

export default function PopUp({
  showPopUp,
  setShowPopUp,
  popUpMessage,
}: PopUpProps) {
  const renderBackdrop = (props: BaseModalProps & RenderModalBackdropProps) => (
    <div className='backdrop' {...props} />
  );
  const handleClose = () => setShowPopUp(false);

  return (
    <Modal
      className='modal'
      show={showPopUp}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div>
        <div className='modal-header'>
          <div className='modal-title'>Message</div>
          <div>
            <span className='close-button' onClick={handleClose}>
              ✖
            </span>
          </div>
        </div>
        <div className='modal-desc'>
          <p>{popUpMessage}</p>
        </div>
      </div>
    </Modal>
  );
}
