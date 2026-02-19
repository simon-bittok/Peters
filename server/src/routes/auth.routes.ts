import { zValidator } from "@hono/zod-validator";

import { ValidationError } from "@/errors/index.ts";
import { SignUpSchema, SignInSchema } from "@/schemas/auth.schema.ts";
import { auth } from "@/utils/auth.ts";
import { createRouter } from "@/utils/init.ts";

const app = createRouter();

app.post(
  "/sign-up/email",
  zValidator("json", SignUpSchema, (result, _) => {
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
  }),
  async (c) => {
    const params = c.req.valid("json");

    const { headers, response } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: params,
    });

    const cookies = headers.get("set-cookie");

    if (cookies) {
      c.res.headers.append("set-cookie", cookies);
    }
    return c.json(
      { message: "Account created successfully", user: response.user, token: response.token },
      201,
    );
  },
);

app.post(
  "/sign-in/email",
  zValidator("json", SignInSchema, (result, _) => {
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
  }),
  async (c) => {
    const params = c.req.valid("json");

    const { headers, response } = await auth.api.signInEmail({
      returnHeaders: true,
      body: params,
    });

    const cookies = headers.get("set-cookie");

    if (cookies) {
      c.res.headers.append("set-cookie", cookies);
    }
    return c.json({ message: "login success", user: response.user, token: response.token }, 200);
  },
);

app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default {
  path: "/auth",
  handler: app,
};
