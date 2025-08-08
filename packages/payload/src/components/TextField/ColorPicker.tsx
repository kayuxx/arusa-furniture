'use client'
import './index.scss'
import { Button, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { useDebounce } from 'use-debounce'

export const ColorPicker: TextFieldClientComponent = (props) => {
  const { value: color } = useField<string>({ path: props.path })
  const [debounceColor, setDebounceColor] = useDebounce(color, 200)
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="color-picker-parent">
      <div className="label-wrapper">
        <FieldLabel label={props.field.label} required={props.field.required} />
        <Button buttonStyle="none" onClick={() => setShowPicker(!showPicker)}>
          Pick Color
        </Button>
      </div>
      <div className="field-type text">
        <HexColorInput color={debounceColor ?? ''} onChange={setDebounceColor} prefixed />
      </div>
      {showPicker && <HexColorPicker color={debounceColor ?? ''} onChange={setDebounceColor} />}
    </div>
  )
}

export default ColorPicker
