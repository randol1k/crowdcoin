import { getAccountsList } from "../../utils";
import { Dropdown, Form } from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const AccountsSelector = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    (async () => {
      const accs = await getAccountsList();
      setAccounts(accs);
    })();
  }, []);

  const renderAccountsSelector = () => {
    const options = accounts.map((account) => {
      return {
        key: account,
        text: account,
        value: account,
      };
    });

    return (
      <Dropdown
        placeholder="Select Account"
        selection
        options={options}
        fluid
      />
    );
  };

  return (
    <Form>
      <Form.Field>{renderAccountsSelector()}</Form.Field>
    </Form>
  );
};

export default AccountsSelector;
