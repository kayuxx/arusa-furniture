'use client'
import type { SelectFieldClientComponent } from 'payload'

import { SelectField, useField } from '@payloadcms/ui'

const CustomSelectFieldClient: SelectFieldClientComponent = (props) => {
  const mda = useField<string>({ path: 'markets' })
  return (
    <SelectField
      {...props}
      onChange={() => {
        mda.setValue([])
      }}
    />
  )
}
export default CustomSelectFieldClient
