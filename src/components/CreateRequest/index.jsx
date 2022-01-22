import { useState } from "react/cjs/react.development";
import { Form, Button, Input, Message } from "semantic-ui-react";
import campaign from "../../campaign";
import web3 from "../../web3";

const CreateRequest = ({ address }) => {
  const [desc, setDesc] = useState("");
  const [val, setVal] = useState(0);
  const [rec, setRec] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    setIsLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign(address)
        .methods.createRequest(desc, Number(val), rec)
        .send({ from: accounts[0] });
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <h3>Create a new Request</h3>
      <Form onSubmit={submitHandler} error={!!error}>
        <Form.Field>
          <label htmlFor="desc">Request Description</label>
          <Input
            id="desc"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="val">Request Value</label>
          <Input
            id="val"
            value={val}
            label="WEI"
            labelPosition="right"
            type="number"
            onChange={(event) => setVal(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="rec">Request Recipient</label>
          <Input
            id="rec"
            value={rec}
            label="ADDRESS"
            labelPosition="right"
            onChange={(event) => setRec(event.target.value)}
          />
        </Form.Field>
        <Message error content={error} />
        <Button content="Create Request" loading={isLoading} />
      </Form>
    </div>
  );
};

export default CreateRequest;
