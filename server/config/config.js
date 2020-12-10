module.exports = {
  github: {
    GITHUB_OAUTH_URL: "https://github.com/login/oauth/authorize",
    client_id: "6b2d8b5557ce1eb37639",
    client_secret: "63d9c8074aab4a0ab37df279ccf43d566f7cdee9",
    scope: "user",
    request_token_url:"https://github.com/login/oauth/access_token",
    GET_OAUTH_URL() {
      return `${this.GITHUB_OAUTH_URL}?client_id=${this.client_id}&scope=${this.scope}`;
    },
  },
  //   token a6fbb87e88cb7782681eb60753c20999b1064823&scope=user&token_type=bearer
};
