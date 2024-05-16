// export type TodoItem = {
//   id: number
//   text: string
//   completed: boolean
// }

export type State = {
  loading: boolean
  items: string[]
}

export const state: State = {
  loading: false,
  items: []
}
