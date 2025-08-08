import type React from 'react'
import { CheckboxField, FieldLabel } from '@payloadcms/ui'
import type { CheckboxFieldServerComponent } from 'payload'

export const CheckBoxIsDefault: CheckboxFieldServerComponent = async ({
  clientField,
  path,
  schemaPath,
  permissions,
  payload,
  ...args
}) => {
  const currencies = await payload.find({
    collection: 'currencies',
  })
  const defaultCurrency = currencies.docs.find((e) => e.is_default)
  let shouldShow = !!defaultCurrency?.is_default
  const currentItem = args.data.id === defaultCurrency?.id
  if (currentItem) shouldShow = false
  return (
    <>
      <CheckboxField
        readOnly={shouldShow}
        field={clientField}
        path={path}
        schemaPath={schemaPath}
        permissions={permissions}
      />
      {shouldShow && (
        <FieldLabel
          label={`You can't edit this value since the ${defaultCurrency?.name} currency already set to be a default currency.`}
        />
      )}
    </>
  )
}
export default CheckBoxIsDefault
