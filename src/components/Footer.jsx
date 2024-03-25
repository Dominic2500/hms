
// Footer.js

import { CopyrightOutlined } from '@mui/icons-material';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer>
            <Container>
                <small className="text-center small-center">Copyright <CopyrightOutlined/> {new Date().getFullYear()}</small>
            </Container>
        </footer>
    );
}
export default Footer;
