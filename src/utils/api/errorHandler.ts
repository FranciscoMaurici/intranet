const urlAPIRegex = /^(\/api\/)(\w+)\??/

export const onError = function (err, req, res) {
  const regexMatches = urlAPIRegex.exec(req.url)
  const endPointName = regexMatches[2]
  const errorMessage = endPointName
    ? `General server error on ${endPointName} endpoint.`
    : 'General server error.'
  console.error(errorMessage, err)
  res.status(500).end(errorMessage)
}
