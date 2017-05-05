import { CHANGE_TEXT } from '../constants/sample-action-define'

export function change_text(text: string) {
  return { type: CHANGE_TEXT, text: text }
}
