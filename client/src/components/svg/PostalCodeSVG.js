import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path , Circle, G} from "react-native-svg";

const PostalCodeSvg = (props) => (
  <Svg 
    {...props}
  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <Path d="M49.5,2H23A11.907,11.907,0,0,0,11.18,12H3a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1h7.21L3.15,43.48a.988.988,0,0,0-.02,1.01A1,1,0,0,0,4,45H26a.986.986,0,0,0,.85-.48L34.56,32H37V61a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V32H61a1,1,0,0,0,1-1V14.5A12.517,12.517,0,0,0,49.5,2ZM23,4a10.01,10.01,0,0,1,9.8,8H13.21A9.921,9.921,0,0,1,23,4Zm2.44,39H5.79l6.77-11H32.21ZM33,30H4V15.75l15.54,9.11a1.059,1.059,0,0,0,.51.14,1.03,1.03,0,0,0,.51-.14L33,17.52Zm0-14.8L20.05,22.84,4.98,14H33ZM45,60H39V32h6ZM60,30H35V14a11.953,11.953,0,0,0-3.51-8.49A12.089,12.089,0,0,0,29.64,4H49.5A10.512,10.512,0,0,1,60,14.5Z" data-name="mailbox-postbox-Letter box-postal"/>
    </Svg>

)

export default PostalCodeSvg