import { describe, it, expect } from 'vitest'
import { useUsers } from './users.store'
describe('users.store', () => {
  it('add user', () => {
    useUsers.getState().load()
    const prev = useUsers.getState().list.length
    useUsers.getState().add({ name:'Test', email:'t@e.com', role:'viewer' })
    expect(useUsers.getState().list.length).toBe(prev + 1)
  })
})
