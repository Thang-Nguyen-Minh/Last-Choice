let accessToken: string | null = 'demo-access-token'

export function getAccessToken() {
  return accessToken
}

export function setAccessToken(token: string | null) {
  accessToken = token
}
