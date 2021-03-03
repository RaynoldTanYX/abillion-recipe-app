import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Logo from '../images/carrot.svg';
import {
  Link
} from "react-router-dom";
const Topbar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Link to="/">
                    <Button><img src={Logo} alt="Logo" style={{maxWidth:'48px'}}/></Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;