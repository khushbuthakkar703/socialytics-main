import * as stytch from "stytch";

export const stytchClient = new stytch.B2BClient({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
  env: process.env.STYTCH_PROJECT_ID.includes("test")
    ? stytch.envs.test
    : stytch.envs.live,
});
