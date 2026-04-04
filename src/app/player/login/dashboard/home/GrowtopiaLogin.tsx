<div
  className="form-group"
  style={{
    display: "flex",
    gap: 10,
    marginTop: 10,
  }}
>
  {/* Register */}
  <form
    ref={guestFormRef}
    method="POST"
    action="/player/growid/login/validate"
    onSubmit={handleGuestSubmit}
    style={{ flex: 1 }}
  >
    <input name="_token" type="hidden" value={token} />
    <input name="growId" type="hidden" value="" />
    <input name="password" type="hidden" value="" />

    <input
      className="btn btn-secondary grow-button"
      type="submit"
      value="Register"
      style={{
        width: "100%",
        height: 42,
        fontSize: 14,
      }}
    />
  </form>

  {/* Login */}
  <button
    onClick={(e) => {
      e.preventDefault();
      loginFormRef.current?.requestSubmit();
    }}
    className="btn btn-primary grow-button"
    style={{
      flex: 1,
      height: 42,
      fontSize: 14,
    }}
  >
    Login
  </button>
</div>
