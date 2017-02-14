describe('enable/disable', function () {
  var enabledLogalize, disabledLogalize
  beforeEach(function () {
    enabledLogalize = new Logalize({ enabled: true })
    disabledLogalize = new Logalize({ enabled: false })
  })

  it('inherits init settings', function () {
    expect(enabledLogalize._isEnabled()).toBe(true)
    expect(disabledLogalize._isEnabled()).toBe(false)
  })

  it('prefers clientside settings', function () {
    enabledLogalize.disable()
    expect(enabledLogalize._isEnabled()).toBe(false)
    disabledLogalize.enable()
    expect(disabledLogalize._isEnabled()).toBe(true)
  })
})
