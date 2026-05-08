import type { TextFieldServerComponent } from 'payload'
import ChipsField from './ChipsField.client'

const ChipsInputServer: TextFieldServerComponent = ({ clientField, path }) => {
  return <ChipsField path={path} field={clientField as any} />
}

export default ChipsInputServer
