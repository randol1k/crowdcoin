import { useState } from "react";
import styles from "./CreateCampaign.module.scss";
import factory from "../../factory";
import web3 from "../../web3";

import { Form, Input, Button, Message } from "semantic-ui-react";
import PopupMessage from "../PopupMessage";

const CreateCampaign = () => {
  const [minAmount, setMinAmount] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [popup, setPopup] = useState(false);

  const popupHandler = (value) => {
    setPopup(value);
  };

  const createSubmission = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    setIsLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minAmount, description, goal, name)
        .send({ from: accounts[0] });
      popupHandler(true);
      setMinAmount("");
      setName("");
      setDescription("");
      setGoal("");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.createCampaign}>
      <PopupMessage
        message="The campaign was successfully created!"
        popupHandler={popupHandler}
        popup={popup}
        title="Yay!"
      />
      <h3>Create Campaign</h3>
      <Form onSubmit={createSubmission} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input
            type="number"
            fluid
            label="Goal (WEI)"
            required
            id="goal"
            min="1"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
          <Form.Input
            label="Minimum Amount To Contribute (WEI)"
            type="number"
            id="minimum"
            required
            min="0"
            fluid
            value={minAmount}
            onChange={(event) => setMinAmount(event.target.value)}
          />
        </Form.Group>
        <Form.Field>
          <Form.TextArea
            label="Description"
            id="description"
            placeholder="A short info about your Campaign..."
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Message error content={errorMessage} />
        <Button primary content="Create!" loading={isLoading} />
      </Form>
    </div>
  );
};

export default CreateCampaign;
