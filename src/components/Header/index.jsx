import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu style={{ marginTop: "1rem" }}>
      <Menu.Item>
        <Link to="/">Crowd Coin</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>
          <Link to="/campaigns/new">+</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
