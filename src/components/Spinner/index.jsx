import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = ({ message, size }) => {
  return (
    <div>
      <Dimmer active inverted>
        <Loader inverted content={message} size={size} />
      </Dimmer>
    </div>
  );
};

export default Spinner;
