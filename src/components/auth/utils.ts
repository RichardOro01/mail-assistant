import { SESSION_EXPIRES_DAYS } from "@/config";
// import { debugAuth } from "@/lib/debug";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// export const redirectToLogin = () => {
//   debugAuth("Redirecting to login");
//   const headersList = headers();
//   const fullUrl = headersList.get("x-url") || "";
//   const params = fullUrl ? `?returnTo=${fullUrl}` : "";
//   redirect(`${paths.login}${params}`);
// };

export const sessionExpiresTime = SESSION_EXPIRES_DAYS * 24 * 60 * 60;
export const sessionExpiresTimeMilliseconds =
  SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000;
