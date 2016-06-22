const h = require('../../../../').html
const isPresent = require('is-present')

module.exports = messages => {
  if (isPresent(messages)) {
    return h`
      ${messages.map(m => (
        `<p>${m}</p>`
      ))}
    `
  } else {
    return h`
      <div>
        You don't have any messages <br>
        Click here to create a message!
      </div>
    `
  }
}
