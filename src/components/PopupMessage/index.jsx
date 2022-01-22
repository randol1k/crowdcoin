import { Modal, Button } from "semantic-ui-react";

const PopupMessage = ({ popup, message, title, popupHandler }) => {
  return (
    <Modal
      dimmer={"blurring"}
      size={"mini"}
      open={popup}
      onClose={() => popupHandler(false)}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{message}</Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => popupHandler(false)}>
          Got It!
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PopupMessage;
