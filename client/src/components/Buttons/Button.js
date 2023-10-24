import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

const Button = ({ name, placeholder,style,errorStyle,loginBtnLbl,btnName, ...rest}) => {
    // const { handleSubmit, touched, values, isSubmitting } = useFormikContext()
    // console.log(isSubmitting)

  return (
    <Pressable
    style={style}
    // onPress={ isSubmitting? null : handleSubmit}
    // onPress={()=>console.log(props.values)}
    backgroundColor={  '#6bc7ab' }

    // disabled={
    //   values.email   === '' || values.password === ''
    // isSubmitting
    //     ? true
    //     : false

    // }
    >
      <Text style={loginBtnLbl}>{btnName}</Text>
    </Pressable>
  )
}

export default Button