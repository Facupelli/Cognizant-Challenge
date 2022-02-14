import { createGlobalStyle } from 'styled-components';

import robotoRegular from './Roboto/Roboto-Regular.ttf';
import robotBold from './Roboto/Roboto-Bold.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'RobotoRegular';
        src: url(${robotoRegular}) format('opentype'),
        font-weight: 400;
        font-style: normal;
    }
`;
