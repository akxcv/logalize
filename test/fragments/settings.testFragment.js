describe('enable/disable', function () {
  var enabledCrocon, disabledCrocon
  beforeEach(function () {
    enabledCrocon = new Crocon({ enabled: true })
    disabledCrocon = new Crocon({ enabled: false })
  })

  it('inherits init settings', function () {
    expect(enabledCrocon._isEnabled()).toBe(true)
    expect(disabledCrocon._isEnabled()).toBe(false)
  })

  it('prefers clientside settings', function () {
    enabledCrocon.disable()
    expect(enabledCrocon._isEnabled()).toBe(false)
    disabledCrocon.enable()
    expect(disabledCrocon._isEnabled()).toBe(true)
  })
})
