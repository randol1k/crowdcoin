import { useState } from "react";
import styles from "./ParticipateForm.module.scss";
import { useNavigate } from "react-router-dom";
import campaign from "../../campaign";
import web3 from "../../web3";

import { Button, Form, Input } from "semantic-ui-react";

const ParticipateForm = ({ address, toggle }) => {
  const navigate = useNavigate();
  const [enterAmount, setEnterAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const participateEvent = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign(address)
        .methods.participate()
        .send({ from: accounts[0], value: web3.utils.toWei(enterAmount) });
      navigate(0);
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={toggle}></div>
      <div className={styles.participate}>
        <Form onSubmit={participateEvent}>
          <Form.Field>
            <label htmlFor="amount">Amount to Enter</label>
            <Input
              type="text"
              id="amount"
              value={enterAmount}
              onChange={(event) => setEnterAmount(event.target.value)}
            />
          </Form.Field>
          <Button primary content="Count me in!" loading={isLoading} />
        </Form>
      </div>
    </>
  );
};

export default ParticipateForm;
