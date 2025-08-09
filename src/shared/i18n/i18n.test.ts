import { describe, it, expect } from 'vitest'
// simple sanity test of dictionary shape
import * as mod from './I18nContext'
describe('i18n', ()=>{
  it('exports provider and hook', ()=>{
    expect(typeof mod.I18nProvider).toBe('function')
    expect(typeof mod.useI18n).toBe('function')
  })
})
